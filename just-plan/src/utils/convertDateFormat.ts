export function convertDateFormat(
  inputDateStr: Date | undefined,
): string | undefined {
  if (inputDateStr === undefined) {
    return undefined;
  }
  const inputDate = new Date(inputDateStr);

  const isoDateStr = inputDate.toISOString();

  return isoDateStr;
}
