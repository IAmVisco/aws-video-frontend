import { Flex } from "@chakra-ui/react";
import React from "react";
import { Header } from "./Header";

export const BaseLayout = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) => (
  <Flex direction="column" align="center" m="0 auto" {...rest}>
    <Header />
    {children}
  </Flex>
);
