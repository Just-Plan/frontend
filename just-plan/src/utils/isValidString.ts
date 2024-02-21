export function isValidString(str: string) {
  const regex = /^[0-9가-힣a-zA-Z\s]+$/;

  return regex.test(str);
}
