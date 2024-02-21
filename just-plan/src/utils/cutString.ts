export const cutStirng = (address: string, end: number) => {
  // 몇글자 초과하면 ... 보여주기
  if (address.length > end) {
    const cutAddress = address.slice(0, end) + "...";
    return cutAddress;
  }
  return address;
};
