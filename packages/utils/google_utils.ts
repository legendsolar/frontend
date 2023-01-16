export const parseUserDisplayName = (displayName: string | undefined) => {
  if (!displayName) {
    return {
      firstName: undefined,
      lastName: undefined,
    };
  }

  const firstLast = displayName.split(" ");

  if (firstLast.length >= 3) {
    return {
      firstName: firstLast[0],
      lastName: firstLast[firstLast.length - 1],
    };
  } else if (firstLast.length === 2) {
    return {
      firstName: firstLast[0],
      lastName: firstLast[1],
    };
  } else {
    return {
      firstName: displayName,
      lastName: undefined,
    };
  }
};
