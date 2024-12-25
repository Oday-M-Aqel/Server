const testProductsArray = [
  {
    id: 1,
    name: "Jexon",
    img: "https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4",
    moreImgs:
      '["https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4", "https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4"]',
    status: "selled",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nam autem possimus debitis, ducimus sapiente facilis odit. Reprehenderit, aliquid reiciendis amet, consectetur corporis, repudiandae rem cumque itaque quisquam porro provident.z",
    date: "2024-11-04",
    categ: "electronics",
    quan: 1,
    price: 25,
    type: "group",
    state: "accepted",
  },
  {
    id: 2,
    img: "https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4",
    name: "Motor",
    moreImgs:
      '["https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4", "https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4"]',

    status: "Available",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nam autem possimus debitis, ducimus sapiente facilis odit. Reprehenderit, aliquid reiciendis amet, consectetur corporis, repudiandae rem cumque itaque quisquam porro provident.z",
    date: "2024-11-04",
    categ: "Furniture",
    quan: 1,
    price: 15,
    type: "single",
    state: "accepted",
  },
  {
    id: 3,
    name: " Gear",
    img: "https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4",
    moreImgs:
      '["https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4", "https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4"]',

    status: "Available",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nam autem possimus debitis, ducimus sapiente facilis odit. Reprehenderit, aliquid reiciendis amet, consectetur corporis, repudiandae rem cumque itaque quisquam porro provident.z",
    date: "2024-11-04",
    categ: "games",
    quan: 3,
    price: 70,
    type: "single",
    state: "accepted",
  },
];

// My Products Page Functions
const renderMyProducts = async () => {
  await activeLoading();
  let rowsHtml = "";
  // Loop through testArray and generate HTML for each row
  await testProductsArray.forEach((ele) => {
    rowsHtml += `
      <tr id="${ele.id}" coverImg="${ele.img}" moreImgs='${ele.moreImgs}' ProductName="${ele.name}" desc="${ele.desc}" status="${ele.status}" date="${ele.date}" categ="${ele.categ}" quan="${ele.quan}" price="${ele.price}" type="${ele.type}" state=${ele.state}>
        <td>${ele.id}</td>
        <td><img src="${ele.img}" class="w-10 prodcut-img"/></td>
        <td>${ele.name}</td>
        
        <td><button class="btn btn-primary" onClick="productDetails(event)">Details</button></td>
      </tr>`;
  });

  container.innerHTML = `
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center py-3">
          <h1>My Products</h1>
      </div>

      <!-- Table -->
      <div class="card mb-4">
          <div class="card-header">Recent Activities</div>
          <div class="card-body">
              <table class="table">
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Image</th>

                          <th>Name</th>
                          <th>Details</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${rowsHtml} 
                  </tbody>
              </table>
          </div>
      </div>
  `;

  document.getElementById("sidebar").classList.remove("show");
  disableLoading();
};

