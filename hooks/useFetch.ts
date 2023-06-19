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

export const useFetch = (queryKey: string | [string, {}], url: string) => {
  const { data, error, refetch, isLoading } = useQuery(queryKey, () =>
    fetchData(url)
  );

  return { data, error, refetch, isLoading };
};
