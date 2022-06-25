const timestampToIso = (secondsTimestamp) => {
  return new Date(parseInt(secondsTimestamp) * 1000).toISOString();
};

export default timestampToIso;
