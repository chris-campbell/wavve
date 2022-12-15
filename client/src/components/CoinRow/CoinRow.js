import { Imports } from ".";

const CoinRow = ({ id, name, market_data, image, index }) => {
  const {
    current_price,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h,
    price_change_percentage_7d,
    total_volume,
    market_cap,
  } = market_data;

  const { Link } = Imports;

  return (
    <tr>
      <td>{index}</td>
      <td>
        <Link to={`/coins/${id}`}>
          <span>
            <img src={image.thumb} />
            {name}
          </span>
        </Link>
      </td>
      <td>{currency(current_price.usd, "USD")}</td>
      <td>{price_change_percentage_1h_in_currency.usd}</td>
      <td>{price_change_percentage_24h}</td>
      <td>{price_change_percentage_7d}</td>
      <td>{currency(total_volume.usd, "USD")}</td>
      <td>{currency(market_cap.usd, "USD")}</td>
    </tr>
  );
};

const currency = (int, currency) => {
  return int.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
  });
};

export default CoinRow;
