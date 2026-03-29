window.AppNavigation = (function () {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileQuery = window.matchMedia("(max-width: 768px)");

  function setMenuState(isOpen) {
    if (!menuButton || !navigation) {
      return;
    }

    navigation.classList.toggle("open", isOpen);
    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  }

  function closeMenu() {
    setMenuState(false);
  }

  function toggleMenu() {
    if (!navigation) {
      return;
    }

    const isOpen = !navigation.classList.contains("open");
    setMenuState(isOpen);
  }

  function updateActiveLink(clickedLink) {
    navLinks.forEach((link) => link.classList.remove("active"));
    clickedLink.classList.add("active");
  }

  function getNormalizedPath(pathname) {
    if (!pathname || pathname === "/") {
      return "index.html";
    }

    const parts = pathname.split("/");
    return parts[parts.length - 1] || "index.html";
  }

  function highlightCurrentPage() {
    const currentPage = getNormalizedPath(window.location.pathname);

    navLinks.forEach((link) => {
      const linkUrl = new URL(link.getAttribute("href"), window.location.href);
      const linkPage = getNormalizedPath(linkUrl.pathname);

      link.classList.toggle("active", linkPage === currentPage);
    });
  }

  function syncMenuState(event) {
    if (!event.matches) {
      closeMenu();
    }
  }

  function init() {
    highlightCurrentPage();

    if (menuButton) {
      menuButton.addEventListener("click", toggleMenu);
    }

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        updateActiveLink(link);
        closeMenu();
      });
    });

    syncMenuState(mobileQuery);
    mobileQuery.addEventListener("change", syncMenuState);
  }

  return { init };
})();
