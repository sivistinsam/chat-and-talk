import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom";

// Homepage component
const Homepage = () => {
  // Accessing the browser's history object using useHistory.
  const history = useHistory();

  // Using useEffect to check if the user is already logged in and redirecting if true.
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  // Rendering the homepage content.
  return (
    <Container maxW="xl" centerContent>
      {/* Header section */}
      <Box
        display="flex"
        justifyContent="center"
        textAlign={"center"}
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">
          Chat & Talk
        </Text>
      </Box>

      {/* Tabs for Login and Sign Up */}
      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        color="black"
      >
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* Rendering the Login component */}
              <Login />
            </TabPanel>
            <TabPanel>
              {/* Rendering the Signup component */}
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
