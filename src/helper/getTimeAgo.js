export const getTimeAgo = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);

  const timeDifference = now - date;
  const minutes = Math.floor(timeDifference / 60000);
  const hours = Math.floor(timeDifference / 3600000);
  const days = Math.floor(timeDifference / 86400000);
  const weeks = Math.floor(timeDifference / 604800000);

  if (minutes < 1) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else if (days < 7) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  } else {
    return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  }
};

// // Example usage:
// const timestamp = Date.parse(); // Replace with your timestamp
// const timeAgo = getTimeAgo(timestamp);
// console.log(timeAgo); // Output: "1 week ago" (assuming the current date is 2023-09-17)
