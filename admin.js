// ADMIN LOGIN

const adminLoginForm =
    document.getElementById("adminLoginForm");

if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            let username =
                document.getElementById(
                    "adminUsername"
                ).value;

            let password =
                document.getElementById(
                    "adminPassword"
                ).value;

            if (
                username === "admin" &&
                password === "admin123"
            ) {

                localStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );

                window.location.href =
                    "admin-dashboard.html";

            } else {

                alert("Invalid admin credentials!");

            }

        }
    );

}


// ADMIN DASHBOARD

function loadAdminDashboard() {

    let products =
        JSON.parse(
            localStorage.getItem("products")
        ) || [];

    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];

    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];

    let productCount =
        document.getElementById("productCount");

    let orderCount =
        document.getElementById("orderCount");

    let userCount =
        document.getElementById("userCount");

    if (productCount)
        productCount.innerText = products.length;

    if (orderCount)
        orderCount.innerText = orders.length;

    if (userCount)
        userCount.innerText = users.length;

    displayAdminProducts();

    displayAdminOrders();

}


const productForm =
    document.getElementById("productForm");

if (productForm) {

    productForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            let products =
                JSON.parse(
                    localStorage.getItem("products")
                ) || [];

            let product = {

                id: Date.now(),

                name:
                    document.getElementById(
                        "productName"
                    ).value,

                price:
                    Number(
                        document.getElementById(
                            "productPrice"
                        ).value
                    ),

                category:
                    document.getElementById(
                        "productCategory"
                    ).value,

                image:
                    document.getElementById(
                        "productImage"
                    ).value

            };

            products.push(product);

            localStorage.setItem(
                "products",
                JSON.stringify(products)
            );

            alert("Product added!");

            productForm.reset();

            displayAdminProducts();

            loadAdminDashboard();

        }
    );

}


function displayAdminProducts() {

    let container =
        document.getElementById("adminProducts");

    if (!container) return;

    let products =
        JSON.parse(
            localStorage.getItem("products")
        ) || [];

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `

            <div class="admin-product">

                <div>

                    <strong>${product.name}</strong>

                    <p>
                        ₹${product.price}
                        | ${product.category}
                    </p>

                </div>

                <button
                    class="btn"
                    onclick="deleteProduct(${product.id})">
                    Delete
                </button>

            </div>

        `;

    });

}


function deleteProduct(id) {

    let products =
        JSON.parse(
            localStorage.getItem("products")
        ) || [];

    products =
        products.filter(
            product => product.id !== id
        );

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    displayAdminProducts();

    loadAdminDashboard();

}


function displayAdminOrders() {

    let container =
        document.getElementById("adminOrders");

    if (!container) return;

    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];

    container.innerHTML = "";

    if (orders.length === 0) {

        container.innerHTML =
            "<p>No orders available.</p>";

        return;
    }

    orders.forEach((order, index) => {

        container.innerHTML += `

            <div class="order-card">

                <h3>
                    Order #${order.id}
                </h3>

                <p>
                    Customer:
                    ${order.user}
                </p>

                <p>
                    Total:
                    ₹${order.total}
                </p>

                <p>
                    Status:
                    ${order.status}
                </p>

                <button
                    class="btn"
                    onclick="updateOrder(${index})">
                    Update Status
                </button>

            </div>

        `;

    });

}


function updateOrder(index) {

    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];

    let status =
        prompt(
            "Enter status:\nPending / Shipped / Delivered"
        );

    if (!status) return;

    orders[index].status = status;

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    displayAdminOrders();

}


function adminLogout() {

    localStorage.removeItem("adminLoggedIn");

    window.location.href =
        "admin-login.html";

}


if (document.getElementById("productCount")) {

    loadAdminDashboard();

}