const productDetails = (event) => {
  const parent = event.target.closest("tr");

  // Product attributes from the table
  const coverImg = parent.getAttribute("coverImg");
  const moreImgs = JSON.parse(parent.getAttribute("moreImgs") || "[]");

  // Modal HTML structure
  const modalHtml = `
    <div class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content p-4">
          <div class="modal-header">
            <h5 class="modal-title" id="detailsModalLabel">Product Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="content-wrapper">
            <!-- View Mode -->
            <div id="viewMode">
            <div id="productId" style="display:none;">${parent.getAttribute(
              "id"
            )}</div>
              <div class="form-group">
                <label>Cover Image:</label>
                <img src="${coverImg}" alt="Cover Image" class="img-fluid" />
              </div>
              <div class="form-group">
                <label>Other Images:</label>
                <div id="sliderContainer" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-inner">
                    ${moreImgs
                      .map(
                        (img, index) => `
                      <div class="carousel-item ${index === 0 ? "active" : ""}">
                        <img src="${img}" class="d-block w-100" alt="Image ${
                          index + 1
                        }" />
                      </div>`
                      )
                      .join("")}
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#sliderContainer" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#sliderContainer" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Edit Mode -->
            <div id="editMode" style="display: none;">
              <div class="form-group">
                <input type="checkbox" id="editImagesCheckbox" />
                <label for="editImagesCheckbox">Edit Images</label>
              </div>

              <!-- Cover Image Input -->
              <div class="form-group">
                <label for="coverImage">Cover Image</label>
                <input 
                  type="file" 
                  class="form-control" 
                  id="coverImage" 
                  disabled
                />
              </div>

              <!-- More Images Input -->
              <div class="form-group">
                <label for="moreImages">More Images</label>
                <input 
                  type="file" 
                  class="form-control" 
                  id="moreImages" 
                  multiple 
                  disabled
                />
              </div>
            </div>

            <!-- General Information -->
            <div class="sale-details-container">
              <h3>General Information</h3>
              <form id="productForm">
                <label for="productName">Product Name</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="productName" 
                  value="${parent.getAttribute("ProductName")}" 
                  readonly 
                />
                <div class="form-group">
                  <label for="productDescription">Product Description</label>
                  <textarea 
                    class="form-control" 
                    id="productDescription" 
                    rows="3" 
                    readonly 
                  >
                    ${parent.getAttribute("desc")}
                  </textarea>
                </div>
                <div class="form-group">
                  <label for="quantity">Quantity</label>
                  <input 
                    type="number" 
                    class="form-control" 
                    id="quantity" 
                    value="${parent.getAttribute("quan")}" 
                    readonly 
                  />
                </div>
                <div class="form-group">
                  <label for="price">Price</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="price" 
                    value="${parent.getAttribute("price")} $" 
                    readonly 
                  />
                </div>
                <div class="form-group">
              <label for="category">Category</label>
              <select class="form-control" id="category" disabled>
                <option value="furniture" ${
                  parent.getAttribute("categ") === "furniture" ? "selected" : ""
                }>Furniture</option>
                <option value="electronics" ${
                  parent.getAttribute("categ") === "electronics"
                    ? "selected"
                    : ""
                }>Electronics</option>
                <option value="games" ${
                  parent.getAttribute("categ") === "games" ? "selected" : ""
                }>Electronic or Regular Games</option>
                <option value="kit" ${
                  parent.getAttribute("categ") === "kit" ? "selected" : ""
                }>Kit</option>
              </select>

              <div class="form-group">
                            <label for="type">Type</label>
                            <select class="form-control" id="type" required disabled>
                                <option value="single" ${
                                  parent.getAttribute("type") === "single"
                                    ? "selected"
                                    : ""
                                } >Single Product</option>
                                <option value="group"  ${
                                  parent.getAttribute("type") === "single"
                                    ? ""
                                    : "selected"
                                }>Group Products</option>

                            </select>
                        </div>
                <div class="form-group">
                  <label for="state">State</label>
                  <div 
                    class="form-control" 
                    id="state" 
                disabled
                  >
                  ${parent.getAttribute("State")}
                  </div>
                </div>
            </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger me-auto" id="deleteButton">Delete</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="editButton">Edit</button>
            <button type="button" class="btn btn-success" id="saveButton" style="display: none;" onclick="saveProductDetails()">Save</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Append modal to the container
  container.innerHTML += modalHtml;

  // Show the modal using Bootstrap's modal method
  const detailsModal = new bootstrap.Modal(
    document.getElementById("detailsModal")
  );
  detailsModal.show();

  const editButton = document.getElementById("editButton");
  const saveButton = document.getElementById("saveButton");
  const viewMode = document.getElementById("viewMode");
  const editMode = document.getElementById("editMode");

  const editImagesCheckbox = document.getElementById("editImagesCheckbox");
  const coverImageInput = document.getElementById("coverImage");
  const moreImagesInput = document.getElementById("moreImages");

  const deleteButton = document.getElementById("deleteButton");

  // Switch to Edit Mode
  editButton.addEventListener("click", () => {
    // Switch UI modes
    viewMode.style.display = "none";
    editMode.style.display = "block";
    editButton.style.display = "none";
    saveButton.style.display = "inline-block";

    // Enable form fields for editing
    const formElements = document.querySelectorAll(
      "#productForm input, #productForm textarea, #productForm select"
    );
    formElements.forEach((el) => el.removeAttribute("readonly"));

    // Enable the select element explicitly
    document.getElementById("category").removeAttribute("disabled");
  });

  // Enable/Disable image inputs based on checkbox
  editImagesCheckbox.addEventListener("change", () => {
    const isChecked = editImagesCheckbox.checked;
    coverImageInput.disabled = !isChecked;
    moreImagesInput.disabled = !isChecked;
  });

  // Remove modal from DOM after closing
  document
    .getElementById("detailsModal")
    .addEventListener("hidden.bs.modal", () => {
      document.getElementById("detailsModal").remove();
    });

  // Handle Delete Button
  deleteButton.addEventListener("click", () => {
    detailsModal.hide();
    deleteProduct(parent.getAttribute("id"));
  });
};

const deleteProduct = (ProductId) => {
  console.log(ProductId);

  // Add delete function Fetch here
  renderMyProducts();
};

// Enable editing of fields
const enableEditing = () => {
  document.getElementById("editBtn").classList.add("d-none");
  document.getElementById("saveBtn").classList.remove("d-none");
  const formElements = document.querySelectorAll(
    "#productForm input, #productForm textarea, #productForm select"
  );
  formElements.forEach((el) => el.removeAttribute("readonly"));
  document.getElementById("category").removeAttribute("disabled");
  document.getElementById("status").removeAttribute("disabled");
};

// Save product details and send to backend
const saveProductDetails = async () => {
  const updatedProduct = {
    id: document.getElementById("productId").textContent,
    name: document.getElementById("productName").value,
    productDescription: document
      .getElementById("productDescription")
      .value.trim(),
    quantity: document.getElementById("quantity").value,
    price: document.getElementById("price").value,
    category: document.getElementById("category").value,
  };

  console.log("Updated Product Data:", updatedProduct);

  // try {
  //   // Replace with your backend endpoint
  //   const response = await fetch("/api/updateProduct", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedProduct),
  //   });

  //   if (response.ok) {
  //     alert("Product details updated successfully!");
  //     detailsModal.hide();
  //   } else {
  //     alert("Failed to update product details.");
  //   }
  // } catch (error) {
  //   console.error("Error updating product details:", error);
  //   alert("An error occurred. Please try again.");
  // }

  // Close the modal
  const detailsModalElement = document.getElementById("detailsModal");
  const detailsModalInstance = bootstrap.Modal.getInstance(detailsModalElement);
  detailsModalInstance.hide();

  renderMyProducts();
};
