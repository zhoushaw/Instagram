import React from 'react'
import ReactDOM from "react-dom";
import { Form, Icon, Input, Button, Checkbox,message } from "antd";

// const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <section className="login">
                登陆
            </section>
        )
    }
}

ReactDOM.render(
  <Login />, 
  document.getElementById("app")
);