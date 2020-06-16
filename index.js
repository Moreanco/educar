(() => {
    ScrollReveal().reveal('p, h2, .img', { delay: 300 });
})()


function scrollNext() {
    const minHeight = window.innerHeight / 10;
    const targets = [...document.querySelectorAll('.content, .section-intro')] || [];
    const scrollable = targets.find(target => target.getBoundingClientRect().top > minHeight);
    console.log({ scrollable })
    if (scrollable) {
        scrollable.scrollIntoView()
    }
}

