import React from "react";
import FxRates from "../../Components/FxRates";
import getExchangeRate from "../../utils/getExchangeRate";

const CURRENCIES = ["EUR", "JPY"];

export default class FxRatesContainer extends React.Component {
  state = {
    loading: true
  };

  async componentDidMount() {
    const rates = await getExchangeRate();

    this.setState({ rates, loading: false });
  }

  render() {
    return <FxRates {...this.state} />;
  }
}
