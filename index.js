const getArrWords = string => string.trim().split(' ').filter( el => el !== '' );

const getSpan = (word, className) => {
  const span = document.createElement('span');
  span.className = className;
  span.innerHTML = word;

  return span;
}

// Word Spread sci-fi effect handler.
const wordSpread = (el, direction) => {

  if (direction === 'up') {
    return;
  }

  const string = el.innerHTML;

  if (!string.includes('class="word"')) {
    el.innerHTML = '';
  
    let arrWords = getArrWords(string);
  
    arrWords.map(word => {
      const span = getSpan(`${word} `, 'word');
      el.appendChild(span);
    })
  }

  anime.timeline()
    .add({
      targets: '.spread-words .word',
      scale: [14,1],
      opacity: [0,1],
      easing: "easeOutCirc",
      duration: 200,
      delay: (el, i) => 200 * i
    });
}

// type write sci-fi effect handler
const typeWrite = async (el, direction) => {
  if (direction === 'up') {
    return;
  }

  const string = el.innerHTML.trim();

  if (!string.includes('text-wrapper')) {

    const wrapper = getSpan('', 'text-wrapper');

    await wrapper.appendChild(getSpan('', 'line line1'))
    await wrapper.appendChild(getSpan(string, 'letters'))

    el.innerHTML = '';
    el.appendChild(wrapper)
  }

  var textWrapper = document.querySelector('.type-write .letters');
  textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter' style='opacity:0'>$&</span>");

  anime.timeline()
    .add({
      targets: '.type-write .line',
      scaleY: [0,1],
      opacity: [0.5,1],
      easing: "easeOutExpo",
      duration: 900
    })
    .add({
      targets: '.type-write .line',
      translateX: [0, document.querySelector('.type-write .letters').getBoundingClientRect().width + 10],
      easing: "easeOutExpo",
      duration: 900,
      delay: 200
    })
    .add({
      targets: '.type-write .letter',
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 800,
      offset: '-=775',
      delay: (el, i) => 34 * (i+1)
    });
}

// on load
(() => {
  ScrollReveal().reveal(".fade-in, .img", { delay: 300, duration: 1500 });

  const SCROLL_TRIGGER_OFFSET = '95%';

  // SPREAD WORD SCI-FI EFFECT
  document
    .querySelectorAll('.spread-words')
    .forEach(element => {
      new Waypoint({
        element,
        handler: direction => wordSpread(element, direction),
        offset: SCROLL_TRIGGER_OFFSET
      })
    })

  // TYPE WRITE SCI-FI EFFECT
  document
    .querySelectorAll('.type-write')
    .forEach(element => {
      new Waypoint({
        element,
        handler: direction => typeWrite(element, direction),
        offset: SCROLL_TRIGGER_OFFSET
      })
    })

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