document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    let valid = true;

    // Clear previous errors
    document.getElementById('username-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';

    // Validate username
    if (username.length <= 3) {
        document.getElementById('username-error').textContent = 'Username must be longer than 3 characters.';
        valid = false;
    } else if (userExists(username)) {
        document.getElementById('username-error').textContent = 'Username already exists.';
        valid = false;
    }

    // Validate email
    if (emailExists(email)) {
        document.getElementById('email-error').textContent = 'Email is already in use.';
        valid = false;
    }

    // Validate password
    if (password.length <= 6) {
        document.getElementById('password-error').textContent = 'Password must be longer than 6 characters.';
        valid = false;
    }

    if (valid) {
        // Proceed with form submission or further processing
        const newUser = {
            username: username,
            email: email,
            password: password
        };

        // Send POST request to server
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong.');
        })
        .then(data => {
            // Handle successful signup
            alert(data.message);
            // Optionally, redirect to another page
            // window.location.href = '/success';
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error, display error message to user, etc.
            alert('Signup failed. Please try again.');
        });
    }
});

// Mock functions to check if username or email already exists
// In a real-world scenario, these would make requests to a server
function userExists(username) {
    const existingUsers = ['user1', 'user2', 'user3'];
    return existingUsers.includes(username);
}

function emailExists(email) {
    const existingEmails = ['user1@example.com', 'user2@example.com', 'user3@example.com'];
    return existingEmails.includes(email);
}
