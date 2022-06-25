import {AUCTION_PERIOD} from '../../constants';
import moment from 'moment';
import {getNumberOfDaysBeforeToday} from './getNumberDaysBefore';

export const getPeriodTime = (
    startDate,
    endDate,
) => {
  const start = new Date(parseInt(startDate) * 1000);
  const end = new Date(parseInt(endDate) * 1000);

  const daysBefore = getNumberOfDaysBeforeToday(start);
  const now = moment(new Date());

  if (daysBefore <= 0) {
    if (moment(end).isBefore(now)) return AUCTION_PERIOD.OVER;

    if (moment(start).isBefore(now)) return AUCTION_PERIOD.LIVE;
  }

  return AUCTION_PERIOD.COMING;
};
