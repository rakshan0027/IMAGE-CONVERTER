document.addEventListener("DOMContentLoaded", function() {
    let dropdown = document.querySelector(".dropdown");

    dropdown.addEventListener("click", function(event) {
        event.stopPropagation();
        let dropdownMenu = this.querySelector(".dropdown-menu");
        dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
    });

    document.addEventListener("click", function() {
        document.querySelector(".dropdown-menu").style.display = "none";
    });
});
