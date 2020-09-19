import React from "react";

const InputContext = React.createContext({
  type: "text",
  value: null,
  onChange: () => {},
  placeholder: null,
});

export default class Input extends React.Component {
  static contextType = InputContext;

  render() {
    return <input {...this.props} />;
  }
}
