const loginButton = document.getElementById("login-button");
const userInfo = document.getElementById("user-info");
const usernameSpan = document.getElementById("username");

loginButton.addEventListener("click", async () => {
  try {
    const scopes = ['username', 'payments'];
    const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);

    usernameSpan.textContent = authResult.user.username;
    userInfo.classList.remove("hidden");
    loginButton.style.display = "none";
  } catch (error) {
    console.error("Login failed", error);
  }
});

function onIncompletePaymentFound(payment) {
  console.log("Found incomplete payment:", payment);
}