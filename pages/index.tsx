import MultiStepForm from "@/components/forms/MultiStepForm";
import { Box } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  return (
    <>
      <Box maxW="container.sm" mx="auto" mt={8}>
        <MultiStepForm />
      </Box>
    </>
  );
};

export default Home;
