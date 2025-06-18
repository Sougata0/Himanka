console.log("JavaScript loaded");

// SIGNUP
document.getElementById("signup-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.text())
    .then(data => {
      alert(data);
    })
    .catch(err => console.error("Signup error:", err));
});

// LOGIN
document.getElementById("login-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.text())
    .then(data => {
      alert(data);
    })
    .catch(err => console.error("Login error:", err));
});
