const CART_KEY = "cart";

const ProductsArray = [
  {
    id: 1,
    name: "Laptop asdf as dafasdf asd asdfads fads fasdf asdf asd ",
    coverImg: "../upload/image/product-1.jpg",
    images:
      '["https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4", "https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4"]',
    price: 199,
    categoryId: "1",
    categoryName: "Electronics",
    type: "single",
  },
  {
    id: 1,
    name: "Laptop ",
    coverImg: "../upload/image/product-1.jpg",
    images:
      '["https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4", "https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4"]',
    price: 199,
    categoryId: "1",
    categoryName: "Electronics",
    type: "single",
  },
  {
    id: 3,
    name: "Laptop ",
    coverImg: "../upload/image/product-1.jpg",
    images:
      '["https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4", "https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4"]',
    price: 199,
    categoryId: "1",
    categoryName: "Electronics",
    type: "single",
  },
  {
    id: 1,
    name: "Laptop ",
    coverImg: "../upload/image/product-1.jpg",
    images:
      '["https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4", "https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4"]',
    price: 199,
    categoryId: "1",
    categoryName: "Electronics",
    type: "single",
  },
  {
    id: 1,
    name: "Laptop ",
    coverImg: "../upload/image/product-1.jpg",
    images:
      '["https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4", "https://fastly.picsum.photos/id/453/200/200.jpg?hmac=IO3u3eOcKSOUCe8J1IlvctdxPKLTh5wFXvBT4O3BNs4"]',
    price: 199,
    categoryId: "1",
    categoryName: "Electronics",
    type: "group",
  },
];

// the categories should be depands on the categoryId , every category in database should have a categoryId
const renderProducts = async (categoryId = 0) => {
  activeLoading();
  // await fetch(`categories/categoryId-${categoryId}`).then().then();

  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";

  productsContainer.innerHTML += ProductsArray.map((product, index) => {
    return `<div class="product-card product product-2 ${product.type}">
      <div class="product-image">
        <img src="${product.coverImg}" alt="Product Image">
      </div>
      <div class="product-details">
        <div class="product-info">
          <h2 class="product-name">${product.name}</h2>
          <span class="product-price">${product.price} $</span>
        </div>
        <div class="product-btns">
          <span class="product-btn details-btn" onClick="showProductModal(event)" productId="${product.id}">
            <i class="bi bi-eye"></i>
            <span class="btn-text">Product Details</span>
          </span>
          <span class="product-btn add-to-cart-btn">
            <i class="bi bi-bag-plus"></i>
            <span class="btn-text" onClick="addToCart(${product.id})">Add to Cart</span>
          </span>
        </div>
      </div>
    </div>`;
  }).join("");

  disableLoading();
};

// Function to add product to cart
const addToCart = async (productId) => {
  let cart = JSON.parse(sessionStorage.getItem(CART_KEY)) || [];
  const existingProductIndex = cart.findIndex((item) => item.id === productId);

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quan += 1;
    console.log("exist");
  } else {
    // newProduct :   get the product details from Backend then add it to cart
    const newProduct = await getProductDetails(productId);
    cart.push(newProduct);
  }
  refreshCartCounter(cart.length);
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const getProductDetails = (productId) => {
  // await fetch("").then().then();

  //test product details

  return {
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
  };
};

// Function to show the modal with product details
const showProductModal = async (event) => {
  const product = event.target.parentElement;
  const productId = product.getAttribute("productId");
  const productData = await getProductDetails(productId);
  const modalElement = document.getElementById("productModal");
  const productModal = new bootstrap.Modal(modalElement);

  // Update modal content

  document.getElementById("productName").textContent = productData.name;
  document.getElementById("productDescription").textContent =
    productData.desc || "No description available.";
  document.getElementById("productPrice").textContent = productData.price;
  document.getElementById("productQuantity").textContent =
    productData.quan || "N/A";

  // Update carousel images
  const carouselInner = document.querySelector(
    "#productCarousel .carousel-inner"
  );
  console.log(JSON.parse(productData.moreImgs));

  carouselInner.innerHTML = JSON.parse(productData.moreImgs)
    .map(
      (img, index) => `
    <div class="carousel-item ${index === 0 ? "active" : ""}">
      <img src="${img}" class="d-block w-100" alt="Product Image ${index + 1}">
    </div>`
    )
    .join("");

  // Show the modal
  productModal.show();
};

const changeLayout = (layout) => {
  Array.from(document.querySelectorAll(".product")).forEach((product) => {
    product.classList.remove("product-1", "product-2");
    product.classList.add(`product-${layout}`);
  });
};

const handleScreenResize = () => {
  if (window.matchMedia("(max-width: 700px)").matches) {
    console.log("Test");

    changeLayout(2);
  }
};

// Show the loading spinner
const activeLoading = () => {
  const spinner = document.getElementById("pageLoadingSpinner");
  if (spinner) spinner.style.display = "flex";
};

// Hide the loading spinner
const disableLoading = () => {
  const spinner = document.getElementById("pageLoadingSpinner");
  if (spinner) spinner.style.display = "none";
};

const filterProducts = () => {
  const filterValue = document.getElementById("filter").value;
  const productsGrid = document.querySelector(".products-grid");
  const productCards = Array.from(
    productsGrid.getElementsByClassName("product")
  );
  productCards.map((product) => {
    product.style.display = "flex";
  });

  productCards.map((product) => {
    product.classList.contains(filterValue)
      ? product
      : (product.style.display = "none");
  });
};

const refreshCartCounter = (counter) => {
  const cartCounter = document.getElementById("cart-counter");
  if (counter == 0 || undefined) cartCounter.textContent = 0;
  else cartCounter.textContent = counter;
};
