import React from "react";
import translations from "../data/translations.json";

export default class TranslatedText extends React.Component {
  render() {
    const textObj = translations[this.props.textKey];
    if (!textObj || !textObj[this.props.lang]) {
      return this.props.textkey;
    }
    return textObj[this.props.lang];
  }
}
