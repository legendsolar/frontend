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

    if (minutes < 60) return `${minutes} minute` + (minutes === 1 ? '' : 's');

    const hours = differenceInHours(left, right);

    if (hours < 25) return `${hours} hour` + (hours === 1 ? '' : 's');

    const days = differenceInDays(left, right);

    return `${days} day` + (days === 1 ? '' : 's');
};
