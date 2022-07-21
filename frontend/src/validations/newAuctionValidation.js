import * as yup from 'yup';

export const newAuctionValidation = yup.object().shape({
  startEndTime: yup.array().required().test('validDateTime', 'Must have valid date and time', value => value.length === 2 && value[0].isBefore(value[1])),
  minBid: yup
      .number()
      .moreThan(0, 'must be higher than 0')
      .required().typeError('Must be a number'),
  minHigherBid: yup
      .number()
      .min(0)
      .required().typeError('Must be a number'),
});
