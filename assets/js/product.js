const items = {
  "earrings": "/pages/earring.html",
  // "earrings": "./earring.html",

  "earrings": "/pages/earring.html",
  // "earring": "./earring.html",

  "ring": "/pages/rings.html",
  "rings": "/pages/rings.html",

  "necklace": "/pages/Necklace.html",
  "necklaces": "/pages/Necklace.html",
  "bracelet": "/pages/Bracelet.html",
  "bracelets": "/pages/Bracelet.html",
  "bangle": "/pages/Bangle.html",
  "bangles": "/pages/Bangle.html",
  "bridal": "/pages/Bridal.html",
  "bridals": "/pages/Bridal.html",
  "chain": "/pages/chain.html",
  "chains": "/pages/chain.html",
  "nosepin": "/pages/Nose_pin.html",
  "nosepins": "/pages/Nose_pin.html",
  "gift": "/pages/GIfts.html",
  "gifts": "/pages/GIfts.html",
  "arrival": "/pages/best_seller.html", 
  "arrivals": "/pages/best_seller.html",


  "giftcard": "/pages/giftcard.html",
  "giftcards": "/pages/giftcard.html",


  




};

function handleSearch(event) {
  event.preventDefault();
  const query = document.getElementById('searchInput').value.toLowerCase();
  
  // Look for the query in the items object
  if (items[query]) {
    window.location.href = items[query];
  } else {
    alert("No results found for: " + query);
  }
}


  // Function to update prices dynamically based on quantity selection

  function updatePrices() {
    // Get the selected quantity
    const quantity = parseInt(document.getElementById("quantity").value, 10);
  
    // Retrieve base prices from initial DOM content
    const priceElement = document.getElementById("updatedPrice1");
    const discountPriceElement = document.getElementById("updatedPrice2");
  
    // Parse base prices from the initial content (without relying on data attributes)
    const basePrice = parseFloat(priceElement.getAttribute('data-original-price'));
    const baseDiscountedPrice = parseFloat(discountPriceElement.getAttribute('data-original-discount-price'));
  
    // Ensure base prices are valid numbers
    if (isNaN(basePrice) || isNaN(baseDiscountedPrice)) {
      console.error("Invalid base price or discounted price in the DOM.");
      return;
    }
  
   
    // Calculate updated prices
    const updatedPrice = basePrice * quantity;
    const updatedDiscountedPrice = baseDiscountedPrice * quantity;
  
    // Update the DOM with formatted prices
    priceElement.textContent = updatedPrice.toLocaleString("en-IN");
    discountPriceElement.innerHTML = `<del><i class='fa-solid fa-indian-rupee-sign'></i> ${updatedDiscountedPrice.toLocaleString("en-IN")}</del>`;
  }
  
  // Initialize prices with original values
  function initializePrices() {
    const priceElement = document.getElementById("updatedPrice1");
    const discountPriceElement = document.getElementById("updatedPrice2");
  
    const originalPrice = parseFloat(priceElement.textContent.replace(/,/g, ""));
    const originalDiscountPrice = parseFloat(discountPriceElement.textContent.replace(/,/g, "").replace(/[^\d]/g, ""));
  
    priceElement.setAttribute('data-original-price', originalPrice);
    discountPriceElement.setAttribute('data-original-discount-price', originalDiscountPrice);
  }
  
  // Add event listener to update prices when quantity changes
  document.getElementById("quantity").addEventListener("change", updatePrices);
  
  // Initialize base prices on page load
  initializePrices();

  function updateStockDisplay() {
    var currentStock = parseInt(localStorage.getItem('stock'));
    var stockElement = document.getElementById("stock");
    var soldOutMessage = document.getElementById("soldOutMessage");
    var soldOutMessage1 = document.getElementById("soldOutMessage1");
    var soldOutMessage2 = document.getElementById("soldOutMessage2");

    stockElement.innerText = currentStock;

    if (currentStock === 0) {
        soldOutMessage.style.display = "block";
        soldOutMessage1.style.display = "none";
        soldOutMessage2.style.display = "none";
    } else if (currentStock === 1) {
        soldOutMessage.style.display = "none";
        soldOutMessage1.style.display = "block";
        soldOutMessage2.style.display = "none";
    } else if (currentStock === 2) {
        soldOutMessage.style.display = "none";
        soldOutMessage1.style.display = "none";
        soldOutMessage2.style.display = "block";
    } else {
        soldOutMessage.style.display = "none";
        soldOutMessage1.style.display = "none";
        soldOutMessage2.style.display = "none";
    }
}
function buyNow() {


  var newStock = currentStock - selectedQty;
  if (newStock === 0) {
      newStock = 10; // Reset stock to 10 when it reaches 0
  }

  if (currentStock >= selectedQty && selectedQty > 0) {
      var newStock = currentStock - selectedQty;
      localStorage.setItem('stock', newStock);
      alert("Thank you for your purchase! , REDIRECTING YOU TO BILLING ADDRESS PAGE ");
      updateStockDisplay();
      // Add the product details to the orders
      addProductToOrders(productName, productImage, currentTime);
      // Redirect to checkout page
      window.location.href = "checkout.html";
  } else if (selectedQty <= 0) {
      alert("Please select a valid quantity.");
  } else {
      alert("Sorry, there is not enough stock available.");
  }
  var totalPrice = document.getElementById("currentPrice").innerText.substring(1); // Extracting the total price without '$'
  window.location.href = "paymentgateway.html?totalPrice=" + totalPrice;
}