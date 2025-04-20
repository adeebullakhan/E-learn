  document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartText = document.querySelector(".nav_cart");
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartOverlay = document.getElementById("cart-overlay");
    const cartItemsContainer = document.getElementById("cart-items");
    const checkoutBtn = document.getElementById("checkout-btn");
    const cartIcon = document.querySelector(".nav_cart");
    const closeCartBtn = document.getElementById("close-cart");
    const enrollButtons = document.querySelectorAll(".enroll-btn");

    // Function to update cart UI
    function updateCartUI() {
      cartItemsContainer.innerHTML = "";
      let totalPrice = 0;

      if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-gray-600">Your cart is empty.</p>`;
        checkoutBtn.classList.add("hidden");
      } else {
        checkoutBtn.classList.remove("hidden");
      }

      cart.forEach((item, index) => {
        totalPrice += item.price;

        const cartItem = document.createElement("div");
        cartItem.classList.add("flex", "items-center", "justify-between", "border-b", "py-3");

        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded">
          <div class="flex-1 ml-4">
            <h3 class="text-lg font-semibold">${item.name}</h3>
            <p class="text-gray-600">${item.description}</p>
            <p class="text-blue-600 font-bold">$${item.price.toFixed(2)}</p>
          </div>
          <button class="remove-item text-red-500 hover:text-red-700" data-index="${index}">&times;</button>
        `;

        cartItemsContainer.appendChild(cartItem);
      });

      // Update Cart Count in Navbar
      cartText.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart (${cart.length})`;

      // Save to LocalStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Add event listeners for remove buttons
      document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function () {
          const index = this.getAttribute("data-index");
          cart.splice(index, 1);
          updateCartUI();
        });
      });
    }

    // Function to toggle cart drawer
    function openCart() {
      cartSidebar.classList.add("open");
      cartOverlay.classList.add("show");
    }
    function closeCart() {
      cartSidebar.classList.remove("open");
      cartOverlay.classList.remove("show");
    }

    // Add to Cart Function
    enrollButtons.forEach(button => {
      button.addEventListener("click", function () {
        const course = this.closest(".course");
        const courseName = course.dataset.course;
        const courseImage = course.querySelector("img").src;
        const courseDesc = course.querySelector("p").innerText;
        const coursePrice = (Math.random() * (99 - 30) + 30).toFixed(2); // Random price between $30 and $99

        // Create Item Object
        const cartItem = {
          name: courseName,
          image: courseImage,
          description: courseDesc,
          price: parseFloat(coursePrice),
        };

        cart.push(cartItem);
        updateCartUI();
        alert(`${courseName} has been added to the cart!`);
      });
    });

    // Checkout Function
    checkoutBtn.addEventListener("click", function () {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      alert("Checkout successful! Thank you for your purchase.");
      cart = [];
      updateCartUI();
      checkout(); /// changes 1
      closeCart();
    });
/// added new code
  //   function checkout() {
  //     let cartItems = JSON.parse(localStorage.getItem("cartItems")) ;//|| [];
    
  //     if (cartItems.length === 0) {
  //         alert("Your cart is empty!");
  //         return;
  //     }
  
  //     //  Save checked-out courses to localStorage
  //     localStorage.setItem("checkedOutCourses", JSON.stringify(cartItems));
  //     console.log("Checked-out courses:", checkedOutCourses);
  
  //     // Clear the cart after checkout
  //     localStorage.removeItem("cartItems");
  
  //     alert("Checkout successful! Your courses have been added to 'Your Courses'.");
  
  //     // Redirect to "Your Courses" page
  //     window.location.href = "your-courses.html";
  // }
  


    // Event Listeners
    cartIcon.addEventListener("click", openCart);
    closeCartBtn.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);

    // Load Cart on Page Load
    updateCartUI();
  });




//your-courses
 // Initialize Cart & Your Courses
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

// Function to Add Course to Cart
function addToCart(courseId, title, price, image) {
    // Check if course already in cart
    if (!cart.some(course => course.id === courseId)) {
        cart.push({ id: courseId, title, price, image });
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    updateCartUI();
}

// Function to Remove Course from Cart
function removeFromCart(courseId) {
    cart = cart.filter(course => course.id !== courseId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// Function to Checkout (Move to "Your Courses")
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Move items from Cart to Enrolled Courses
    enrolledCourses = [...enrolledCourses, ...cart];
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));

    // Clear Cart after Checkout
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
    alert("Checkout Successful! Courses added to 'Your Courses'.");
}

// Function to Update Cart UI (For Sidebar)
function updateCartUI() {
    let cartContainer = document.getElementById("cart-items");
    let totalAmount = document.getElementById("total-amount");
    let checkoutButton = document.getElementById("checkout-btn");

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach(course => {
        let courseItem = document.createElement("div");
        courseItem.classList.add("cart-item");
        courseItem.innerHTML = `
            <img src="${course.image}" alt="${course.title}" class="w-16 h-16 rounded">
            <div>
                <h3 class="text-sm font-semibold">${course.title}</h3>
                <p class="text-gray-500">$${course.price}</p>
                <button onclick="removeFromCart(${course.id})" class="text-red-500 text-xs">Remove</button>
            </div>
        `;
        cartContainer.appendChild(courseItem);
        total += parseFloat(course.price);
    });

    totalAmount.textContent = `$${total.toFixed(2)}`;
    checkoutButton.style.display = cart.length > 0 ? "block" : "none";
}

// Load Cart UI on Page Load
document.addEventListener("DOMContentLoaded", updateCartUI);
  // signup popup
  function openSignupPopup() {
    document.getElementById("signup-popup").classList.remove("hidden");
}

function closeSignupPopup() {
    document.getElementById("signup-popup").classList.add("hidden");
}

// Close popup when clicking outside the form
window.addEventListener("click", function (event) {
    const popup = document.getElementById("signup-popup");
    if (event.target === popup) {
        closeSignupPopup();
    }
});


// signin popup

function openSigninPopup() {
    document.getElementById("signin-popup").classList.remove("hidden");
}

function closeSigninPopup() {
    document.getElementById("signin-popup").classList.add("hidden");
}

// Close popup when clicking outside the form
window.addEventListener("click", function (event) {
    const popup = document.getElementById("signin-popup");
    if (event.target === popup) {
        closeSigninPopup();
    }
});

// Prevent form submission (For now, it just shows an alert)
// document.getElementById("signin-form").addEventListener("submit", function (event) {
//     event.preventDefault();
//     alert("Sign In Successful! (Backend Integration Needed)");
//     closeSigninPopup();
// });


// // login for db

// document.getElementById("signin-form").addEventListener("submit", async function(event) {
//   event.preventDefault();

//   const email = document.getElementById("loginemail").value;
//   const password = document.getElementById("loginpassword").value;

//   const loginData = {  email, password };

//   try {
//       const response = await fetch("http://localhost:6050/api/auth/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(loginData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//           alert("loggedin  successfully!");
//           closeSigninPopup();
//       } else {
//           alert(`Error: ${data.message}`);
//       }
//   } catch (error) {
//       alert("Something went wrong!");
//   }
// });



BASE_URL='http://localhost:6050/api/auth';
 // Signup
 document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  alert(result.message || 'Signup complete!');
  form.reset();
  closeSignupPopup();
});

// Signin
document.getElementById('signin-popup').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    email:document.getElementById("loginemail").value,
    password: document.getElementById("loginpassword").value
  };

  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (res.ok) {
    alert('Signin successful!');
    localStorage.setItem('token', result.token); // Save JWT
    closeSigninPopup()
  } else {
    alert(result.message || 'Signin failed.');
  }

  form.reset();
});