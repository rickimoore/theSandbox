const isMatchingAddress = (
    address,
    matchAddress,
) => {
  return Boolean(
      address &&
      matchAddress &&
      address?.toLocaleLowerCase() === matchAddress?.toLocaleLowerCase(),
  );
};

export default isMatchingAddress;
