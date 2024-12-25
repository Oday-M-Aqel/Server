// Profile Page Functions
const getProfileData = () => {
  // Test data
  fetch("");
  return {
    firstName: "John",
    middleName: "Michael",
    lastName: "Doe",
    image: "https://www.htdc.org/wp-content/uploads/unnamed.jpg",
    email: "john.doe@example.com",
    idNumber: "123456789",
    phoneNumber: "+1 234 567 8900",
    city: "New York",
    gender: "male",
  };
};

const renderProfile = async () => {
  activeLoading();
  const data = await getProfileData();
  container.innerHTML = `
        <h2 class="mb-4">Profile Information</h2>
        <div class="text-center mb-4">
            <img id="profileImage" src="${
              data.image
            }" alt="User Image" class="rounded-circle" style="width: 150px; height: 150px; object-fit: cover;">
            <input type="file" id="imageUpload" class="form-control d-none mt-3" accept="image/*">
        </div>
        <form id="profileForm">
            <div class="row g-3 mb-3">
                <div class="col-md-4">
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-person"></i></span>
                        <input type="text" class="form-control" placeholder="First Name" value="${
                          data.firstName
                        }" readonly>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-person"></i></span>
                        <input type="text" class="form-control" placeholder="Middle Name" value="${
                          data.middleName
                        }" readonly>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-person"></i></span>
                        <input type="text" class="form-control" placeholder="Last Name" value="${
                          data.lastName
                        }" readonly>
                    </div>
                </div>
            </div>
            
            <div class="mb-3">
                <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                    <input type="email" class="form-control" placeholder="Email Address" value="${
                      data.email
                    }" readonly>
                </div>
            </div>

            <div class="mb-3">
                <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-card-text"></i></span>
                    <input type="text" class="form-control" placeholder="ID Number" value="${
                      data.idNumber
                    }" readonly>
                </div>
            </div>

            <div class="mb-3">
                <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-telephone"></i></span>
                    <input type="text" class="form-control" placeholder="Phone Number" value="${
                      data.phoneNumber
                    }" readonly>
                </div>
            </div>

            <div class="mb-3">
                <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-geo-alt"></i></span>
                    <input type="text" class="form-control" placeholder="City" value="${
                      data.city
                    }" readonly>
                </div>
            </div>

            <div class="mb-3">
                <label class="form-label">Gender</label>
                <div>
                    <label class="me-3">
                        <input type="radio" name="gender" value="male" ${
                          data.gender === "male" ? "checked" : ""
                        } disabled> Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="female" ${
                          data.gender === "female" ? "checked" : ""
                        } disabled> Female
                    </label>
                </div>
            </div>

            <div class="row mb-3 d-none" id="passwordFields">
                <div class="col">
                    <div class="password-group">
                        <div class="input-group flex-grow-1">
                            <span class="input-group-text"><i class="bi bi-lock"></i></span>
                            <input type="password" class="form-control" id="currentPassword" placeholder="Current Password" >
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-lock"></i></span>
                        <input type="password" class="form-control" id="newPassword" placeholder="New Password">
                    </div>
                </div>
            </div>

            <button type="button" class="btn btn-primary w-100" id="editButton" onclick="enableEdit()">Edit</button>
            <button type="button" class="btn btn-dark w-100 my-3" id="changePasswordButton" onclick="enablePasswordEdit()">Change Password</button>
            
            <div class="mt-3 d-none" id="editButtons">
            <button type="submit" class="btn btn-success w-100 mb-2">Save Changes</button>
                <button type="button" class="btn btn-secondary w-100 mb-2" onclick="cancelEdit()">Cancel</button>
            </div>
        </form>
    `;
  document.getElementById("sidebar").classList.remove("show");
  document.getElementById("profileForm").addEventListener("submit", submitForm);

  disableLoading();
};
const enableEdit = () => {
  document
    .querySelectorAll("input")
    .forEach((input) => input.removeAttribute("readonly"));
  document
    .querySelectorAll('input[type="radio"]')
    .forEach((radio) => radio.removeAttribute("disabled"));

  document.getElementById("profileImage").classList.add("d-none");
  document.getElementById("imageUpload").classList.remove("d-none");

  document.getElementById("editButton").classList.add("d-none");
  document.getElementById("editButtons").classList.remove("d-none");
};

const cancelEdit = () => {
  document
    .querySelectorAll("input")
    .forEach((input) => input.setAttribute("readonly", true));
  document
    .querySelectorAll('input[type="radio"]')
    .forEach((radio) => radio.setAttribute("disabled", true));

  document.getElementById("profileImage").classList.remove("d-none");
  document.getElementById("imageUpload").classList.add("d-none");

  document.getElementById("editButton").classList.remove("d-none");
  document.getElementById("editButtons").classList.add("d-none");

  cancelPasswordEdit();
};

const togglePasswordFields = () => {
  const passwordFields = document.getElementById("passwordFields");
  passwordFields.classList.toggle("d-none");
};

const submitForm = async (event) => {
  event.preventDefault();

  const form = document.getElementById("profileForm");
  const newData = {};

  newData.firstName = form[0].value;
  newData.middleName = form[1].value;
  newData.lastName = form[2].value;
  newData.email = form[3].value;
  newData.idNumber = form[4].value;
  newData.phoneNumber = form[5].value;
  newData.city = form[6].value;
  newData.gender = form.gender.value;

  // Collecting password data if visible
  const passwordFields = document.getElementById("passwordFields");
  if (!passwordFields.classList.contains("d-none")) {
    newData.currentPassword = document.getElementById("currentPassword").value;
    newData.newPassword = document.getElementById("newPassword").value;
  }

  console.log("Updated Data:", newData);

  cancelEdit();
  renderProfile();
};

const enablePasswordEdit = () => {
  const passwordFields = document.getElementById("passwordFields");
  passwordFields.classList.remove("d-none");

  document
    .getElementById("passwordFields")
    .querySelectorAll("input")
    .forEach((input) => {
      input.removeAttribute("readonly");
      input.setAttribute("required", true);
    });

  document.getElementById("changePasswordButton").classList.add("d-none");
  document.getElementById("editButtons").classList.remove("d-none");
};

const cancelPasswordEdit = () => {
  const passwordFields = document.getElementById("passwordFields");
  passwordFields.classList.add("d-none");

  document.getElementById("currentPassword").value = "";
  document.getElementById("newPassword").value = "";

  document.getElementById("changePasswordButton").classList.remove("d-none");

  document
    .getElementById("passwordFields")
    .querySelectorAll("input")
    .forEach((input) => {
      input.removeAttribute("required");
    });

  const editButton = document.getElementById("editButton");
  if (editButton.classList.contains("d-none")) {
    document.getElementById("editButtons").classList.add("d-none");
  }
};
