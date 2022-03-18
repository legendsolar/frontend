const scrollToEl = (el, offset = -40) => {
    window.scrollTo({
        top: el.offsetTop + offset,
        behavior: "smooth",
    });
};

export default scrollToEl;
