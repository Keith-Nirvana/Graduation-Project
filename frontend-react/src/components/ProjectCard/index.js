import React from "react";
import { Card, Button } from 'antd';
import qs from 'query-string';

const { Meta } = Card;

class ProjectCard extends React.Component{

  jumpToCharts(e){
    console.log(e);
    this.props.history.push({
      pathname: "/main/charts",
      search: qs.stringify({
        project: this.props.projectName
      })
    });
  }

  render() {
    return(
      <div>
        <Card
            actions={[
              <Button icon="area-chart" disabled={!this.props.isFinished} onClick={this.jumpToCharts.bind(this)}>查看</Button>,
              <Button icon="download">下载</Button>,
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