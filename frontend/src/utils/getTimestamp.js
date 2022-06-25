const getHoursMinutesInTimestamp = (date) => {
  const HOUR_IN_MS = 3600000;
  const MINUTE_IN_MS = 60000;
  const referenceDate = new Date(date);
  const hours = referenceDate.getHours();
  const minutes = referenceDate.getMinutes();

  return hours * HOUR_IN_MS + minutes * MINUTE_IN_MS;
};

export default getHoursMinutesInTimestamp;
