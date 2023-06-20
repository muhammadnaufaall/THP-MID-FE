import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

type FormSkeletonProps = {
  quantity: number;
};

const FormSkeleton: React.FC<FormSkeletonProps> = ({ quantity }) => {
  return (
    <Stack>
      {Array(quantity)
        .fill(1)
        .map((_, index) => (
          <Skeleton mt={4} key={index} height="30px" />
        ))}
    </Stack>
  );
};

export default FormSkeleton;
