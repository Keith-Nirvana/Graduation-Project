import React from "react";
import styled from 'styled-components';
import {Button, Collapse, PageHeader } from 'antd';

import RulesSwitch from '../../components/RulesSwitch';

const {Panel} = Collapse;
const WrapperDiv = styled.div`
  backgroundColor: white;
  width: 100%;
  height: 100%;
  padding: 20px 20px 20px 20px
`;


class RulesSettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Metric1: false,
      Metric2: false,
      Metric3: false,
      Metric4: false,
      Metric5: false,
      Metric6: false,
      Metric7: false,
      Metric8: false,
      Metric9: false,
      Metric10: false,
    };

    this.outerOnChange = this.outerOnChange.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  saveSettings() {
    console.log(this.state);
  }

  outerOnChange(checked, name) {
    this.setState({
      [name]: checked
    });

  }


  render() {
    return (
        <WrapperDiv>
          <div>
            <PageHeader
                title="指标配置"
                subTitle="为每条法则选择您所需要使用的分析指标。"
            />
          </div>

          <div>
            <Collapse defaultActiveKey={['1']}>
              <Panel header="法则一：持续变化" key="1">
                <RulesSwitch ruleText="Metric1" outer={this.outerOnChange} isChecked={this.state.Metric1}/>
              </Panel>
              <Panel header="法则二：复杂度增加" key="2">
                <RulesSwitch ruleText="Metric2" outer={this.outerOnChange} isChecked={this.state.Metric2}/>
              </Panel>
              <Panel header="法则三：自我规范" key="3">
                <RulesSwitch ruleText="Metric3" outer={this.outerOnChange} isChecked={this.state.Metric3}/>
              </Panel>
              <Panel header="法则四：组织稳定性的保持" key="4">
                <RulesSwitch ruleText={"Metric"+"4"} outer={this.outerOnChange} isChecked={this.state["Metric"+"4"]}/>
                <RulesSwitch ruleText="Metric5" outer={this.outerOnChange} isChecked={this.state.Metric5}/>
              </Panel>
              <Panel header="法则五：熟悉度的保持" key="5">
                <RulesSwitch ruleText="Metric6" outer={this.outerOnChange} isChecked={this.state.Metric6}/>
              </Panel>
              <Panel header="法则六：持续增长" key="6">
                <RulesSwitch ruleText="Metric7" outer={this.outerOnChange} isChecked={this.state.Metric7}/>
              </Panel>
              <Panel header="法则七：质量下降" key="7">
                <RulesSwitch ruleText="Metric8" outer={this.outerOnChange} isChecked={this.state.Metric8}/>
              </Panel>
              <Panel header="法则八：反馈制度" key="8">
                <RulesSwitch ruleText="Metric9" outer={this.outerOnChange} isChecked={this.state.Metric9}/>
                <RulesSwitch ruleText="Metric10" outer={this.outerOnChange} isChecked={this.state.Metric10}/>
              </Panel>
            </Collapse>
          </div>

          <div>
            <Button type="primary" onClick={this.saveSettings}
                    style={{margin: '20px 0 20px 20px'}}>
              保存
            </Button>
          </div>

        </WrapperDiv>
    );
  }

}

export default RulesSettingsPage;