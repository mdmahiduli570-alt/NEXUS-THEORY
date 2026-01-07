auth.onAuthStateChanged((user) => {
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const displayName = document.getElementById('display-name');
  
  if (user) {
    // 1. User is signed in
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    
    // 2. Set the name in the Account section
    displayName.innerText = user.displayName;
    
    // 3. Sync with local storage
    let p = JSON.parse(localStorage.getItem('chess_pro_global')) || {};
    p.username = user.displayName;
    localStorage.setItem('chess_pro_global', JSON.stringify(p));
  } else {
    // 4. User is signed out
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    displayName.innerText = "Guest";
  }
});

// Logout function
function logout() {
  auth.signOut().then(() => {
    window.location.reload();
  });
}