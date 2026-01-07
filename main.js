// --- Leveling Constants ---
const BASE_XP = 500; // XP needed for Level 1

function calculateLevelData(totalXP) {
  // Level = Square root of (XP / Base) + 1 (Creates a curved difficulty)
  // For simplicity, we'll use a linear level up every 500 XP
  let level = Math.floor(totalXP / BASE_XP) + 1;
  let xpInCurrentLevel = totalXP % BASE_XP;
  let progressPercent = (xpInCurrentLevel / BASE_XP) * 150;
  
  // Rank logic: Every 5 levels, the player gets a new Rank title
  let rankIdx = Math.floor(level / 5);
  if (rankIdx >= RANKS.length) rankIdx = RANKS.length - 1;
  
  return { level, xpInCurrentLevel, progressPercent, rankName: RANKS[rankIdx] };
}
let p = JSON.parse(localStorage.getItem('chess_pro_v2'));
p.xp += 600;
localStorage.setItem('chess_pro_v2', JSON.stringify(p));
location.reload();

// --- Updated Rank Tiers ---
const RANKS = [
  { name: "BRONZE", color: "#cd7f32" }, // Level 1-5
  { name: "SILVER", color: "#c0c0c0" }, // Level 6-10
  { name: "GOLD", color: "#ffd700" }, // Level 11-15
  { name: "PLATINUM", color: "#e5e4e2" }, // Level 16-20
  { name: "DIAMOND", color: "#b9f2ff" }, // Level 21-25
  { name: "GRANDMASTER", color: "#ff4d4d" } // Level 26+
];

function calculateLevelData(totalXP) {
  const XP_PER_LEVEL = 500;
  let level = Math.floor(totalXP / XP_PER_LEVEL) + 1;
  let xpInCurrentLevel = totalXP % XP_PER_LEVEL;
  let progressPercent = (xpInCurrentLevel / XP_PER_LEVEL) * 100;
  
  // Determine Rank Index (Promote every 5 levels)
  let rankIdx = Math.floor((level - 1) / 5);
  if (rankIdx >= RANKS.length) rankIdx = RANKS.length - 1;
  
  return {
    level,
    xpInCurrentLevel,
    progressPercent,
    rank: RANKS[rankIdx]
  };
}
// --- Admin System Configuration ---
const ADMIN_UID = 580955;

function checkAdminStatus() {
  const p = getProfile();
  const adminPanel = document.getElementById('admin-panel');
  const adminBadge = document.getElementById('admin-badge');
  
  if (p.uid === ADMIN_UID) {
    adminPanel.style.display = 'block';
    adminBadge.style.display = 'inline-block';
    console.log("Welcome, Creator. Admin Privileges Active.");
  } else {
    adminPanel.style.display = 'none';
    adminBadge.style.display = 'none';
  }
}
function loginWithGoogle() {
  // This method is much more stable than the popup method
  auth.signInWithRedirect(provider);
}

<script>
    // --- YOUR UNIQUE FIREBASE CONFIG ---
    const firebaseConfig = {
        apiKey: "AIzaSyANDePeIlEMr8gnZ22-Zgfwv89MV1I-uLo",
        authDomain: "chess-85573.firebaseapp.com",
        projectId: "chess-85573",
        storageBucket: "chess-85573.firebasestorage.app",
        messagingSenderId: "1093336797570",
        appId: "1:1093336797570:web:88adee69bcd3aeba777f9b"
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    // 1. THIS RUNS WHEN THE USER CLICKS THE BUTTON
    function loginWithGoogle() {
        // We use Redirect instead of Popup to avoid "Popup Blocked" errors
        auth.signInWithRedirect(provider);
    }

    // 2. THIS RUNS AUTOMATICALLY WHEN THE USER RETURNS FROM GOOGLE
    auth.getRedirectResult().then((result) => {
        if (result.user) {
            console.log("Login Successful:", result.user.displayName);
            
            // Sync with your existing local storage profile
            let p = JSON.parse(localStorage.getItem('chess_pro_global')) || { coins: 1000, xp: 0 };
            p.username = result.user.displayName;
            
            // If this is YOU, give yourself the Admin UID
            if(result.user.email === "your-email@gmail.com") {
                p.uid = 977533; 
            } else if (!p.uid) {
                p.uid = Math.floor(100000 + Math.random() * 900000);
            }

            localStorage.setItem('chess_pro_global', JSON.stringify(p));

            // Move to the dashboard
            window.location.href = "index.html"; 
        }
    }).catch((error) => {
        if (error.code !== 'auth/no-current-user') {
            alert("Error during sign-in: " + error.message);
        }
    });
</script>