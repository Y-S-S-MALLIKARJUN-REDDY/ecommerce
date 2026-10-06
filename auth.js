// SIGNUP

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        let existingUser = users.find(
            user => user.email === email
        );

        if (existingUser) {

            alert("Email already registered!");

            return;
        }

        let user = {
            name: name,
            email: email,
            password: password
        };

        users.push(user);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Signup successful!");

        window.location.href = "login.html";

    });
}


// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let email =
            document.getElementById("loginEmail").value;

        let password =
            document.getElementById("loginPassword").value;

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        let user = users.find(
            u =>
                u.email === email &&
                u.password === password
        );

        if (user) {

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

            alert("Login successful!");

            window.location.href = "products.html";

        } else {

            alert("Invalid email or password!");

        }

    });
}


// LOGOUT

function logout() {

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";
}