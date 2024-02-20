export const cutStirng = (address: string) => {
  // 몇글자 초과하면 ... 보여주기
  if (address.length > 12) {
    const cutAddress = address.slice(0, 12) + "...";
    return cutAddress;
  }
  return address;
};
