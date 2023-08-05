import {
  // ... Chakra UI and other imports ...

  // ... Other imports ...
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
  // Toggle modal state using useDisclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State for chat creation
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  // Access user data and chats from context
  const { user, chats, setChats } = ChatState();

  // Function to add a user to the group chat
  const handleGroup = (userToAdd) => {
    // Check if user is already selected
    if (selectedUsers.includes(userToAdd)) {
      // Display a warning toast
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    // Add the user to the selectedUsers array
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  // Function to search for users
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      // Fetch user search results using Axios
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      // Display an error toast if search fails
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  // Function to remove a user from selectedUsers
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  // Function to submit the group chat creation
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      // Display a warning toast if fields are incomplete
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      // Send a POST request to create the group chat
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      // Update chats in the context state
      setChats([data, ...chats]);
      onClose();
      // Display a success toast
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      // Display an error toast if chat creation fails
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // ... Modal structure and rendering ...

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        {/* ... Modal content ... */}
      </Modal>
    </>
  );
};

export default GroupChatModal;
