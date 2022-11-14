const scrollToPosition = (position = 0) => {
    document.body.scrollTop = document.documentElement.scrollTop = position;
};

export default scrollToPosition;
