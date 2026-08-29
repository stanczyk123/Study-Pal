function getGreetings(){
    const hour = new Date(). getHours();
    if (hour > 12) return "Good Morning";
    if(hour < 15) return "Good Afternoon";
    if(hour < 18) return "Good Evening";
    return "Good Night"
}

function getUserName(){
    return localStorage.getItem("username") || "there";
}

function renderGreeting(){
    const name = getUserName
    const greeting = `${getGreeting()}, ${name} 👋`;
    document.addEventListener("DOMContentLoaded" , renderGreeting);
}

document.addEventListener("DOMContentLoaded" , renderGreeting);