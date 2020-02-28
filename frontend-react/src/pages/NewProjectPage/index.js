import React from "react";
import styled from 'styled-components';
import {PageHeader, Form, InputNumber, Button, Icon, Upload, Input, Tooltip} from 'antd';

const WrapperDiv = styled.div`
  backgroundColor: white;
  width: 100%;
  height: 100%;
  padding: 20px 20px 20px 20px
`;

class NewProjectPage extends React.Component {

  state = {
    fileList: [],
    uploading: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


  handleUpload = () => {
    const {fileList} = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like

  };


  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 12},
    };

    const { uploading, fileList } = this.state;
    const uploadProps = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
        <WrapperDiv>
          <PageHeader title="创建一个新项目" style={{marginBottom: 30, marginLeft: 200}}/>

          <div >
            <Form {...formItemLayout} onSubmit={this.handleSubmit} >

              <Form.Item label="项目名称">
                {getFieldDecorator('projectName', {
                  rules: [{required: true, message: '请输入项目名称!'}],
                })(
                    <Input/>,
                )}
              </Form.Item>

              <Form.Item label="项目描述">
                {getFieldDecorator('projectDescription', {
                  rules: [{required: true, message: '请输入项目描述!'}],
                })(
                    <Input/>,
                )}
              </Form.Item>

              <Form.Item label="版本数">
                {getFieldDecorator('input-number', {
                  initialValue: 1,
                  rules: [{required: true, message: '请输入需要分析的版本总数!'}]
                })(<InputNumber min={1} max={20}/>)}
              </Form.Item>

              <Tooltip title="请上传一份压缩文件。压缩文件内包含与所输入版本数相同个数的文件夹，并从1开始递增命名，代表项目按顺序的各个文件版本" arrowPointAtCenter>
                <Form.Item label="上传文件">
                  {getFieldDecorator('dragger', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                  })(
                      <Upload.Dragger {...uploadProps} name="files" action="/upload.do">
                        <p className="ant-upload-drag-icon">
                          <Icon type="inbox"/>
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      </Upload.Dragger>,
                  )}
                </Form.Item>
              </Tooltip>

              <Form.Item wrapperCol={{span: 12, offset: 6}}>
                <Button type="primary" htmlType="submit"
                    // onClick={this.handleUpload}
                        disabled={fileList.length === 0} loading={uploading}>
                  开始演化分析
                </Button>
              </Form.Item>

            </Form>
          </div>
        </WrapperDiv>
    );
  }


}

NewProjectPage = Form.create()(NewProjectPage);

export default NewProjectPage;