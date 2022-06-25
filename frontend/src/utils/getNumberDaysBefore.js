import moment from 'moment';

export const getNumberOfDaysBeforeToday = (date) =>
    moment(new Date(date)).diff(new Date(), 'days');