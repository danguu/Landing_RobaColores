(function () {
  var navMenus = document.querySelectorAll("nav details");
  var pageViews = document.querySelectorAll(".page-view:not(#footer)");
  var footer = document.getElementById("footer");

  function findView(id) {
    var view = document.getElementById(id);
    return view && view.classList.contains("page-view") ? view : null;
  }

  function showView(view) {
    pageViews.forEach(function (pageView) {
      pageView.hidden = pageView !== view;
    });
    footer.hidden = view.id !== "home";

    navMenus.forEach(function (menu) {
      menu.open = false;
    });

    window.scrollTo(0, 0);
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link) return;

    var viewId = link.getAttribute("href").slice(1);
    var view = findView(viewId);
    if (!view) return;

    event.preventDefault();
    showView(view);
    window.history.pushState(null, "", "#" + view.id);
  });

  window.addEventListener("popstate", function () {
    showView(findView(window.location.hash.slice(1)) || findView("home"));
  });

  showView(findView(window.location.hash.slice(1)) || findView("home"));
})();
