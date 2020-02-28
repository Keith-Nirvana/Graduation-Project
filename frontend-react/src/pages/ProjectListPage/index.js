import React from "react";
import styled from 'styled-components';
import {PageHeader, Button, Icon, List, Empty} from 'antd';

import ProjectCard from '../../components/ProjectCard';

const WrapperDiv = styled.div`
  backgroundColor: white;
  width: 100%;
  height: 100%;
  padding: 20px 20px 20px 20px
`;

const ListWrapper = styled.div`
  
`;


const mockInfo = [
  {
    projectName: "比特币1",
    projectDescription: "asdfbaskdjnfoiphnodsanfa",
  },
  {
    projectName: "比特币2",
    projectDescription: "asdfbaskdjnfoiphnodsanfa",
  },
  {
    projectName: "比特币3",
    projectDescription: "asdfbaskdjnfoiphnodsanfa",
  },
  {
    projectName: "比特币4",
    projectDescription: "asdfbaskdjnfoiphnodsanfa",
  },
  {
    projectName: "比特币5",
    projectDescription: "asdfbaskdjnfoiphnodsanfa",
  },
  {
    projectName: "比特币1",
    projectDescription: "asdfbaskdjnfoiphnodsanfa",
  },
  {
    projectName: "比特币2",
    projectDescription: "asdfbaskdjnfoiphnodsanfa",
  },
  {
    projectName: "比特币3",
    projectDescription: "asdfbaskdjnfoiphnodsanfa",
  },
  {
    projectName: "比特币4",
    projectDescription: "asdfbaskdjnfoiphnodsanfa",
  },

];

class ProjectListPage extends React.Component {

  render() {
    let content = <Empty style={{marginTop: 100}}
                         description={
                           <span>
                              暂无项目
                           </span>
                         }/>;

    if (mockInfo.length !== 0)
      content = <List grid={{gutter: 16, column: 4}}
                      dataSource={mockInfo}
                      renderItem={item => (
                          <List.Item>
                            <ProjectCard projectName={item.projectName} projectDescription={item.projectDescription}/>
                          </List.Item>
                      )}/>;

    return (
        <WrapperDiv>
          <div>
            <PageHeader ghost={false}
                        title="项目列表"
                        subTitle="管理您的项目"
                        extra={[
                          <Button key="2" >
                            <div>
                              <Icon type="setting"/>
                              <span style={{marginLeft: 10}}>法则配置</span>
                            </div>
                          </Button>,

                          <Button key="1" type="primary" style={{marginLeft: 20}} onClick={() => this.props.history.push("/main/new")}>
                            <div>
                              <Icon type="folder-add"/>
                              <span style={{marginLeft: 10}}>新建项目</span>
                            </div>
                          </Button>,
                        ]}
            />
          </div>


          <ListWrapper>
            {content}
          </ListWrapper>


        </WrapperDiv>
    );
  }

}

export default ProjectListPage;