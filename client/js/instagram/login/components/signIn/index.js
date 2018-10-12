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
        <Form className="sigin-form" onSubmit={this.handleSubmit}>
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
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="register-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="register-form-button">
              登陆
            </Button>
          </FormItem>
        </Form>
      </section>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm