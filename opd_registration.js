document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const paymentButton = document.createElement("button");
    paymentButton.textContent = "Proceed to Pay ₹200";
    form.appendChild(paymentButton);

    paymentButton.addEventListener("click", function(event) {
        event.preventDefault();
        alert("Redirecting to UPI / Net Banking for ₹200 payment...");
        window.location.href = ""; 
    });
});

