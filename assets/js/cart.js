let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.id = `cart-item-${index}`;
      cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <p>${item.name}</p>
                <p><i class="fa-solid fa-indian-rupee-sign"></i> ${item.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
      cartItemsDiv.appendChild(cartItem);
    });
  }

  resizeImages(); // Ensure images are resized on page load
}

function resizeImages() {
  $("#cart-items img").each(function () {
    var maxWidth = 150; // Desired maximum width
    var maxHeight = 150; // Desired maximum height
    var img = $(this);
    var width = img.width();
    var height = img.height();

    // Adjust dimensions if image exceeds max size
    if (width > maxWidth || height > maxHeight) {
      var ratio = Math.min(maxWidth / width, maxHeight / height);
      img.width(width * ratio);
      img.height(height * ratio);
    }
  });
}

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  Swal.fire({
    title: "Item added to cart!",
    icon: "success",
    showCancelButton: true,
    confirmButtonText: "Go to cart",
    cancelButtonText: "Continue shopping",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "../cart.html";
    }
  })
  displayCart(); // Update the UI immediately after adding to cart
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(); // Re-display the cart after removal
  resizeImages(); // Ensure images are resized after an item is removed
}

// Initial display of cart items and resizing
displayCart();
