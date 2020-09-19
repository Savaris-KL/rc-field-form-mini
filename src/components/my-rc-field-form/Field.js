import React, { Component } from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {
  static contextType = FieldContext; // 15.5开始废弃React.PropTypes
  // static propTypes = {
  //   props: PropTypes.number
  // }

  componentDidMount() {
    // 注册组件实例
    this.cancelRegister = this.context.registerField(this);
  }

  componentWillUnmount() {
    // 卸载组件实例
    if (this.cancelRegister) {
      this.cancelRegister();
    }
  }

  getControled = () => {
    const { getFieldValue, setFieldsValue } = this.context;
    const { name } = this.props;
    return {
      value: getFieldValue(name) || "", //从store中取值
      onChange: (e) => {
        // 把新的参数值存到store中
        const newValue = e.target.value;
        setFieldsValue({ [name]: newValue });
        console.log("newValue", newValue); //sy-log
      },
    };
  };

  onStoreChange = () => {
    this.forceUpdate();
  };

  render() {
    const { children } = this.props;
    const returnChildNode = React.cloneElement(children, this.getControled());
    return returnChildNode;
  }
}
