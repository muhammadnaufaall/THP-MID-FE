import { useToast } from "@chakra-ui/react";
import { useQuery } from "react-query";

const fetchData = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
};

const useFetch = (queryKey: string | [string, {}], url: string) => {
  const toast = useToast();

  const { data, error, refetch, isLoading } = useQuery(queryKey, () =>
    fetchData(url)
  );

  if (error) {
    toast({
      title: "Fetch Failed",
      description: "Request quota reached.",
      status: "error",
      duration: 3000,
      isClosable: false,
    });
  }

  return { data, error, refetch, isLoading };
};

export default useFetch;
