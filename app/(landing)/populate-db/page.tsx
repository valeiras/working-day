"use client";

import { populateDB } from "@/app/lib/actions";
import React from "react";

const PopulateDB: React.FC = () => {
  const [isPopulating, setIsPopulating] = React.useState(false);
  const [hasBeenPopulated, setHasBeenPopulated] = React.useState(false);

  const handleClick = async () => {
    setIsPopulating(true);
    await populateDB();
    setIsPopulating(false);
    setHasBeenPopulated(true);
  };

  return (
    <div>
      {hasBeenPopulated ? (
        <p>DB has been populated!</p>
      ) : isPopulating ? (
        <p>Populating DB...</p>
      ) : (
        <button className="btn btn-primary" onClick={handleClick}>
          Populate DB
        </button>
      )}
    </div>
  );
};

export default PopulateDB;
