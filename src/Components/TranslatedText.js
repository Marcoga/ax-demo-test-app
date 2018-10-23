import React from "react";
import translations from "../data/translations.json";

export default class TranslatedText extends React.Component {
  render() {
    return translations[this.props.textKex][this.props.lang];
  }
}
