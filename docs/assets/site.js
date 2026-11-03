// Switch to the small home link when the hero passes behind the fixed header.
const hero = document.querySelector(".hero");
const brand = document.querySelector(".small-brand");
if (hero && brand && "IntersectionObserver" in window) {
  const headerHeight = document.querySelector(".header-rule").getBoundingClientRect().bottom;
  const observer = new IntersectionObserver(([entry]) => {
    const visible = !entry.isIntersecting && entry.boundingClientRect.bottom <= headerHeight;
    document.body.classList.toggle("brand-visible", visible);
    brand.setAttribute("aria-hidden", String(!visible));
    brand.tabIndex = visible ? 0 : -1;
  }, { rootMargin: `-${headerHeight}px 0px 0px 0px` });
  observer.observe(hero);

  // Retire the mascot before its feet and outline can cover the navigation.
  const mascot = document.querySelector(".mascot");
  const mascotObserver = new IntersectionObserver(([entry]) => {
    document.body.classList.toggle("mascot-scrolled",
      !entry.isIntersecting && entry.boundingClientRect.bottom <= headerHeight);
  }, { rootMargin: `-${headerHeight}px 0px 0px 0px` });
  mascotObserver.observe(mascot);
}
