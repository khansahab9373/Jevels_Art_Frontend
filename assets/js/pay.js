// let cardNumInput = 
// 	document.querySelector('#cardNum') 

// cardNumInput.addEventListener('keyup', () => { 
// 	let cNumber = cardNumInput.value 
// 	cNumber = cNumber.replace(/\s/g, "") 

// 	if (Number(cNumber)) { 
// 		cNumber = cNumber.match(/.{1,4}/g) 
// 		cNumber = cNumber.join(" ") 
// 		cardNumInput.value = cNumber 
// 	} 
// })
// Wait until the page is fully loaded
window.onload = function () {
    // Get the total price from the URL and display it
    var urlParams = new URLSearchParams(window.location.search);
    var totalPrice = urlParams.get('totalPrice');
    if (totalPrice) {
        document.getElementById("totalPriceDisplay").innerText = "$" + totalPrice;
    }
};

// Format the credit card number field dynamically
let cardNumInput = document.querySelector('#cardNum');
cardNumInput.addEventListener('keyup', () => {
    let cNumber = cardNumInput.value;
    cNumber = cNumber.replace(/\s/g, ""); // Remove whitespace

    if (Number(cNumber)) {
        cNumber = cNumber.match(/.{1,4}/g); // Group numbers in blocks of 4
        if (cNumber) {
            cNumber = cNumber.join(" ");
            cardNumInput.value = cNumber;
        }
    } else {
        cardNumInput.value = ""; // Clear invalid input
    }
});

// Add form validation and submission handling
document.getElementById("paymentForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Validate credit card number
    let cardNum = cardNumInput.value.replace(/\s/g, ""); // Remove whitespace
    if (!/^\d{16}$/.test(cardNum)) { // Check if it's a 16-digit number
        Swal.fire({
            icon: "error",
            title: "Invalid Card Number",
            text: "Credit card number must be 16 digits long and contain only numbers.",
        });
        return;
    }

    // Additional validations can go here (e.g., CVV, expiration date, etc.)

    // Show success alert
    Swal.fire({
        position: "centre",
        icon: "success",
        title: "Payment Successful!",
        text: "Redirecting you shortly...",
        showConfirmButton: false,
        timer: 2000
    });

    // Redirect to another page after 2 seconds
    setTimeout(function () {
        window.location.href = "../index.html";
    }, 5000);
});

