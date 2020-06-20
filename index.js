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

const addAnimated = el => el.classList.add('animated')
const hasBeenAnimated = el => el.classList.contains('animated')

let fadeInLetterNumber = 0;
const fadeInLetter = (el, direction) => {
  if (direction === "up" || hasBeenAnimated(el)) {
    return;
  }
  el.innerHTML = el.textContent.replace(
    /\S/g,
    "<span class='fade-in-letter'>$&</span>"
  );
  const className = `fade-in-${fadeInLetterNumber}`;
  el.classList.add(className);
  fadeInLetterNumber++

  anime.timeline().add({
    targets: `.${className} .fade-in-letter`,
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 2500,
    delay: (el, i) => 500 + 20 * i,
    begin: () => addAnimated(el)
  });
};

const fadeInWord = (el, direction) => {
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
    duration: 2500,
    delay: (el, i) => 500 + 40 * i,
    begin: () => addAnimated(el),
  });
};
// on load
(() => {
  ScrollReveal().reveal(".fade-in, .img", { delay: 350, duration: 1500 });

  const offset = "bottom-in-view";

  document.querySelectorAll(".sub-title").forEach((element) => {
    new Waypoint({
      element,
      handler: (direction) => fadeInLetter(element, direction),
      offset,
    });
  });
  document.querySelectorAll(".fade-in-by-word").forEach((element) => {
    new Waypoint({
      element,
      handler: (direction) => fadeInWord(element, direction),
      offset,
    });
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
