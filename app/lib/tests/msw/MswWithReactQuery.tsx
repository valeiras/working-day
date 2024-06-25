"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { mockUrl } from "../mocks/mockData";

const getTestData = async (): Promise<{ msg: string }> => {
  return fetch(mockUrl).then((res) => res.json());
};

const MswWithReactQuery: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getTestData,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <p>{isLoading ? "Loading..." : data?.msg}</p>
    </div>
  );
};

export default MswWithReactQuery;
