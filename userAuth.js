// Simulated user database (for demo purposes)
let users = JSON.parse(localStorage.getItem("users")) || [];

// Hardcoded admin credentials (for demo purposes)
const adminCredentials = {
  name: "Admin",
  email: "admin@pgmanager.com",
  password: "admin123",
  role: "admin",
};

const userCredentials = {
  name: "Heet Karena",
  email: "heetkarena123@gmail.com",
  password: "Karena@123",
  role: "user",
};

// Add admin to users if not already present
if (!users.some((user) => user.role === "admin")) {
  users.push(adminCredentials);
  localStorage.setItem("users", JSON.stringify(users));
}

console.log("Users:", users); // Debugging

// User Registration
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Check if user already exists
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    document.getElementById("registerMessage").textContent = "User already exists!";
    return;
  }

  // Add new user with role "user"
  users.push({ name, email, password, role: "user" });
  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("registerMessage").textContent = "Registration successful!";
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
});

// Login Function
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  // Check if user exists and role matches
  const user = users.find((user) => user.email === email && user.password === password && user.role === role);
  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    document.getElementById("loginMessage").textContent = "Login successful!";
    setTimeout(() => {
      // Redirect to respective profile page based on role
      if (user.role === "admin") {
        window.location.href = "adminProfile.html"; // Admin profile page
      } else {
        window.location.href = "userProfile.html"; // User profile page
      }
    }, 1000);
  } else {
    document.getElementById("loginMessage").textContent = "Invalid email, password, or role!";
  }
});

// Check if user is logged in
function checkLogin() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    window.location.href = "login.html"; // Redirect to login page if not logged in
  }
}

// Logout Function
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}