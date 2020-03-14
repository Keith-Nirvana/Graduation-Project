import React from "react";
import styled from 'styled-components';
import {Button, Collapse, PageHeader } from 'antd';

import RulesSwitch from '../../components/RulesSwitch';
import axios from "axios/index";
import {message} from "antd/lib/index";
import userInfo from "../../stores/global";

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
      id: 0,
      Metric1: false,
      Metric2: false,
      Metric3: false,
      Metric4: false,
      Metric5: false,
      Metric6: false,
      Metric7: false,
      Metric8: false,
      Metric9: false,
    };

    this.outerOnChange = this.outerOnChange.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }


  componentDidMount(){
    let _this = this;
    axios.get('/settings/rules', {
      params: {
        username: userInfo.username
      }
    })
        .then(function (response) {
          let data = response.data.rules;
          _this.setState({
            id: data.id,
            Metric1: data.fileChanges,
            Metric2: data.mcc,
            Metric3: data.fileNumber,
            Metric4: data.functionNumber,
            Metric5: data.fileChangeRate,
            Metric6: data.functionChangeRate,
            Metric7: data.loc,
            Metric8: data.commentRate,
            Metric9: data.tarskiModel,
          })
          // console.log(response.data)
        })
        .catch(function (error) {
          message.warning('网络链接出错');
        });
  }

  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
    };
  };

  saveSettings() {
    let _this = this;

    axios.post('/settings/rules', {
      username: userInfo.username,
      settings: {
        fileChanges: _this.state.Metric1,
        mcc: _this.state.Metric2,
        fileNumber: _this.state.Metric3,
        functionNumber: _this.state.Metric4,
        fileChangeRate: _this.state.Metric5,
        functionChangeRate: _this.state.Metric6,
        loc: _this.state.Metric7,
        commentRate: _this.state.Metric8,
        tarskiModel: _this.state.Metric9,
      }
    })
        .then(function (response) {
          message.warning('修改配置成功');
          _this.props.history.push("/main/projects");
        })
        .catch(function (error) {
          message.warning('网络异常，法则配置修改失败');
        });
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
            <Collapse>
              <Panel header="法则一：持续变化" key="1">
                <RulesSwitch ruleText="文件变化数目(增加、删除与修改) File Changes(file added, deleted, modified)" ruleKey="Metric1"
                             outer={this.outerOnChange} isChecked={this.state.Metric1}/>
              </Panel>
              <Panel header="法则二：复杂度增加" key="2">
                <RulesSwitch ruleText="圈复杂度 MyCabe Cyclomatic Complexity(MCC)" ruleKey="Metric2"
                             outer={this.outerOnChange} isChecked={this.state.Metric2}/>
              </Panel>
              <Panel header="法则三：自我规范" key="3">
                <RulesSwitch ruleText="文件数量 File Number" ruleKey="Metric3" outer={this.outerOnChange} isChecked={this.state.Metric3}/>
                <RulesSwitch ruleText="函数数量 Function Number" ruleKey="Metric4" outer={this.outerOnChange} isChecked={this.state["Metric"+"4"]}/>
              </Panel>
              <Panel header="法则四：组织稳定性的保持" key="4">
                <RulesSwitch ruleText="文件数量变化率 File Change Rate" ruleKey="Metric5" outer={this.outerOnChange} isChecked={this.state.Metric5}/>
              </Panel>
              <Panel header="法则五：熟悉度的保持" key="5">
                <RulesSwitch ruleText="函数数量变化率 Function Change Rate" ruleKey="Metric6" outer={this.outerOnChange} isChecked={this.state.Metric6}/>
              </Panel>
              <Panel header="法则六：持续增长" key="6">
                <RulesSwitch ruleText="代码行数 Lines of Code" ruleKey="Metric7" outer={this.outerOnChange} isChecked={this.state.Metric7}/>
              </Panel>
              <Panel header="法则七：质量下降" key="7">
                <RulesSwitch ruleText="注释比例 Comment Rate" ruleKey="Metric8" outer={this.outerOnChange} isChecked={this.state.Metric8}/>
              </Panel>
              <Panel header="法则八：反馈制度" key="8">
                <RulesSwitch ruleText="Turski反馈参考模型 Turski Reference Model" ruleKey="Metric9" outer={this.outerOnChange} isChecked={this.state.Metric9}/>
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