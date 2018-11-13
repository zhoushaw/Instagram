import React from 'react'
import { Form, Input, Tooltip, Icon, Select, Button, AutoComplete } from 'antd';
import Style from './index.scss'
import store from '@/src/store'
import { Row, Col } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        userInfo: {
            avatar: '',
            username: '',
        }
    };

    componentDidMount () {
        this.initData()
    }

    initData = () => {
        this.setState({
            friend_list: []
        })

        // 获取store数据，获取userInfo
        store.subscribe(() =>{
            let userInfo = store.getState().userInfo
            // 处理邮箱号
            let email = userInfo.email
            userInfo.email = email.replace(/@.*/, '')

            this.setState({
                userInfo
            })
        });
    }

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

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <section className={Style['edit-accounts']}>
                <Row className="header">
                    <Col span={8}>
                        <span className="avatar fl-right" style = {{ 'backgroundImage': `url(${this.state.userInfo.avatarUrl})`}}></span>
                    </Col>
                    <Col span={16}  className="user_abstract">
                        <div className={'username'}>{this.state.userInfo.email}</div>
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
                    <FormItem
                    {...formItemLayout}
                    label="Abstract"
                    >
                    {getFieldDecorator('abstract', {
                        rules: [{
                        type: 'abstract', message: 'The input is not valid abstract',
                        }, {
                        required: true, message: 'Please input your abstract!',
                        }],
                    })(
                        <TextArea placeholder="Please input your abstract " autosize={{ minRows: 2, maxRows: 6 }} />
                    )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="Phone Number"
                    >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="Sex"
                    >
                    {getFieldDecorator('sex', {
                        rules: [{ required: true, message: 'Please input your sex!' }],
                    })(
                        <Select>
                            <Option value="1">man</Option>
                            <Option value="2">women</Option>
                        </Select>
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
