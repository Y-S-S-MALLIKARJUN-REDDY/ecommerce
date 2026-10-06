let products =
    JSON.parse(localStorage.getItem("products")) || [

    {
        id: 1,
        name: "Wireless Headphones",
        price: 1999,
        category: "Electronics",
        image: "https://via.placeholder.com/300"
    },

    {
        id: 2,
        name: "Smart Watch",
        price: 2999,
        category: "Electronics",
        image: "https://via.placeholder.com/300"
    },

    {
        id: 3,
        name: "T-Shirt",
        price: 799,
        category: "Clothing",
        image: "https://via.placeholder.com/300"
    },

    {
        id: 4,
        name: "Running Shoes",
        price: 2499,
        category: "Shoes",
        image: "https://via.placeholder.com/300"
    }

];

localStorage.setItem(
    "products",
    JSON.stringify(products)
);


function displayProducts() {

    let container =
        document.getElementById("productContainer");

    if (!container) return;

    let search =
        document.getElementById("search").value
        .toLowerCase();

    let category =
        document.getElementById("category").value;

    let filtered = products.filter(product => {

        let matchesSearch =
            product.name
            .toLowerCase()
            .includes(search);

        let matchesCategory =
            category === "all" ||
            product.category === category;

        return matchesSearch && matchesCategory;

    });

    container.innerHTML = "";

    filtered.forEach(product => {

        container.innerHTML += `

            <div class="product-card">

                <img src="${product.image}">

                <h3>${product.name}</h3>

                <p>Category: ${product.category}</p>

                <p><strong>
                    ₹${product.price}
                </strong></p>

                <button
                    class="btn"
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>

        `;

    });

}


function addToCart(id) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let product =
        products.find(p => p.id === id);

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Product added to cart!");

}


document
    .getElementById("search")
    .addEventListener("input", displayProducts);

document
    .getElementById("category")
    .addEventListener("change", displayProducts);

displayProducts();