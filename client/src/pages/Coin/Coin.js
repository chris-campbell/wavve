import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../lib/apiClient";

const Coin = () => {
  const [coin, setCoin] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axiosClient.post(
        "/fetchCoin",
        { id },
        {
          withCredentials: true,
        }
      );
      setCoin(data.data);
    };

    fetchCoin();
  }, []);

  return (
    <div>
      <h1>{coin.name}</h1>
    </div>
  );
};

export default Coin;
