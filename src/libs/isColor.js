export function isColor(color) {
    return typeof color == "object" &&
    (typeof color[0] == "number") && (0 <= color[0]) && (color[0] <= 255) &&
    (typeof color[1] == "number") && (0 <= color[1]) && (color[1] <= 255) &&
    (typeof color[2] == "number") && (0 <= color[2]) && (color[2] <= 255)
}
export function isUint(number) {
    return (
        typeof number === "number" &&
        0 <= number &&
        Math.floor(number) === number
    )
}
