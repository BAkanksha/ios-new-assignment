// Fetch and display products
function fetchProducts() {
    fetch("https://app.getswipe.in/api/public/get")
        .then(response => response.json())
        .then(data => displayProducts(data))
        .catch(error => console.error("Error fetching products:", error));
}

// Display products in a grid
function displayProducts(products) {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "col-md-4 mb-4";
        
        productCard.innerHTML = `
            <div class="card">
                <img src="${product.image || 'default-image.png'}" class="card-img-top" alt="${product.product_name}">
                <div class="card-body">
                    <h5 class="card-title">${product.product_name}</h5>
                    <p class="card-text">Type: ${product.product_type}</p>
                    <p class="card-text">Price: $${product.price}</p>
                    <p class="card-text">Tax: ${product.tax}%</p>
                    <span class="favorite-icon" onclick="toggleFavorite(this)">❤️</span>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Toggle favorite status
function toggleFavorite(element) {
    element.classList.toggle("favorited");
}

// Show add product form and hide product listing
function showAddProduct() {
    document.getElementById("productListing").style.display = "none";
    document.getElementById("addProductForm").style.display = "block";
}

// Show product listing and hide add product form
function showProductListing() {
    document.getElementById("productListing").style.display = "block";
    document.getElementById("addProductForm").style.display = "none";
}

// Add a new product
function addProduct(event) {
    event.preventDefault();
    const productName = document.getElementById("productName").value;
    const productType = document.getElementById("productType").value;
    const productPrice = document.getElementById("productPrice").value;
    const productTax = document.getElementById("productTax").value;
    const productImage = document.getElementById("productImage").files[0];

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("product_type", productType);
    formData.append("price", productPrice);
    formData.append("tax", productTax);
    if (productImage) formData.append("files[]", productImage);

    fetch("https://app.getswipe.in/api/public/add", {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message || "Product added successfully!");
            showProductListing();
            fetchProducts(); // Refresh product list
        })
        .catch(error => console.error("Error adding product:", error));
}
