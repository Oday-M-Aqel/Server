// test Array (you can delete it)
const testArray = [
  {
    id: 1,
    sellerName: "Ahmed",
    name: "Jexon",
    status: "Success",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nam autem possimus debitis, ducimus sapiente facilis odit. Reprehenderit, aliquid reiciendis amet, consectetur corporis, repudiandae rem cumque itaque quisquam porro provident.z",
    date: "2024-11-04",
    categ: "electronics",
    quan: 1,
    price: 25,
  },
  {
    id: 2,
    sellerName: "Ahmed",
    name: "Motor",
    status: "Success",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nam autem possimus debitis, ducimus sapiente facilis odit. Reprehenderit, aliquid reiciendis amet, consectetur corporis, repudiandae rem cumque itaque quisquam porro provident.z",
    date: "2024-11-04",
    categ: "Furniture",
    quan: 1,
    price: 15,
  },
  {
    id: 3,
    sellerName: "Ahmed",
    name: " Gear",
    status: "Success",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nam autem possimus debitis, ducimus sapiente facilis odit. Reprehenderit, aliquid reiciendis amet, consectetur corporis, repudiandae rem cumque itaque quisquam porro provident.z",
    date: "2024-11-04",
    categ: "games",
    quan: 3,
    price: 70,
  },
];

// overview Page Functions
const renderOverview = async () => {
  activeLoading();
  let rowsHtml = "";
  // Loop through testArray and generate HTML for each row
  testArray.forEach((ele) => {
    rowsHtml += `
      <tr id="${ele.id}" sellerName="${ele.sellerName}" ProductName="${ele.name}" desc="${ele.desc}" status="${ele.status}" date="${ele.date}" categ="${ele.categ}" quan="${ele.quan}" price="${ele.price}">
        <td>${ele.name}</td>
        <td>${ele.status}</td>
        <td>${ele.date}</td>
        <td><button class="btn btn-primary" onClick="OverviewnDetailsPage(event)">Details</button></td>
      </tr>`;
  });

  container.innerHTML = `
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center py-3">
          <h1>Overview</h1>
      </div>

      <!-- Table -->
      <div class="card mb-4">
          <div class="card-header">Recent Activities</div>
          <div class="card-body">
              <table class="table">
                  <thead>
                      <tr>
                          <th>Activity</th>
                          <th>Status</th>
                          <th>Date</th>
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

const OverviewnDetailsPage = (event) => {
  // Retrieve the parent row to access details
  const parent = event.target.closest("tr");

  // Modal HTML structure
  const modalHtml = `
   <div class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content p-4">
      <div class="modal-header">
        <h5 class="modal-title" id="detailsModalLabel">Order Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="content-wrapper">
        <!-- General Information and Sale Details -->
        <div class="form-wrapper">
          <!-- General Information -->
          <div class="sale-details-container">
            <h3>General Information</h3>
            <form id="productForm">
              <div class="form-group">
                <label for="seller-name">Seller Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="seller-name"
                  placeholder="Enter Seller Name"
                  value="${parent.getAttribute("sellerName")}"
                  readonly
                />
              </div>
                <label for="productName">Product Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="productName"
                  placeholder="Enter product name"
                  value="${parent.getAttribute("ProductName")}"
                  readonly
                />
              </div>

              <div class="form-group">
                <label for="productDescription">Product Description</label>
                <textarea
                  class="form-control"
                  id="productDescription"
                  placeholder="Describe the product"
                  rows="3"
                  readonly
                >
                ${parent.getAttribute("desc")}.
                </textarea>
              </div>

              <div class="form-group">
                <label for="quantity">Quantity</label>
                <input
                  type="number"
                  class="form-control"
                  id="quantity"
                  placeholder="Enter quantity"
                  value="${parent.getAttribute("quan")}"
                  readonly
                />
              <div class="form-group">
                <label for="price">Price</label>
                <input
                  type="text"
                  class="form-control"
                  id="price"
                  placeholder="Enter price"
                  value="${parent.getAttribute("price")} $"
                  readonly
                />
              </div>
            </form>
          </div>

          <!-- Sale Details -->
          <div class="sale-details-container mt-3">
            <h3>Sale Details</h3>
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

            </div>

            <div class="form-group">
              <label>Commission Rates</label>
              <ul>
                <li>Furniture: 10%</li>
                <li>Electronics: 15%</li>
                <li>Electronic or Regular Games: 8%</li>
                <li>Kit: 6%</li>
              </ul>
            </div>

            <p class="note">
              * These percentages are paid every month for each single item
              and are considered as a rental replacement if the product is
              returned after a certain period. If the full amount is paid, the
              product is considered owned.
            </p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
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

  // Remove the modal from DOM after it's closed to avoid duplicates
  document
    .getElementById("detailsModal")
    .addEventListener("hidden.bs.modal", () => {
      document.getElementById("detailsModal").remove();
    });
};
