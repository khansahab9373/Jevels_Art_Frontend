// Sample wishlist data
const wishlist = [];

// Function to add product to wishlist
function addToWishlist(id, title, image, price) {
  // Check if product is already in the wishlist
  if (!wishlist.some(item => item.id === id)) {
    wishlist.push({ id, title, image, price });
    renderWishlist();
  } else {
    alert('This product is already in your wishlist.');
  }
}

// Function to render the wishlist
function renderWishlist() {
  const wishlistContainer = document.getElementById('wishlistContainer');
  wishlistContainer.innerHTML = ''; // Clear existing wishlist

  wishlist.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('wishlist-item');
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <h5>${item.title}</h5>
      <p>₹${item.price}</p>
      <button class="btn btn-primary" onclick="buyNow(${item.id})">Buy Now</button>
      <button class="btn btn-danger" onclick="removeFromWishlist(${item.id})">Remove</button>
    `;
    wishlistContainer.appendChild(itemDiv);
  });
}

// Function to handle "Buy Now" click
function buyNow(id) {
  alert('Redirecting to payment for product ID: ' + id);
  // Implement the actual payment process here
}

// Function to remove product from wishlist
function removeFromWishlist(id) {
  const index = wishlist.findIndex(item => item.id === id);
  if (index !== -1) {
    wishlist.splice(index, 1);
    renderWishlist(); // Re-render wishlist
  }
}
