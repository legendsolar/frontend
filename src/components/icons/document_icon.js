export const DocumentIcon = ({ color, darkColor, width = 55 }) => {
    return (
        <svg
            width={width}
            height={(69 / 55) * width}
            viewBox="0 0 55 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M38.3335 0L54.3335 16V69H0.333496V0H38.3335Z"
                fill={color}
            />

            <path d="M38.3335 0 L 54.3335 16 L 38.3335 16" fill={darkColor} />
        </svg>
    );
};
