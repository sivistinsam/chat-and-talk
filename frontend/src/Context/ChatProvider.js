import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Creating a context to hold chat-related state.
const ChatContext = createContext();

// Creating a ChatProvider component to provide the chat-related state to its children.
const ChatProvider = ({ children }) => {
  // State variables for user, selected chat, chats, and notifications.
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  // Accessing the browser's history object using useHistory.
  const history = useHistory();

  // Using useEffect to set the "user" state variable and navigate if user is not logged in.
  useEffect(() => {
    // Getting user info from local storage.
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // Setting the "user" state with retrieved user info.
    setUser(userInfo);

    // Redirecting to the login page if user info is missing.
    if (!userInfo) history.push("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  // Providing the chat-related state values to the context provider.
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Creating a ChatState custom hook to access the context values.
export const ChatState = () => {
  return useContext(ChatContext);
};

// Exporting the ChatProvider component as the default export.
export default ChatProvider;
