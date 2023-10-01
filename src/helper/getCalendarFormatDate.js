export const getCalendarFormatDate = (date) => {
  const options = {
    weekday: "short",
    month: "short",
    year: "numeric",
    day: "numeric",
  };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  return formattedDate;
};
