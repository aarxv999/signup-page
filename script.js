const entrepreneurBtn = document.getElementById('entrepreneur-btn');
const investorBtn = document.getElementById('investor-btn');
const guestBtn = document.getElementById('guest-btn');

const text = document.getElementById('text');

const buttons = document.querySelector('.buttons');
const content = document.querySelector('.content');
const topRight = document.querySelector('.top-right');

entrepreneurBtn.addEventListener('click', () => {
    text.textContent = 'Entrepreneur text goes here.';
    text.classList.remove('hidden');
    buttons.style.display = 'none';
    topRight.style.display = 'block';
    content.style.display = 'block';
});

investorBtn.addEventListener('click', () => {
    text.textContent = 'Investor text goes here.';
    text.classList.remove('hidden');
    buttons.style.display = 'none';
    topRight.style.display = 'block';
    content.style.display = 'block';
});

guestBtn.addEventListener('click', () => {
    text.textContent = 'Guest text goes here.';
    text.classList.remove('hidden');
    buttons.style.display = 'none';
    topRight.style.display = 'block';
    content.style.display = 'block';
});

const membershipBtn = document.getElementById('membership-btn');
const signupBtn = document.getElementById('signup-btn');

membershipBtn.addEventListener('click', () => {
    window.location.href = 'membership-plans.html';
});

signupBtn.addEventListener('click', () => {
    window.location.href = 'signup.html';
});
