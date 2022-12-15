import React from "react";
import { Imports } from ".";

const CoinGrid = ({ coins }) => {
  const { CoinRow } = Imports;

  console.log(coins);

  return (
    <table>
      <table>
        <tr>
          <th>#</th>
          <th>Coin</th>
          <th>Price</th>
          <th>1h</th>
          <th>24h</th>
          <th>7d</th>
          <th>24h Volume</th>
        </tr>
        {coins
          ? coins.map((coin, index) => (
              <CoinRow key={coin.id} index={index + 1} {...coin} />
            ))
          : "Loading..."}
      </table>
    </table>
  );
};

export default CoinGrid;
