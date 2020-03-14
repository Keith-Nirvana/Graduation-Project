import React from "react";
import { Switch } from 'antd';
import styled from 'styled-components';

const SwitchWrapper = styled.div`
  padding: 5px 15px 5px 15px;
`;

class RulesSwitch extends React.Component{

  handleChange = (checked) => {
    this.props.outer(checked, this.props.ruleKey);
  };

  render() {
    return (
      <SwitchWrapper>
        <Switch defaultChecked={this.props.isChecked} onChange={this.handleChange}/>
        <span style={{ marginLeft: 50 }}>{this.props.ruleText}</span>
      </SwitchWrapper>

    );
  }


}

export default RulesSwitch;