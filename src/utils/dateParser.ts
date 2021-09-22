export const timeOfCommentChecker = (date: string) => {
  const parsedDate = Date.parse(date);
  const now = Date.now();
  const d = now - parsedDate;
  const minutes = 1000 * 60;
  const hours = minutes * 60;
  const days = hours * 24;
  const y = {
    metric: "minute",
    number: Math.round(d / minutes),
  };
  if (d / hours >= 1) {
    y.metric = "hour";
    y.number = Math.round(d / hours);
  }
  if (d / days >= 1) {
    y.metric = "day";
    y.number = Math.round(d / days);
  }
  if (y.number > 1) y.metric += "s";
  return y;
};
