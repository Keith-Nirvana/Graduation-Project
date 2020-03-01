import React from "react";
import { Result, Button } from 'antd';

class CreationSuccessPage extends React.Component {

  render() {
    return (
      <div style={{marginTop: 100}}>
        <Result
            status="success"
            title="您已成功提交您的任务!"
            subTitle="请返回主菜单稍作等待。系统分析完成后即可在项目列表中选择查看分析结果"
            extra={[
              <Button type="primary" key="console"
                      onClick={() => this.props.history.push("/main/projects")}>
                返回主菜单
              </Button>,
            ]}
        />
      </div>
    );
  }

}

export default CreationSuccessPage;