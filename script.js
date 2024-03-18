// JavaScript to toggle content visibility and icon
function toggleContent(sectionId) {
    var section = document.getElementById(sectionId);
    if (section.style.display === "none") {
      section.style.display = "block";
      document.getElementById('icon' + sectionId.slice(-1)).classList.remove('fa-chevron-down');
      document.getElementById('icon' + sectionId.slice(-1)).classList.add('fa-chevron-up');
    } else {
      section.style.display = "none";
      document.getElementById('icon' + sectionId.slice(-1)).classList.remove('fa-chevron-up');
      document.getElementById('icon' + sectionId.slice(-1)).classList.add('fa-chevron-down');
    }
  }
  