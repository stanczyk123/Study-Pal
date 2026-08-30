function getGreetings(){
    const hour = new Date(). getHours();
    if (hour > 12) return "Good Morning";
    if(hour < 15) return "Good Afternoon";
    if(hour < 18) return "Good Evening";
    return "Good Night"
}

function renderGreeting(){
    const name = getUserName
    const greeting = `${getGreeting()}, ${name} 👋`;
    document.addEventListener("DOMContentLoaded" , renderGreeting);
}

document.addEventListener("DOMContentLoaded" , renderGreeting);


function getUserName(user){
    if (user && user.name){
        return user.name;
    }

    let guestName = localStorage.getItem('guestName');
    if (!guestName) {
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        guestName = `User${randomNum}`;
        localStorage.setItem(`guestName`, guestName)
    }
    return guestName;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.username').textContent = getUserName();
});

document.addEventListener("DOMContentLoaded", () => {
    const profileBtn = document.getElementById("profileBtn");
    const dropdown = document.getElementById("profileDropdown");

    profileBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // stop this click from immediately closing the dropdown below
        dropdown.classList.toggle("open");
    });

    // close the dropdown if you click anywhere else on the page
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && !profileBtn.contains(e.target)) {
            dropdown.classList.remove("open");
        }
    });

    document.getElementById("loginBtn").addEventListener("click", () => {
        console.log("Log In clicked");
        // e.g. window.location.href = "login.html";
    });

    document.getElementById("signupBtn").addEventListener("click", () => {
        console.log("Sign Up clicked");
        // e.g. window.location.href = "signup.html";
    });
});