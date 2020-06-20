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

// Word Spread sci-fi effect handler.
const wordSpread = (el, direction) => {
  if (direction === "up") {
    return;
  }

  const string = el.innerHTML;

  if (!string.includes('class="word"')) {
    el.innerHTML = "";

    let arrWords = getArrWords(string);

    arrWords.map((word) => {
      const span = getSpan(`${word} `, "word");
      el.appendChild(span);
    });
  }

  anime.timeline().add({
    targets: ".spread-words .word",
    scale: [14, 1],
    opacity: [0, 1],
    easing: "easeOutCirc",
    duration: 200,
    delay: (el, i) => 200 * i,
  });
};

// type write sci-fi effect handler
const typeWrite = async (el, direction) => {
  if (direction === "up") {
    return;
  }

  const string = el.innerHTML.trim();

  if (!string.includes("text-wrapper")) {
    const wrapper = getSpan("", "text-wrapper");

    await wrapper.appendChild(getSpan("", "line line1"));
    await wrapper.appendChild(getSpan(string, "letters"));

    el.innerHTML = "";
    el.appendChild(wrapper);
  }

  let textWrapper = document.querySelector(".type-write .letters");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /([^\x00-\x80]|\w)/g,
    "<span class='letter' style='opacity:0'>$&</span>"
  );

  const lineWidth = document
    .querySelector(".type-write .letters")
    .getBoundingClientRect().width;
  anime
    .timeline()
    .add({
      targets: ".type-write .line",
      scaleY: [0, 1],
      opacity: [0.5, 1],
      easing: "easeOutExpo",
      duration: 900,
    })
    .add({
      targets: ".type-write .line",
      translateX: [0, lineWidth + 10],
      easing: "easeOutExpo",
      duration: 900,
      delay: 200,
    })
    .add({
      targets: ".type-write .letter",
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 800,
      offset: "-=775",
      delay: (el, i) => 34 * (i + 1),
    })
    .add({
      targets: ".type-write .line",
      scaleY: [1, 0],
      opacity: [1, 0],
      translateX: [lineWidth + 10, lineWidth + 10],
      easing: "easeOutExpo",
      duration: 900,
    });
};

const fadeInTitle = (el, direction) => {
  console.log({ el, direction })
  if (direction === "up") {
    return;
  }
  const textWrapper = document.querySelector(".fade-in-title");
  const words = getArrWords(textWrapper.textContent);
  textWrapper.innerHTML = '' 
  words.forEach(
    (w) => textWrapper.appendChild(getSpan(`${w} `, "fade-in-word")),
    ""
  );

  anime.timeline().add({
    targets: ".fade-in-title .fade-in-word",
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 500 + 100 * i,
    complete: () => {
      textWrapper.innerHTML = textWrapper.textContent.replace(
        /\<span class\=\"fade\-in\-letter\"\>(.*?)\<\/span\>/g,
        "$&"
      );
    }
  });
};
// on load
(() => {
  ScrollReveal().reveal(".fade-in, .img", { delay: 350, duration: 1500 });

  const SCROLL_TRIGGER_OFFSET = "95%";

  // SPREAD WORD SCI-FI EFFECT
  document.querySelectorAll(".spread-words").forEach((element) => {
    new Waypoint({
      element,
      handler: (direction) => wordSpread(element, direction),
      offset: SCROLL_TRIGGER_OFFSET,
    });
  });

  // TYPE WRITE SCI-FI EFFECT
  document.querySelectorAll(".type-write").forEach((element) => {
    new Waypoint({
      element,
      handler: (direction) => typeWrite(element, direction),
      offset: SCROLL_TRIGGER_OFFSET,
    });
  });

  document.querySelectorAll(".fade-in-title").forEach((element) => new Waypoint({
      element,
      handler: (direction) => fadeInTitle(element, direction),
      offset: SCROLL_TRIGGER_OFFSET,
    }));
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
