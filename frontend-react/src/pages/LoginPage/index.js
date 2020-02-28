import React from "react";
import {Row, Col, Form, Icon, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom';
import style from './style.module.css';

class LoginPage extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.history.push("/main");
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
        <div className={style.wrapper}>
          <div className={style.body}>

            <header className={style.header}>
              <span>基于Lehman法则的区块链软件演化分析系统</span>
            </header>


            <section className={style.form}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                  {getFieldDecorator('用户名', {
                    rules: [{required: true, message: 'Please input your username!'}],
                  })(
                      <Input
                          prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                          placeholder="Username"
                      />,
                  )}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{required: true, message: 'Please input your Password!'}],
                  })(
                      <Input
                          prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                          type="password"
                          placeholder="Password"
                      />,
                  )}
                </Form.Item>


                <Form.Item>
                  <Row justify="center" type="flex">
                    <Col span={8}>
                      {/*<Link to="/main">*/}
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: 90}}>
                          Log in
                        </Button>
                      {/*</Link>*/}
                    </Col>

                    <Col span={2}> Or </Col>

                    <Col span={8}>
                      <Link to="/register">register now!</Link>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </section>

          </div>
        </div>
    );

  }
}

LoginPage = Form.create()(LoginPage);

export default LoginPage;