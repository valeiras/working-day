"use client";

import React, { useEffect, useState } from "react";
import { callMockServer } from "../../actions";

const MswWithServerAction: React.FC = () => {
  const [data, setData] = useState({ msg: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await callMockServer();
      setData(fetchedData);
      setIsLoading(false);
    };
    fetchData();
  });

  return (
    <div>
      <p>{isLoading ? "Loading..." : data?.msg}</p>
    </div>
  );
};

export default MswWithServerAction;
