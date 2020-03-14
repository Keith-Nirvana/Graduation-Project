import React from "react";
import { Button, Layout, Menu, Icon } from 'antd';
import { Route, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ProjectListPage from "../../pages/ProjectListPage";
import IntroductionPage from "../../pages/IntroductionPage";
import NewProjectPage from "../../pages/NewProjectPage";
import RulesSettingsPage from '../../pages/RulesSettingsPage';
import CreationSuccessPage from '../../pages/CreationSuccessPage';
import ViewChartsPage from '../../pages/ViewChartsPage';
import userInfo from "../../stores/global";

const Logo = styled.div`
  width: 220px;
  height: 31px;
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 16px 28px 16px 0;
  float: left;
`;

const BigLayout = styled.div`
  height: 100vh;
  display: flex;
`;

const LogoSpan = styled.span`
  color: white;
  fontFamily: SimSun;
  fontSize: 18;
  position: relative;
  top: -50%;
`;

const InfoSpan = styled.span`
  color: white;
  margin-right: 20px
`;


const {Header, Content, Sider} = Layout;

class MainLayout extends React.Component {

  render() {
    return (
        <BigLayout>

          <Layout>
            <Header className="header">
              <Logo className="logo">
                <LogoSpan> &nbsp; 欢 迎 来 到 本 系 统 ！</LogoSpan>
              </Logo>

              <div style={{float: 'right'}}>
                <InfoSpan style={{color: 'white'}}>{userInfo.username}</InfoSpan>
                <Link to="/login"><Button type="primary">登出</Button></Link>
              </div>
            </Header>

            <Layout>
              <Sider width={200} style={{background: '#fff'}}>
                <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}
                      style={{height: '100%', borderRight: 0}}>
                  <Menu.Item key="1">
                    <Icon type="info" />
                    <span>系统介绍</span>
                    <Link to="/main/introduction"> <Icon type="info" /></Link>
                  </Menu.Item>

                  <Menu.Item key="2">
                    <Icon type="unordered-list"/>
                    <span>项目管理</span>
                    <Link to="/main/projects"><Icon type="unordered-list"/></Link>
                  </Menu.Item>

                </Menu>
              </Sider>

              <Layout style={{padding: '0 24px 24px 24px'}}>

                <Content style={{background: '#fff', margin: 0, overflow:'auto'}}>
                  <Route path="/main/introduction" component={IntroductionPage}/>
                  <Redirect from="/main" to="/main/introduction"/>

                  <Route path="/main/projects" component={ProjectListPage}/>
                  <Route path="/main/rules" component={RulesSettingsPage}/>
                  <Route path="/main/charts" component={ViewChartsPage}/>

                  <Route path="/main/new" component={NewProjectPage}/>
                  <Route path="/main/success" component={CreationSuccessPage}/>
                </Content>
              </Layout>

            </Layout>
          </Layout>
        </BigLayout>
    );
  }

}

export default MainLayout;