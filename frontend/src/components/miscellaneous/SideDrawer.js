import React, { useState } from "react";
import "../styles.css";
import {
  // Chakra UI components
  Box,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuDivider,
  MenuList,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import {
  AddIcon,
  BellIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { Spinner } from "@chakra-ui/spinner";
import { getSender } from "../../config/ChatLogics";
import { FormControl } from "@chakra-ui/react";

const SideDrawer = () => {
  // State for search functionality
  const [search, setSearch] = useState("");
  const [searchReasult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [visible, setVisible] = useState("notificationIcon");
  
  // Accessing context data
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  
  // Router history
  const history = useHistory();

  // Chakra UI disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Logout functionality
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const toast = useToast();

  // Handle searching for users
  const handleSearchButton = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
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

  // Handle searching users on input change
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
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  // Handle accessing a chat
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error Fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      {/* SideDrawer Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        {/* Search Button */}
        <Tooltip label="Search User to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text
              display={{ base: "none", md: "flex" }}
              px={4}
              marginRight="10px"
            >
              Conversation
              <Button height="20px" width="2px" mx={2} borderRadius="full">
                <AddIcon height="10px" width="8px" />
              </Button>
            </Text>
          </Button>
        </Tooltip>

        {/* Chat & Talk Title */}
        <Text fontSize="2xl" fontFamily="Work sans">
          Chat & Talk
        </Text>

        {/* User Avatar and Menu */}
        <div>
          <Menu>
            <MenuButton p={1}>
              {/* Notification Bell Icon */}
              <div id={notification.length > 0 ? visible : ""}></div>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>

            {/* Notification Menu */}
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                    setVisible("");
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message From ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          {/* User Profile Menu */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      {/* Drawer for searching users */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <FormControl display="flex" pb={2}>
              {/* Input for searching users */}
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Button onClick={handleSearchButton}>Go</Button>
            </FormControl>

            {/* Display search results */}
            {loading ? (
              <ChatLoading />
            ) : Array.isArray(searchReasult) ? (
              searchReasult.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            ) : (
              <p>No search results found.</p>
            )}

            {/* Display spinner while loading chat */}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
