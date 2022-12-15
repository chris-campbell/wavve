import { useEffect, useState } from "react";
import { Imports } from ".";

const Dashboard = () => {
  const { apiClient, CoinGrid } = Imports;

  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      const { data } = await apiClient.get("/fetchCoins", {
        withCredentials: true,
      });

      setCoins(data.data);
    };

    fetchCoins();
  }, []);

  return <CoinGrid coins={coins} />;
};

export default Dashboard;
