export function getType(value: unknown) {
  const type = Object.prototype.toString.call(value);
  return type.charAt(8).toLowerCase() + type.slice(9, -1);
}
