export function convertToGermanTime(timestamp) {
    const date = new Date(timestamp);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const germanTime = `${hours}:${minutes}`;

    return germanTime;
}
