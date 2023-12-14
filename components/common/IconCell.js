import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function IconCell({ icon, text, bgColor, textColor }) {
  return (
    <Flex>
      <Flex
        cursor={"pointer"}
        gap={2}
        borderRadius={"5px"}
        p={"6px 10px"}
        align={"center"}
        bg={bgColor}
      >
        {icon}
        <Text align={"center"} color={textColor}>
          {text}
        </Text>
      </Flex>
    </Flex>
  );
}
