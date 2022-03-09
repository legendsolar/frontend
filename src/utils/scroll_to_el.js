const scrollToEl = (el, offset = -40) => {
    window.scrollTo(0, el.offsetTop + offset);
};

export default scrollToEl;
