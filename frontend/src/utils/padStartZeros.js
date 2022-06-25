const padStartZeros = (number, maxDigits) => {
  const length = String(number).length;
  if(length >= maxDigits) return number;

  return String(number).padStart(maxDigits, '0');
}

export default padStartZeros;