function handleMainImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // Display the main image
      document.getElementById(
        "mainImage"
      ).style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(file);
  }
}

function handleImageUpload(event) {
  const files = event.target.files;
  const container = document.getElementById("smallImagesContainer");

  // Clear previous images
  container.innerHTML = "";

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = function (e) {
      // Create a new image element
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.width = "23%";
      img.style.height = "100px";
      img.style.objectFit = "cover";
      img.style.border = "2px solid #ccc";
      img.style.borderRadius = "5px";
      img.style.marginRight = "5px";

      // Append the image element to the container
      container.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
}

const submitProduct = () => {
  const productName = document.getElementById("productName").value.trim();
  const productDescription = document
    .getElementById("productDescription")
    .value.trim();
  const quantity = document.getElementById("quantity").value.trim();
  const price = document.getElementById("quantity").value.trim();
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const productCondition = document.getElementById("productCondition").value;

  const mainImage = document.getElementById("mainImage").style.backgroundImage;
  const smallImages = Array.from(
    document.getElementById("smallImagesContainer").children
  ).map((img) => img.src);

  if (!productName || !productDescription || !quantity || !price) {
    Swal.fire({
      title: "Oops!",
      text: "Please Fill All Fileds Before",
      icon: "error",
    });
    return;
  }

  const productData = {
    name: productName,
    description: productDescription,
    quantity: parseInt(quantity, 10),
    price: parseFloat(price),
    type: type,
    category: category,
    condition: productCondition,
    mainImage: mainImage,
    additionalImages: smallImages,
  };

  console.log("Product Data:", productData);

  submitProductData(productData);
};

const submitProductData = async (data) => {
  try {
    const response = await fetch("https:/api.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to submit product data.");

    const result = await response.json();
    console.log("Server Response:", result);
    Swal.fire({
      title: "Good job!",
      text: "Your Product Added Succesfully",
      icon: "success",
    });
  } catch (error) {
    console.error("Error submitting product data:", error);
    Swal.fire({
      title: "Failed",
      text: "Failed to submit product. Please try again later.",
      icon: "error",
    });
  }
};
