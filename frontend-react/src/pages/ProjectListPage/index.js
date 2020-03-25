import React from "react";
import styled from 'styled-components';
import {PageHeader, Button, Icon, List, Empty} from 'antd';
import axios from 'axios';

import {message} from "antd/lib/index";

import ProjectCard from '../../components/ProjectCard';
import userInfo from "../../stores/global";

const WrapperDiv = styled.div`
  backgroundColor: white;
  width: 100%;
  height: 100%;
  padding: 20px 20px 20px 20px
`;

const ListWrapper = styled.div`
  
`;


// const mockInfo = [
//   {
//     projectName: "比特币1",
//     projectDescription: "asdfbaskdjnfoiphnodsanfa",
//     projectID: "2333",
//     isFinished: true
//   },
//   {
//     projectName: "比特币2",
//     projectDescription: "asdfbaskdjnfoiphnodsanfa",
//     isFinished: true
//   },
//   {
//     projectName: "比特币3",
//     projectDescription: "asdfbaskdjnfoiphnodsanfa",
//     isFinished: true
//   },
//   {
//     projectName: "比特币4",
//     projectDescription: "asdfbaskdjnfoiphnodsanfa",
//     isFinished: false
//   },
//   {
//     projectName: "比特币5",
//     projectDescription: "asdfbaskdjnfoiphnodsanfa",
//     isFinished: true
//   },
//   {
//     projectName: "比特币1",
//     projectDescription: "asdfbaskdjnfoiphnodsanfa",
//     isFinished: true
//   },
//   {
//     projectName: "比特币2",
//     projectDescription: "asdfbaskdjnfoiphnodsanfa",
//     isFinished: false
//   },
//   {
//     projectName: "比特币3",
//     projectDescription: "asdfbaskdjnfoiphnodsanfa",
//     isFinished: false
//   },
//   {
//     projectName: "比特币4",
//     projectDescription: "asdfbaskdjnfoiphnodsanfa",
//     isFinished: true
//   },
//
// ];

class ProjectListPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      projectList: []
    }

  }


  componentDidMount(){
    let _this = this;
    axios.get('/project/list', {
      params: {
        username: userInfo.username
      }
    })
        .then(function (response) {
          let data = response.data;
          console.log(data);
          _this.setState({
            projectList: data.projects
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


  render() {
    let content = <Empty style={{marginTop: 100}}
                         description={
                           <span>
                              暂无项目
                           </span>
                         }/>;

    if (this.state.projectList.length !== 0)
      content = <List grid={{gutter: 16, column: 4}}
                      dataSource={this.state.projectList}
                      renderItem={item => (
                          <List.Item>
                            <ProjectCard projectName={item.projectName} projectDescription={item.projectDescription} projectId={item.id}
                                         history={this.props.history} isFinished={item.status}/>
                          </List.Item>
                      )}/>;

    return (
        <WrapperDiv>
          <div>
            <PageHeader ghost={false}
                        title="项目列表"
                        subTitle="管理您的项目"
                        extra={[
                          <Button key="2"
                                  onClick={() => this.props.history.push("/main/rules")}>
                            <div>
                              <Icon type="setting"/>
                              <span style={{marginLeft: 10}}>指标配置</span>
                            </div>
                          </Button>,

                          <Button key="1" type="primary" style={{marginLeft: 20}}
                                  onClick={() => this.props.history.push("/main/new")}>
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