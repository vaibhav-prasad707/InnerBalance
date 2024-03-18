// JavaScript for form submission
document.getElementById("articleForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    var formData = new FormData(this);

    // Perform AJAX request to handle form submission
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "submit_article.php", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Handle successful form submission
            alert("Article submitted successfully!");
            // Reset the form
            document.getElementById("articleForm").reset();
        } else {
            // Handle form submission error
            alert("Error submitting article. Please try again.");
        }
    };
    xhr.send(formData);
});
