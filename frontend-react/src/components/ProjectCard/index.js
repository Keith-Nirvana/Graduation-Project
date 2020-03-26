import React from "react";
import { Card, Button, message } from 'antd';
import qs from 'query-string';
import axios from 'axios';
import userInfo from "../../stores/global";

const { Meta } = Card;

class ProjectCard extends React.Component{

  jumpToCharts(e){

    this.props.history.push({
      pathname: "/main/charts",
      search: qs.stringify({
        projectName: this.props.projectName,
        projectId: this.props.projectId
      })
    });
  }

  downloadFile() {
    axios.request({
      method: 'get',
      params: {
        username: userInfo.username,
        projectId: this.props.projectId,
      },
      url: '/project/download',
      responseType: 'arraybuffer'
    })
        .then(function (response) {
          const blob = new Blob([response.data], { type: 'application/vnd.ms-excel;' });
          const a = document.createElement('a');
          // 生成文件路径
          let href = window.URL.createObjectURL(blob);
          a.href = href;
          a.download = "analysis.csv";

          // 利用a标签做下载
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(href);
        })
        .catch(function (error) {
          message.warning('网络链接出错');
        });

  }

  render() {
    return(
      <div>
        <Card
            actions={[
              <Button icon="area-chart" disabled={!this.props.isFinished} onClick={this.jumpToCharts.bind(this)}>查看</Button>,
              <Button icon="download" disabled={!this.props.isFinished} onClick={this.downloadFile.bind(this)}>下载</Button>,
              <Button icon="delete">删除</Button>,
            ]}
        >
          <Meta
              title={this.props.projectName}
              description={this.props.projectDescription}
          />
        </Card>
      </div>

    );
  }

}

export default ProjectCard;