// The small home link appears only after the large brand has scrolled away.
const hero = document.querySelector(".hero");
const brand = document.querySelector(".small-brand");
if (hero && brand && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(([entry]) => {
    const visible = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
    document.body.classList.toggle("brand-visible", visible);
    brand.setAttribute("aria-hidden", String(!visible));
    brand.tabIndex = visible ? 0 : -1;
  });
  observer.observe(hero);
}
