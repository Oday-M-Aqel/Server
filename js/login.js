document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");
  
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      if (!email || !password) {
        alert("Please fill in both email and password.");
        return;
      }
  
      try {
        const response = await axios.post("/login", {
          email: email,
          password: password,
        });
        if (response.data.success) {
        //   alert("Login successful!");
          window.location.href = "/homepage";
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message || "Login failed. Please try again.");
        } else if (error.request) {
          alert("No response from server. Please try again later.");
        } else {
          alert("Error: " + error.message);
        }
      }
    });
  });
  