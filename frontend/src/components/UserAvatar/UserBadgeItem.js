import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
// import { Badge } from '@chakra-ui/layout';
import React from "react";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      backgroundColor="purple"
      color="white"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span>(Admin)</span>}
      <CloseIcon pl={1} />
    </Box>
  );
};

export default UserBadgeItem;
