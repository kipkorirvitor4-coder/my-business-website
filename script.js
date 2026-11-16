
// WATUmbao Website JavaScript

// Display a welcome message
console.log("Welcome to WATUmbao Furniture!");

// Smooth navigation
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(event) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Welcome message when the page loads
window.addEventListener("load", function() {
    console.log("WATUmbao website loaded successfully.");
});
