import moment, { duration } from "moment";

export const formatDate = (date: number) => {
  const timeInMilliseconds = moment().valueOf();
  const diff = moment.duration(timeInMilliseconds - date, "milliseconds");
  if (diff.asMinutes() < 10) {
    return "A few moments ago";
  } else if (diff.asHours() === 0) {
    return diff.asMinutes + "minutes ago";
  } else if (diff.asDays() === 0) {
    return diff.asHours + "hours ago";
  } else {
    return moment(new Date(date)).format("MMMM d, YYYY");
  }
};
