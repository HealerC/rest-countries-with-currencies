import { useState, useEffect } from "react";
import CurrencyTextField from "./CurrencyTextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2" component="p">
        <b>
          {name} ({code})
        </b>
      </Typography>
      {rate && (
        <Box
          sx={{
            display: "flex",
            ["@media (max-width: 600px)"]: { flexDirection: "column" },
          }}
        >
          <CurrencyTextField
            name="dollarValue"
            value={state.dollarValue}
            handleChange={handleChange}
            symbol={DOLLAR_SYMBOL}
          ></CurrencyTextField>

          <CurrencyTextField
            name="currencyValue"
            value={state.currencyValue}
            handleChange={handleChange}
            symbol={symbol}
          ></CurrencyTextField>
        </Box>
      )}
    </Box>
  );
};

export default Conversion;
