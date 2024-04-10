const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export function convertTime(time: string) {
    const date = new Date(time);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = months[monthIndex];

    return `${day} ${month}`;
}
