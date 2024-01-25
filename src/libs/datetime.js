export function dateTimeReadable(str) {
    return str.replace('T',' ').split('.')[0]
}
