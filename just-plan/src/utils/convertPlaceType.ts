export const convertPlaceType = (type: string) => {
  if (type === "알 수 없는 타입") return "장소";
  return type;
};
