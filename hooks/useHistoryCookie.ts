import React, { useEffect } from "react";

import { useFormContext } from "react-hook-form";
import cookie from "js-cookie";

import { FormInputData } from "@/types/FormInputDataType";

const useHistoryCookie = () => {
  const { watch } = useFormContext<FormInputData>();

  useEffect(() => {
    const historyCookie = cookie.get("history");
    const history = historyCookie ? JSON.parse(historyCookie) : [];

    const current = watch();

    const newHistory = [...history, current];

    cookie.set("history", JSON.stringify(newHistory));
  }, [watch()]);
};

export default useHistoryCookie;
