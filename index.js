
function getGreeting(){
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";
    return "Good Night";
}

function renderGreeting(){
    const greeting = `${getGreeting()}, ${getUserName()} 👋`;
    const el = document.getElementById("greetings");
    if (el) typeText(el, greeting, 50);
}

function getCurrentUser(){
    return JSON.parse(localStorage.getItem('studypal_user') || 'null');
}

function setCurrentUser(userObj){
    localStorage.setItem('studypal_user', JSON.stringify(userObj));
    updateUsernameDisplay();
}

function getUserName(){
    const user = getCurrentUser();
    if (user && user.name) return user.name;

    let guestName = localStorage.getItem('guestName');
    if (!guestName) {
        guestName = `User${Math.floor(100000 + Math.random() * 900000)}`;
        localStorage.setItem('guestName', guestName);
    }
    return guestName;
}

function updateUsernameDisplay(){
    document.querySelector('.username').textContent = getUserName();
}


function parseJwt(token){
    const base64 = token.split('.')[1];
    return JSON.parse(atob(base64));
}

function handleGoogleResponse(response){
    const data = parseJwt(response.credential);
    setCurrentUser({ name: data.name, email: data.email, provider: 'google' });
    document.getElementById('signupModal').classList.remove('open');
    document.getElementById('profileDropdown').classList.remove('open');
}


document.addEventListener("DOMContentLoaded", () => {
    updateUsernameDisplay();
    renderGreeting();

    if (window.google) {
        google.accounts.id.initialize({
            client_id: "YOUR_CLIENT_ID.apps.googleusercontent.com",
            callback: handleGoogleResponse
        });
    }

    const profileBtn = document.getElementById("profileBtn");
    const dropdown = document.getElementById("profileDropdown");
    const signupBtn = document.getElementById("signupBtn");
    const loginBtn = document.getElementById("loginBtn");
    const signupModal = document.getElementById("signupModal");
    const closeModal = document.getElementById("closeModal");

    profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && !profileBtn.contains(e.target)) {
            dropdown.classList.remove("open");
        }
    });

    signupBtn.addEventListener("click", () => {
        signupModal.classList.add("open");
        dropdown.classList.remove("open");
    });

    loginBtn.addEventListener("click", () => {
        console.log("Log In clicked");
    });

    closeModal.addEventListener("click", () => {
        signupModal.classList.remove("open");
    });

    signupModal.addEventListener("click", (e) => {
        if (e.target === signupModal) {
            signupModal.classList.remove("open");
        }
    });

    document.querySelector('.google-btn').addEventListener('click', () => {
        if (window.google) {
            google.accounts.id.prompt();
        } else {
            alert("Google Sign-In failed to load.");
        }
    });

    document.getElementById('continueBtn').addEventListener('click', () => {
        const usernameVal = document.getElementById('username-placeholder').value.trim();
        const passwordVal = document.getElementById('password-placeholder').value.trim();

        if (!usernameVal || !passwordVal) {
            alert('Please fill in both fields.');
            return;
        }

        setCurrentUser({ name: usernameVal, provider: 'local' });
        signupModal.classList.remove('open');
        dropdown.classList.remove('open');
    });
});

function typeText(element, text, speed = 50) {
    element.textContent = '';
    element.classList.remove('typing-done');
    let i = 0;
    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        } else {
            element.classList.add('typing-done');
        }
    }
    typeChar();
}