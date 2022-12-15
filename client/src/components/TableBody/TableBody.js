import React from "react";
import { Imports } from ".";

const TableBody = ({ coins }) => {
  const { CoinRow } = Imports;

  return (
    <>
      {coins
        ? coins.map((coin, index) => (
            <CoinRow key={coin.id} index={index + 1} {...coin} />
          ))
        : "Loading..."}
    </>
  );
};

export default TableBody;
