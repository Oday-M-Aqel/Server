const CART_KEY = "cart";

window.onload = () => {
  checkCart();
  viewCart();
};

// Function to display the cart
const viewCart = () => {
  const productContainer = document.querySelector(".product-container");
  const cart = JSON.parse(sessionStorage.getItem(CART_KEY)) || [];

  productContainer.innerHTML = "";

  if (cart.length === 0) {
    productContainer.innerHTML = `<h3 class="text-align-center">No Products in Cart</h3>`;
    return;
  }

  cart.forEach((product) => renderProducts(product));
  renderTotalPrice();
};

// Function to render products in the cart
const renderProducts = (product) => {
  const productContainer = document.querySelector(".product-container");
  productContainer.innerHTML += `
    <div class="row mb-4 d-flex justify-content-between align-items-center">
      <div class="col-md-2 col-lg-2 col-xl-2">
        <img src="${product.img}" class="img-fluid rounded-3" alt="${
    product.name
  }">
      </div>
      <div class="col-md-3 col-lg-3 col-xl-3">
        <h6 class="text-muted">${product.categ}</h6>
        <h6 class="mb-0">${product.name}</h6>
      </div>
      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
        <button class="btn btn-link px-2" onclick="updateQuantity(${
          product.id
        }, 'decrease')">
          <i class="fas fa-minus"></i>
        </button>
        <input min="1" name="quantity" id="price" value="${
          product.quan
        }" type="number"
          class="form-control form-control-sm" readonly />
        <button class="btn btn-link px-2" onclick="updateQuantity(${
          product.id
        }, 'increase')">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
        <h6 class="mb-0">$ ${(product.price * product.quan).toFixed(2)}</h6>
      </div>
      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
        <span class="text-muted" onClick="deleteProduct(${
          product.id
        })"><i class="fas fa-times"></i></span>
      </div>
    </div>
    <hr class="my-4">`;
};

// Function to update product quantity
const updateQuantity = (productId, action) => {
  let cart = JSON.parse(sessionStorage.getItem(CART_KEY)) || [];
  const productIndex = cart.findIndex((product) => product.id === productId);

  if (productIndex > -1) {
    if (action === "increase") {
      cart[productIndex].quan += 1;
    } else if (action === "decrease") {
      cart[productIndex].quan -= 1;
      if (cart[productIndex].quan < 1) {
        cart.splice(productIndex, 1);
      }
    }

    sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
    viewCart();
    renderTotalPrice();
  }
};

//delete product from cart
const deleteProduct = (productId) => {
  let cart = JSON.parse(sessionStorage.getItem(CART_KEY)) || [];
  const updatedCart = cart.filter((product) => product.id !== productId);
  sessionStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  viewCart();
  renderTotalPrice();
};

const checkCart = () => {
  if (!sessionStorage.getItem(CART_KEY)) {
    sessionStorage.setItem(CART_KEY, JSON.stringify([]));
  }
};

const renderTotalPrice = () => {
  const cart = JSON.parse(sessionStorage.getItem(CART_KEY));
  totalPrice = cart.reduce(
    (sum, product) => (sum += product.price * product.quan),
    0
  );
  document.querySelector(".total-price").textContent = totalPrice.toFixed(2);
  document.querySelector(".total-price1").textContent = totalPrice.toFixed(2);
};

// testing;
// sessionStorage.setItem(
//   CART_KEY,
//   JSON.stringify([
//     {
//       id: 1,
//       categ: "Electronics",
//       name: "Phone",
//       quan: 2,
//       price: 299.99,
//      img:
//         "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp",
//     },
//     {
//       id: 2,
//       categ: "Electronics",
//       name: "shirt",
//       quan: 1,
//       price: 299.99,
//       img  :
//         "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp",
//     },
//   ])
// );
