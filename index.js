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