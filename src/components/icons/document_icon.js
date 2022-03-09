export const DocumentIcon = ({ color, darkColor }) => {
    return (
        <svg
            width="55"
            height="69"
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
