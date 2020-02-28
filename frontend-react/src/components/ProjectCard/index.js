import React from "react";
import { Card, Button } from 'antd';

const { Meta } = Card;

class ProjectCard extends React.Component{

  render() {
    return(
      <div>
        <Card
            actions={[
              <Button icon="area-chart">查看</Button>,
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