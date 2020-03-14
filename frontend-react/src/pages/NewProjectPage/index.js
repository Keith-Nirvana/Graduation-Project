import React from "react";
import styled from 'styled-components';
import {PageHeader, Form, InputNumber, Button, Icon, Upload, Input, Tooltip} from 'antd';
import axios from 'axios';
import userInfo from "../../stores/global";
import {message} from "antd/lib/index";

const WrapperDiv = styled.div`
  backgroundColor: white;
  width: 100%;
  height: 100%;
  padding: 20px 20px 20px 20px
`;

class NewProjectPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();

    let _this = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        axios.post('/project/new', {
          username: userInfo.username,
          project:{
            projectName: values.projectName,
            projectDescription: values.projectDescription,
            versionCount: values.inputNumber
          }
        })
            .then(function (response) {
              let data = response.data;
              console.log(data);

              // 如果出错了
              if(data.result === "failed") {
                message.warning('存在同名项目');
              }

              else {
                _this.handleUpload(data.projectId)
              }

            })
            .catch(function (error) {
              message.warning('网络错误，创建项目失败');
            });
      }
    });

    // this.props.history.push("/main/success");

  };

  normFile = e => {
    console.log('normFile event:', e);
    if (Array.isArray(e)) {
      console.log("Enter here");
      return e;
    }

    return e && e.fileList;
  };


  handleUpload (projectId) {
    console.log('enter upload:');
    const {fileList} = this.state;

    // console.log(typeof fileList);
    // console.log(fileList);
    // console.log((typeof values.dragger[0]));
    // console.log(values.dragger[0]);
    // formData.append("file", fileList['0']);

    let _this = this;
    let formData = new FormData();

    fileList.forEach(file => {
      formData.append('files[]', file);
    });
    formData.append("projectId", projectId);
    formData.append("username", userInfo.username);

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    // console.log(fileList);
    axios.request({
      method: 'post',
      data: formData,
      url: '/project/upload',
      headers: {'content-type': 'multipart/form-data'}
    })
        .then(function (response) {
          let data = response.data;

          if(data.result === "failure"){
            message.warning('上传文件失败，项目新建失败');
          }

          else{
            setTimeout(function () {
              message.success('成功提交项目，请等待后台分析完成');
              _this.setState({
                uploading: false,
              });
              _this.props.history.push("/main/success");
            }, 1000)
          }
        })
        .catch(function (error) {
          message.warning('网络错误，上传文件失败');
        });

  };


  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 3},
      wrapperCol: {span: 9},
    };

    const { uploading, fileList } = this.state;
    const uploadProps = {
      onRemove: file => {
        console.log('onRemove event:');
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },

      // onChange: info => {
      //   let fileList = [...info.fileList];
      //
      //   // 1. Limit the number of uploaded files
      //   // Only to show two recent uploaded files, and old ones will be replaced by the new
      //   fileList = fileList.slice(-1);
      //
      //   this.setState({ fileList });
      // },

      beforeUpload: file => {
        console.log('beforeUpload event:');
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },

      fileList,
    };

    return (
        <WrapperDiv>
          <PageHeader title="创建一个新项目" style={{marginBottom: 30}}/>

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
                {getFieldDecorator('inputNumber', {
                  initialValue: 1,
                  rules: [{required: true, message: '请输入需要分析的版本总数!'}]
                })(<InputNumber min={1} max={20}/>)}
              </Form.Item>

              <Tooltip title="请上传一份压缩文件。压缩文件内包含与所输入版本数相同个数的文件夹，并从1开始递增命名" arrowPointAtCenter>
                <Form.Item label="上传文件">
                  {getFieldDecorator('dragger', {
                    valuePropName: 'propsFileList',
                    getValueFromEvent: this.normFile,
                  })(
                      <Upload.Dragger {...uploadProps} name="files" action="/upload.do"
                                      accept="application/zip,application/x-zip,application/x-zip-compressed">
                        <p className="ant-upload-drag-icon">
                          <Icon type="inbox"/>
                        </p>
                        <p className="ant-upload-text">Click or drag a zip file to this area to upload</p>
                      </Upload.Dragger>,
                  )}
                </Form.Item>
              </Tooltip>

              <Form.Item wrapperCol={{span: 12, offset: 6}}>
                <Button type="primary" htmlType="submit"
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