import React, { useEffect } from "react";

import { useRouter } from "next/router";

const Error = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return <div></div>;
};

export default Error;
