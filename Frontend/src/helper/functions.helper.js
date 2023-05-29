export const readableDate = (date) => {
  const currentDate = new Date();
  const dateToCompare = new Date(date);
  const difference = currentDate.getTime() - dateToCompare.getTime();

  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  const minutesDifference = Math.floor(difference / 1000 / 60);
  const secondsDifference = Math.floor(difference / 1000);

  if (secondsDifference === 0) return "Just now";

  if (daysDifference > 0) {
    if (daysDifference === 1) return `${daysDifference} day ago`;
    return `${daysDifference} days ago`;
  }

  if (hoursDifference > 0) {
    if (hoursDifference === 1) return `${hoursDifference} hour ago`;
    return `${hoursDifference} hours ago`;
  }

  if (minutesDifference > 0) {
    if (minutesDifference === 1) return `${minutesDifference} minute ago`;
    return `${minutesDifference} minutes ago`;
  }

  if (secondsDifference > 0) {
    if (secondsDifference === 1) return `${secondsDifference} second ago`;
    return `${secondsDifference} seconds ago`;
  }
};
