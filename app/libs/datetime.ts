export function dateTimeReadable(str: string) {
  return str.replace("T", " ").split(".")[0];
}
