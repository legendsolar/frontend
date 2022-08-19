import {
    differenceInMinutes,
    differenceInHours,
    differenceInDays,
} from 'date-fns';

export const dateDifferenceHumanReadable = (
    left: Date,
    right: Date,
): string => {
    const minutes = differenceInMinutes(left, right);

    if (minutes < 60) return `${minutes} minutes`;

    const hours = differenceInHours(left, right);

    if (hours < 25) return `${hours} hours`;

    const days = differenceInDays(left, right);

    return `${days} days`;
};
