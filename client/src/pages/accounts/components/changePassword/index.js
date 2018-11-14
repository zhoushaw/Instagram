import React from 'react'
import { Form, Input, Button , notification} from 'antd';
import Style from './index.scss'
import API from '@common/api.js'
import { Row, Col } from 'antd';
import { connect } from "react-redux";

const FormItem = Form.Item;

@connect(
    store => {
        return {
            userInfo: store.userInfo
        }
    }
)
class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                let {newPassword, confirmPassword, password} = values
                if (newPassword !== confirmPassword ) {
                    notification['error']({
                        message: '新密码与确认密码不一致'
                    })
                    return
                }

                let params = {
                    password,
                    newPassword
                }
                let response = await API.updatePersonalInfo(params);
                notification['success']({
                    message: response.message
                })
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                span: 24,
                offset: 0,
                },
                sm: {
                span: 16,
                offset: 8,
                },
            },
        };
        let {userInfo} = this.props        
        return (
            <section className={Style['edit-accounts']}>
                <Row className="header">
                    <Col span={8}>
                        <span className="avatar fl-right" style = {{ 'backgroundImage': `url(${userInfo.avatarUrl})`}}></span>
                    </Col>
                    <Col span={16}  className="user_abstract">
                        <div className={'username'}>{userInfo.account}</div>
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span className="form-item-label">旧密码</span>
                        )}
                        >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your old password!', whitespace: true }],
                        })(
                        <Input />
                        )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                        label={(
                            <span className="form-item-label">新密码</span>
                        )}
                    >
                    {getFieldDecorator('newPassword', {
                        rules: [{
                            required: true, message: 'Please input your new password!',
                        }],
                    })(
                        <Input />
                    )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}    
                        label={(
                            <span className="form-item-label">确定新密码</span>
                        )}
                    >
                    {getFieldDecorator('confirmPassword', {
                        rules: [{ required: true, message: 'Please confirm you new password!' }],
                    })(
                        <Input />
                    )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">确定</Button>
                    </FormItem>
                </Form>
            </section>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm
