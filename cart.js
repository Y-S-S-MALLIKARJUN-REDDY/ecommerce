function displayCart() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let container =
        document.getElementById("cartContainer");

    if (!container) return;

    container.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        container.innerHTML =
            "<h3>Your cart is empty.</h3>";

        document.getElementById("total").innerText =
            "Total: ₹0";

        return;
    }

    cart.forEach((product, index) => {

        total += Number(product.price);

        container.innerHTML += `

            <div class="cart-item">

                <div>

                    <h3>${product.name}</h3>

                    <p>₹${product.price}</p>

                </div>

                <button
                    class="btn"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>

        `;

    });

    document.getElementById("total").innerText =
        "Total: ₹" + total;

}


function removeFromCart(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}


function placeOrder() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    let currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    if (!currentUser) {

        alert("Please login first!");

        window.location.href = "login.html";

        return;
    }

    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    let total = cart.reduce(
        (sum, product) =>
            sum + Number(product.price),
        0
    );

    let order = {

        id: Date.now(),

        user: currentUser.email,

        products: cart,

        total: total,

        status: "Pending"

    };

    orders.push(order);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    localStorage.removeItem("cart");

    alert("Order placed successfully!");

    window.location.href = "orders.html";

}


function displayOrders() {

    let container =
        document.getElementById("ordersContainer");

    if (!container) return;

    let currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    if (!currentUser) {

        container.innerHTML =
            "<p>Please login to view orders.</p>";

        return;
    }

    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];

    let userOrders = orders.filter(
        order =>
            order.user === currentUser.email
    );

    container.innerHTML = "";

    if (userOrders.length === 0) {

        container.innerHTML =
            "<h3>No orders found.</h3>";

        return;
    }

    userOrders.forEach(order => {

        container.innerHTML += `

            <div class="order-card">

                <h3>Order #${order.id}</h3>

                <p>
                    Total: ₹${order.total}
                </p>

                <p>
                    Status:
                    <strong>${order.status}</strong>
                </p>

            </div>

        `;

    });

}


displayCart();
displayOrders();