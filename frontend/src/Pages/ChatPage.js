import { ChatState } from "../Context/ChatProvider";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

// ChatPage component
const ChatPage = () => {
  // Using the ChatState hook to access chat-related state from the context.
  const { user } = ChatState();

  // State variable to trigger a data fetch.
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {/* Displaying the SideDrawer component if user is logged in. */}
      {user && <SideDrawer />}

      {/* Main content area */}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {/* Displaying the MyChats component if user is logged in. */}
        {user && <MyChats fetchAgain={fetchAgain} />}

        {/* Displaying the ChatBox component if user is logged in. */}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
