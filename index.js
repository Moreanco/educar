const getArrWords = (string) =>
  string
    .trim()
    .split(" ")
    .filter((el) => el !== "");

const getSpan = (word, className) => {
  const span = document.createElement("span");
  span.className = className;
  span.innerHTML = word;

  return span;
};

const fadeInLetter = (direction) => {
  const el = this.element;
  if (direction === "up") {
    return;
  }
  el.innerHTML = el.textContent.replace(
    /\S/g,
    "<span class='fade-in-letter'>$&</span>"
  );

  anime.timeline().add({
    targets: ".sub-title .fade-in-letter",
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 500 + 20 * i,
  });
};

const fadeInWord = (direction) => {
  const el = this.element;
  if (direction === "up") {
    return;
  }
  const words = getArrWords(el.textContent);
  el.innerHTML = "";
  words.forEach((w) => el.appendChild(getSpan(`${w} `, "fade-in-word")));

  anime.timeline().add({
    targets: ".fade-in-by-word .fade-in-word",
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 500 + 100 * i,
  });
};
// on load
(() => {
  ScrollReveal().reveal(".fade-in, .img", { delay: 350, duration: 1500 });

  const SCROLL_TRIGGER_OFFSET = "90%";

  $(".fade-in-by-word").waypoint({
    handler: (direction) => fadeInWord(direction),
    offset: SCROLL_TRIGGER_OFFSET,
  });

  $(".sub-title").waypoint({
    handler: (direction) => fadeInLetter(direction),
    offset: SCROLL_TRIGGER_OFFSET,
  });
})();

let targets;
(() => {
  targets = [...document.querySelectorAll(".content, .section-intro")] || [];
  arrow = document.querySelector(".fixed-container");
})();

function scrollNext() {
  const minHeight = window.innerHeight / 10;
  const scrollable = targets.find(
    (target) => target.getBoundingClientRect().top > minHeight
  );
  if (scrollable) {
    scrollable.scrollIntoView();
  }
}
