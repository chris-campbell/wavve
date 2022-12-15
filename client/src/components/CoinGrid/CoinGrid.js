import { Imports } from ".";

const CoinGrid = ({ coins }) => {
  const { CoinTableHeader, TableBody } = Imports;

  return (
    <table>
      <table>
        <CoinTableHeader />
        <TableBody coins={coins} />
      </table>
    </table>
  );
};

export default CoinGrid;
