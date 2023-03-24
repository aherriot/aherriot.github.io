(function (document) {
  var sidebarToggle = document.querySelector("#sidebar-toggle");
  var sidebar = document.querySelector("#sidebar");

  sidebarToggle.addEventListener("click", function (event) {
    sidebar.classList.toggle("open");
    return false;
  });
})(document);
