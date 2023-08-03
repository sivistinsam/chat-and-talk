export const getSender = (loggedUser, users) => {
  if (!users || users.length < 2) {
    return "unknown User";
  }
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  if (!users || users.length < 2) {
    // Return a default value or handle the error as needed.
    return "Unknown User";
  }
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const getPicture = (loggedUser, users, prop = "name") => {
  if (!users || users.length < 2) {
    return "Unknown User";
  }
  const sender = users.find((user) => user._id !== loggedUser._id);
  if (prop === "name") {
    return sender ? sender.name : "Unknown User";
  } else if (prop === "pic") {
    return sender ? sender.pic : ""; // Assuming the "pic" property contains the profile picture URL.
  }
  return "Unknown Property";
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
