(() => {
  ScrollReveal().reveal("p, h2, .img", { delay: 350 });
})();

let targets;
let arrow;
(() => {
  targets = [...document.querySelectorAll(".content, .section-intro")] || [];
  arrow = document.querySelector(".fixed-container");
})();

function scrollNext() {
  const minHeight = window.innerHeight / 10;
  const scrollable = targets.find(
    (target) => target.getBoundingClientRect().top > minHeight
  );
  console.log({ scrollable });
  if (scrollable) {
    scrollable.scrollIntoView();
    displayArrowOrNot();
  }
}

function displayArrowOrNot() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
    arrow.style.display = "none";
  } else if (arrow.style.display === "none") {
    arrow.style.display = "block";
  }
};

window.addEventListener("scroll", displayArrowOrNot);