document.addEventListener('DOMContentLoaded', function() {
    
    const userDisplay = document.getElementById('userDisplay');
    const usernameDisplay = document.getElementById('usernameDisplay');
    
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (userDisplay && usernameDisplay) {
        if (isLoggedIn && currentUser) {
            
            usernameDisplay.textContent = currentUser.name;
            userDisplay.style.display = 'flex';
            userDisplay.style.color='black';
            userDisplay.style.background = 'rgb(237, 219, 173)';
            userDisplay.style.borderRadius = '50px'; 
            userDisplay.style.padding = '5px 15px';
            
        }
        
    }
    
   
    const protectedPages = ['home.html', 'adopt.html', 'PetParenting.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !isLoggedIn) {
        window.location.href = 'login.html';
    }
});
window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
    });