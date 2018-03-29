export const processTime = unixTimestamp => {
    const date = new Date(unixTimestamp);
    return (
        date.toDateString() +
        ' at ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds()
    );
};

export const capitalizeString = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
