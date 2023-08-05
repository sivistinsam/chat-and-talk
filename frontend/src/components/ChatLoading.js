import { Skeleton } from "@chakra-ui/skeleton";
import { Stack } from "@chakra-ui/layout";
import React from "react";

//created this schatLoading function and defined some skeleton so that while searching a loading UI should come
const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
    </Stack>
  );
};

export default ChatLoading;
