import React from 'react'
import { Form, Input, Tooltip, Icon, Select, Button, AutoComplete } from 'antd';
import Style from './index.scss'
import { Row, Col } from 'antd';
import { connect } from "react-redux";

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

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
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
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
        const { autoCompleteResult } = this.state;

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

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        let {userInfo} = this.props        
        return (
            <section className={Style['edit-accounts']}>
                <Row className="header">
                    <Col span={8}>
                        <span className="avatar fl-right" style = {{ 'backgroundImage': `url(${userInfo.avatarUrl})`}}></span>
                    </Col>
                    <Col span={16}  className="user_abstract">
                        <div className={'username'}>{userInfo.account}</div>
                        <div className={'notice'}>更换手机号</div>
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label={(
                        <span>
                            Nickname&nbsp;
                            <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                        )}
                        >
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                        })(
                        <Input />
                        )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="E-mail"
                    >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="Website"
                    >
                    {getFieldDecorator('website', {
                        rules: [{ required: true, message: 'Please input website!' }],
                    })(
                        <AutoComplete
                        dataSource={websiteOptions}
                        onChange={this.handleWebsiteChange}
                        >
                        <Input />
                        </AutoComplete>
                    )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Update</Button>
                    </FormItem>
                </Form>
            </section>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm
