import { useState, useEffect } from "react";

type ConversionProps = {
  code: string;
  name: string;
  symbol: string;
  rate: number | null;
};
type ConversionState = {
  dollarValue: number;
  currencyValue: number;
};
const DOLLAR_SYMBOL = "$";

const Conversion = ({ name, code, symbol, rate }: ConversionProps) => {
  const [state, setState] = useState<ConversionState>({
    dollarValue: 1,
    currencyValue: rate ? 1 * rate : -1,
  });

  useEffect(() => {
    if (rate) {
      setState({ ...state, currencyValue: state.dollarValue * rate });
    }
  }, [state.dollarValue]);

  useEffect(() => {
    if (rate) {
      setState({ ...state, dollarValue: state.currencyValue / rate });
    }
  }, [state.currencyValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name;
    const value = event.target.value;

    setState({ ...state, [name]: value });
  };

  return (
    <div>
      {name} ({code})
      {rate && (
        <div>
          {DOLLAR_SYMBOL}
          <input
            type="number"
            name="dollarValue"
            value={state.dollarValue}
            onChange={handleChange}
          />{" "}
          equals
          {symbol}
          <input
            type="number"
            name="currencyValue"
            value={state.currencyValue}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default Conversion;
