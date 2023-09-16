export const getTotalTimeToComplete = (assignedAt, completedAt) => {
  if (!assignedAt || !completedAt) {
    return "Time not available";
  }

  const assignedTime = new Date(assignedAt).getTime();
  const completedTime = new Date(completedAt).getTime();
  const timeDiff = completedTime - assignedTime;

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days === 1 ? "" : "s"} `;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? "" : "s"} `;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} `;
  } else {
    return `${seconds} second${seconds === 1 ? "" : "s"} `;
  }
};
