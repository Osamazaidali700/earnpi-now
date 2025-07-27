// Initialize Pi SDK
console.log("[DEBUG] Initializing Pi SDK...");

const initApp = async () => {
  try {
    await Pi.init({ 
      version: "2.0",
      sandbox: true
    });
    console.log("[SUCCESS] Pi SDK initialized");
    setupEventListeners();
  } catch (error) {
    console.error("[ERROR] SDK Init:", error);
    alert("SDK initialization failed. Please refresh.");
  }
};

// Event Listeners
const setupEventListeners = () => {
  document.getElementById("piLoginBtn").addEventListener("click", handleLogin);
  document.getElementById("piPayBtn").addEventListener("click", handlePayment);
};

// Login Handler
const handleLogin = () => {
  console.log("[EVENT] Login button clicked");
  Pi.authenticate(['username'], onLoginSuccess, onLoginError);
};

const onLoginSuccess = (auth) => {
  alert(`Welcome ${auth.user.username}!`);
  console.log("[AUTH] Success:", auth);
  document.getElementById("piPayBtn").classList.remove("hidden");
};

const onLoginError = (error) => {
  alert("Login failed. Please try again.");
  console.error("[AUTH] Error:", error);
};

// Payment Handler
const handlePayment = () => {
  console.log("[EVENT] Payment button clicked");
  document.getElementById("loading").classList.remove("hidden");

  Pi.createPayment({
    amount: 0.001,
    memo: "Test payment"
  }, {
    onReadyForServerApproval: (paymentId) => {
      console.log("[PAYMENT] Approved:", paymentId);
      verifyPayment(paymentId);
    },
    onReadyForServerCompletion: (paymentId, txid) => {
      document.getElementById("loading").classList.add("hidden");
      alert(`Payment completed! TXID: ${txid}`);
      console.log("[PAYMENT] Completed:", txid);
    },
    onCancel: () => {
      document.getElementById("loading").classList.add("hidden");
      alert("Payment cancelled by user");
      console.log("[PAYMENT] Cancelled");
    },
    onError: (error) => {
      document.getElementById("loading").classList.add("hidden");
      alert(`Payment error: ${error.message}`);
      console.error("[PAYMENT] Error:", error);
    }
  });
};

// Verify Payment with Backend (Mock)
const verifyPayment = async (paymentId) => {
  try {
    // Replace with actual API call
    console.log("[BACKEND] Verifying payment:", paymentId);
    // Example: const response = await fetch('/api/verify', { method: 'POST', body: JSON.stringify({ paymentId }) });
  } catch (error) {
    console.error("[BACKEND] Verification failed:", error);
  }
};

// Initialize App
document.addEventListener("DOMContentLoaded", initApp);
window.addEventListener("load", initApp);
