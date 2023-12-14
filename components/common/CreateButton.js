import { Box, Flex, Button } from "@chakra-ui/react";
import { AddIcon } from "../icons";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CreateButton({ linkHref, text }) {
  const router = useRouter();

  function handleRedirect() {
    router.push(linkHref);
    console.log("que onda");
  }

  return (
    <Link href={linkHref}>
      <Flex>
        <Flex
          gap={2}
          align={"center"}
          bg={"main.200"}
          border={"1px solid"}
          borderColor={"gray.200"}
          borderRadius={10}
          p={".5rem 1.2rem .5rem 1rem"}
          stroke="#000"
          fontWeight={600}
          _hover={{ bg: "#000", color: "#fff", stroke: "#fff" }}
          transition={"all 0.3s"}
        >
          <AddIcon />
          {text}
        </Flex>
      </Flex>
    </Link>
  );
}
