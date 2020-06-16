(() => {
    ScrollReveal().reveal('p, h2, .img', { delay: 350 });
})()

let targets;
(() => {
    targets = [...document.querySelectorAll(".content, .section-intro")] || [];
})()

function scrollNext() {
    const minHeight = window.innerHeight / 10;
    const scrollable = targets.find(target => target.getBoundingClientRect().top > minHeight);
    console.log({ scrollable })
    if (scrollable) {
        scrollable.scrollIntoView()
    }
}

