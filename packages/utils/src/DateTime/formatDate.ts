import { DateTime } from 'luxon';

export const formatDate = (dt: Date) => {
  const date = DateTime.fromJSDate(dt);
  const format = 'LLL dd yyyy; HH:mm a';
  return date.toFormat(format);
};
