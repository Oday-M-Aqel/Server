const CART_KEY = "cart";

const calcTotalPrice = () => {
  const cart = JSON.parse(sessionStorage.getItem(CART_KEY));
  totalPrice = cart.reduce(
    (sum, product) => (sum += product.price * product.quan),
    0
  );
  const defaultTotal = 0;
  return `<li class=" total list-group-item d-flex justify-content-between" style="background-color: #80808038;">
                        <span>Total </span>
                        <strong>$${
                          totalPrice.toFixed(2) || defaultTotal.toFixed(2)
                        }</strong>
                    </li>`;
};

const renderProducts = () => {
  const cart = JSON.parse(sessionStorage.getItem(CART_KEY));
  const productContainer = document.querySelector(".bill-container-products");
  cart.forEach((product) => {
    productContainer.innerHTML += `<li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">${product.name}</h6>
                            <small class="text-muted">${product.categ}</small>
                        </div>
                        <span class="text-muted">$${(
                          product.price * product.quan
                        ).toFixed(2)}</span>
                    </li>`;
  });
  productContainer.innerHTML += calcTotalPrice();
};
renderProducts();
