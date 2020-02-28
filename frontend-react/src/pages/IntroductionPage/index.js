import React from "react";
import {PageHeader, Divider, Typography, Table, BackTop} from 'antd';

import {rules} from '../../assets/RulesText';

const {Title} = Typography;
const columns = [
  {
    title: '编号',
    dataIndex: 'number',
    key: 'number',
    width: '70px'
  },
  {
    title: '法则名',
    dataIndex: 'name',
    key: 'name',
    width: '100px'
  },
  {
    title: '内容',
    dataIndex: 'detail',
    key: 'detail',
  },
];

class IntroductionPage extends React.Component {

  render() {
    return (
        <div style={{backgroundColor: 'white', width: '100%', padding: '20px 20px 20px 20px'}}>


          <Title level={1}>
            <PageHeader title="基于Lehman法则的区块链演化分析系统"
            />
          </Title>

          <div>
            <Divider orientation="left">
              <Title level={4}>系统背景介绍</Title>
            </Divider>
            <p style={{lineHeight: '35px', fontSize: '18px'}}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              Lehman对软件演化的发展规律进行了观察与总结，构成了Lehman法则。他在1978年首次发表了他的研究成果。
              在此之后，他不断基于新的研究数据对该法则进行扩充修订，包括考虑软件的不确定性和对“反馈，演化和软件技术”（FEAST）系统的研究，并在1996年对该法则进行了最终定稿。
              Lehman法则称为后来研究软件演化时主要的验证性规律，它包含以下8条内容:
            </p>

            <Table dataSource={rules} columns={columns} pagination={false}/>
          </div>

          <div style={{marginTop: 30}}>
            <Divider orientation="left">
              <Title level={4}>系统使用方法</Title>
            </Divider>

            <ul>
              <li>
                <p style={{lineHeight: '35px', fontSize: '18px'}}>
                  在项目管理中查看您所有的演化分析项目清单
                </p>
              </li>
              <li>
                <p style={{lineHeight: '35px', fontSize: '18px'}}>
                  通过点击项目管理右上方的新建按钮实现新建项目
                </p>
              </li>
              <li>
                <p style={{lineHeight: '35px', fontSize: '18px'}}>
                  通过点击项目管理右上方的设置按钮进行演化分析所需法则的配置
                </p>
              </li>
              <li>
                <p style={{lineHeight: '35px', fontSize: '18px'}}>
                  点击项目列表中的一条项目来查看它的分析结果
                </p>
              </li>
              <li>
                <p style={{lineHeight: '35px', fontSize: '18px'}}>
                  点击项目列表中的一条项目右下角的下载按钮来获取Excel数据
                </p>
              </li>
            </ul>


          </div>


        </div>
    );
  }

}

export default IntroductionPage;