// --- ADD THIS TO YOUR FIREBASE CONFIG AREA ---
const db = firebase.firestore();

// --- THE CLOUD SYNC ENGINE ---
auth.onAuthStateChanged(async (user) => {
  if (user) {
    // 1. Reference to this specific user's "Cloud Save"
    const userRef = db.collection("players").doc(user.uid);
    const doc = await userRef.get();
    
    let userData;
    
    if (!doc.exists) {
      // NEW PLAYER: Create their cloud profile for the first time
      userData = {
        name: user.displayName,
        email: user.email,
        coins: 1000,
        xp: 0,
        uid: Math.floor(100000 + Math.random() * 900000),
        isAdmin: (user.uid === "YOUR_FIREBASE_UID_HERE") // Check if it's you
      };
      await userRef.set(userData);
    } else {
      // RETURNING PLAYER: Load their cloud data
      userData = doc.data();
    }
    
    // 2. Update UI with Cloud Data
    updateUI(userData);
    
    // 3. Save a local copy for speed
    localStorage.setItem('chess_pro_global', JSON.stringify(userData));
  }
});

// --- SAVE FUNCTION (Call this whenever they win/lose) ---
async function saveProgress(newCoins, newXP) {
  const user = auth.currentUser;
  if (user) {
    await db.collection("players").doc(user.uid).update({
      coins: newCoins,
      xp: newXP
    });
    console.log("Progress saved to cloud!");
  }
}
