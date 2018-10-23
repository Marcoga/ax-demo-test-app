import React from "react";
import Watchlist from "../../Components/Watchlist";
import watchlistData from "../../data/watchlist.json";

export default class WatchlistContainer extends React.Component {
  state = {
    watchlistData,
    removedItems: []
  };

  render() {
    return (
      <Watchlist
        onRemoveTicker={ticker => {
          this.setState({
            removedItems: [...this.state.removedItems, ticker]
          });
        }}
        onAddTicker={addedTicker => {
          this.setState({
            removedItems: this.state.removedItems.filter(
              ri => ri !== addedTicker
            )
          });
        }}
        data={watchlistData.filter(
          wi => !this.state.removedItems.some(ri => ri === wi.ticker)
        )}
        removedItems={this.state.removedItems}
      />
    );
  }
}
