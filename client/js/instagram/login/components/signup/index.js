import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Style from './index.scss'

const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {}
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  onChangeHandler (type, event) {
    // 设置是否已输入状态,字体进行缩放
    this.setState({
      [type+'Empty']: event.target.value!== ''
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <section className={Style.signup}>
        <h1 className="header">
          <span className="instagram"></span>
        </h1>
        <h2 className="slogan">注册instagram分享精彩视界</h2>
        <Button type="primary" htmlType="submit" className="facebook-login">
          使用Facebook登陆
        </Button>
        <div className="or-line">
          <span className="line"></span>
          <span className="name">或</span>
          <span className="line"></span>
        </div>
        <Form className="register-form" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone or email!' }],
            })(
              <div className={`form-input ${this.state.phoneEmpty && 'active'}`}  onChange={this.onChangeHandler.bind(this, 'phone')}>
                <label htmlFor="label-phone">手机号或邮箱</label>
                <Input id="label-phone" prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} />
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your userName!' }],
            })(
              <div className={`form-input ${this.state.usernameEmpty && 'active'}`}  onChange={this.onChangeHandler.bind(this, 'username')}>
                <label htmlFor="label-username">全名</label>
                <Input id="label-username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: 'Please input your account!' }],
            })(
              <div className={`form-input ${this.state.accountEmpty && 'active'}`}  onChange={this.onChangeHandler.bind(this, 'account')}>
                <label htmlFor="label-account">账户</label>              
                <Input id="label-account" prefix={<Icon type="user-add" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <div className={`form-input ${this.state.lockEmpty && 'active'}`}  onChange={this.onChangeHandler.bind(this, 'lock')}>
                <label htmlFor="label-lock">密码</label>              
                <Input id="label-lock" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"/>
              </div>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="register-form-button">
              注册
            </Button>
          </FormItem>
        </Form>
      </section>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm