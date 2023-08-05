import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  InputRightElement,
  VStack,
  Input,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

// Login component
const Login = () => {
  // State variables for password visibility, email, password, and loading state.
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  // Function to toggle password visibility.
  const handleClick = () => setShow(!show);

  // Accessing the toast hook from Chakra UI.
  const toast = useToast();

  // Accessing the browser's history object using useHistory.
  const history = useHistory();

  // Accessing the user state variable from the context.
  const { setUser } = ChatState();

  // Function to handle form submission.
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      // Displaying a warning toast if fields are not filled.
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      // Setting up headers for the POST request.
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Making a POST request to the login endpoint.
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      // Displaying a success toast on successful login.
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // Setting the user context state and storing user info in local storage.
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);

      // Redirecting to the chats page.
      history.push("/chats");
    } catch (error) {
      // Displaying an error toast on login failure.
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    // Reloading the window to ensure the updated user info is used throughout the app.
    window.location.reload();
  };

  // Rendering the login form.
  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholer="Enter your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholer="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="2rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Login button */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Log In
      </Button>

      {/* Guest user button */}
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
