// test array to see how categories should be
const CategoriesArray = [
  {
    id: 1,
    name: "Furniture",
    imageUrl: "../upload/image/Furniture.jpg",
    productsCount: 5,
  },
  {
    id: 2,
    name: "Electronics",
    imageUrl: "../upload/image/product-2.jpg",
    productsCount: 78,
  },
  {
    id: 3,
    name: "Industrial equipment",
    imageUrl: "../upload/image/Industrial Equipment.png",
    productsCount: 4,
  },
  {
    id: 4,
    name: "games and accessories",
    imageUrl: "../upload/image/Video games and accessories.jpg",
    productsCount: 6,
  },
  {
    id: 5,
    name: "Sports and Fitness",
    imageUrl: "../upload/image/product-11.jpg",
    productsCount: 2,
  },
];

const renderCategrories = () => {
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = CategoriesArray.map(
    (categ) =>
      `<div class="circle" onClick="getProductsDepandOnCategory(${categ.id})" id="${categ.id}">
            <div class="circle-cover">
                <img src="${categ.imageUrl}" alt="Furniture" />
            </div>
            <p>${categ.name}</p>
        </div>`
  ).join("");

  const asideCategoriesContainer = document.querySelector(
    ".category-sidebar ul"
  );

  asideCategoriesContainer.innerHTML += CategoriesArray.map((categ) => {
    return `<li onClick="getProductsDepandOnCategory(${categ.id})">${categ.name}<span>(${categ.productsCount})</span></li>`;
  }).join("");
};

const getProductsDepandOnCategory = async (categNum) => {
  // console.log("render depand on ", categNum);

  //await fetch(`link/categNum`).then().then();
  // changeClassificationImage(categImg, categNum);

  await renderProducts();
  defaultFilters();
};

const defaultFilters = () => {
  document.getElementById("filter").value = "product";
  document.getElementById("sort").value = "default";
};
//on load function
