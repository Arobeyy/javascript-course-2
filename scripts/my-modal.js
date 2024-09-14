// Get the modal element
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const openModalBtn = document.getElementById("openModal");

// Get the button that closes the modal
const closeModalBtn = document.getElementById("closeModal");

// Event listener to open modal when the "Open Modal" button is clicked
openModalBtn.addEventListener("click", function() {
  modal.style.display = "flex"; // Display the modal as a flexbox (to center it)
});

// Event listener to close modal when the "Close Modal" button is clicked
closeModalBtn.addEventListener("click", function() {
  modal.style.display = "none"; // Hide the modal
});

// Optional: Close the modal if the user clicks anywhere outside the modal content
window.addEventListener("click", function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
