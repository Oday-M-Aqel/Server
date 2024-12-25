document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the form from refreshing the page

  // Collect form data
  const f_name = document
    .querySelector('input[placeholder="First Name"]')
    .value.trim();
  const m_name = document
    .querySelector('input[placeholder="Middle Name"]')
    .value.trim();
  const l_name = document
    .querySelector('input[placeholder="Last Name"]')
    .value.trim();
  const email = document
    .querySelector('input[placeholder="Email Address"]')
    .value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .querySelector('input[placeholder="Confirm Password"]')
    .value.trim();
  const user_id = document
    .querySelector('input[placeholder="ID Number"]')
    .value.trim();
  const phone = document
    .querySelector('input[placeholder="Phone Number"]')
    .value.trim();
  const city = document.querySelector('input[placeholder="City"]').value.trim();
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const checkBox = document.getElementById("terms");
  const a_Terms_Condition = checkBox.checked;
  

  // Validate inputs
  if (
    !f_name ||
    !l_name ||
    !email ||
    !password ||
    !user_id ||
    !phone ||
    !city ||
    !gender ||
    !a_Terms_Condition
  ) {
    alert("Please fill in all the required fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Prepare data to send
  const data = {
    f_name,
    m_name,
    l_name,
    email,
    password,
    user_id,
    phone,
    city,
    gender,
    a_Terms_Condition
  };

  console.log(data);

  try {
    // Make the POST request using Axios
    const response = await axios.post("/register", data);

    if (response.status === 201) {
      alert("User registered successfully!");
      window.location.href = "/login"; // Redirect to login page
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      alert(error.response.data.message); // Show server error message
    } else {
      alert("An unexpected error occurred. Please try again.");
    }
    console.error(error);
  }
});
