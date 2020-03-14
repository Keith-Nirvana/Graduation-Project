import React from "react";
import {Form, Input, Button} from 'antd';
import styled from 'styled-components';
import {message} from "antd/lib/index";
import axios from 'axios';

const layout = {
  labelCol: {span: 5},
  wrapperCol: {span: 16},
};
const tailLayout = {
  wrapperCol: {offset: 6, span: 16},
};

const WrapperDiv = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(53,53,53,0.32);
`;

const BodyDiv = styled.div`
    width: 550px;
    box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, .3);
    background-color: white;
`;

const HeaderDiv = styled.div`
    color: #fff;
    font-size: 24px;
    padding: 30px 20px;
    text-align: center;
    background-color: #108ee9;
`;

class RegisterPage extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();

    let _this = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of register form: ', values);

        axios.post('/user/login', {
          username: values.username,
          password: values.password
        })
            .then(function (response) {
              message.warning('注册成功，请登录');
              _this.props.history.push("/login");
            })
            .catch(function (error) {
              message.warning('用户名已存在');
            });
      }
    });
  };

  onReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
        <WrapperDiv>
          <BodyDiv>

            <HeaderDiv>
              <span>注册新用户</span>
            </HeaderDiv>


            <Form style={{marginTop: 30}}{...layout} name="basic"
                  onSubmit={this.handleSubmit}>

              <Form.Item label="用户名">
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(<Input />)}
              </Form.Item>

              <Form.Item label="密码">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your password!' }],
                })(<Input.Password />)}
              </Form.Item>


              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" style={{ marginLeft: 40}}>
                  Submit
                </Button>
                <Button htmlType="button" onClick={this.onReset}  style={{ marginLeft: 40}}>
                  Reset
                </Button>
              </Form.Item>
            </Form>

          </BodyDiv>
        </WrapperDiv>
    );
  }

}

RegisterPage = Form.create()(RegisterPage);

export default RegisterPage;