document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });

    const message = await res.text();
    if (res.ok) {
        showNotification(message, 'success');
    } else {
        showNotification(message, 'error');
    }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        showNotification('Login successful', 'success');
        showReservationForm();
    } else {
        const message = await res.text();
        showNotification(message, 'error');
    }
});

document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('token');
    showAuthForms();
    showNotification('Logged out successfully', 'success');
});

document.getElementById('cancel-reservation-button').addEventListener('click', async () => {
    const res = await fetch('/api/reservations', {
        method: 'DELETE',
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    });

    if (res.ok) {
        showNotification('Reservation cancelled successfully', 'success');
        loadUserReservation();
    } else {
        const message = await res.text();
        showNotification(message, 'error');
    }
});

async function loadTables() {
    const res = await fetch('/api/reservations/tables', {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    });
    const tables = await res.json();

    const tableSelect = document.getElementById('table-id');
    tableSelect.innerHTML = '';

    tables.forEach(table => {
        const option = document.createElement('option');
        option.value = table.id;
        option.text = `Table ${table.table_number} - ${table.seats} seats - ${table.status}`;
        tableSelect.add(option);
    });
}

async function loadUserReservation() {
    const res = await fetch('/api/reservations', {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    });

    if (res.ok) {
        const reservations = await res.json();
        if (reservations.length > 0) {
            document.getElementById('current-reservation').style.display = 'block';

            const reservationDate = new Date(reservations[0].reservation_date);
            const formattedDate = reservationDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const formattedTime = reservationDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

            document.getElementById('reservation-details').innerText = `Table ID: ${reservations[0].table_id}, Date: ${formattedDate}, Time: ${formattedTime}`;
        } else {
            document.getElementById('current-reservation').style.display = 'none';
        }
        document.getElementById('reservation-form').style.display = 'block';
        loadTables();
    }
}

document.getElementById('reservation-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const table_id = document.getElementById('table-id').value;
    const reservation_date = document.getElementById('reservation-date').value;

    const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ table_id, reservation_date })
    });

    if (res.ok) {
        const message = await res.text();
        showNotification(message, 'success');
        loadUserReservation();
    } else {
        const message = await res.text();
        showNotification(message, 'error');
    }
});

window.onload = () => {
    const token = localStorage.getItem('token');
    if (token) {
        showReservationForm();
    }
};

function showReservationForm() {
    document.getElementById('auth-forms').style.display = 'none';
    document.getElementById('reservation-forms').style.display = 'block';
    loadUserReservation();
}

function showAuthForms() {
    document.getElementById('auth-forms').style.display = 'block';
    document.getElementById('reservation-forms').style.display = 'none';
}

function showNotification(message, type) {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.innerText = message;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }, 3000);
}
