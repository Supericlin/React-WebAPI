import React, { JSX } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
//import { api } from '../common/http-common';
//import { Buffer } from "buffer";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const NewArticles: React.FC = (): JSX.Element => {

  const [showMessage, setshowMessage] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleFormSubmit = (values: any) => {
    const articleBody = {
      authorid: 1,
      title: values.title,
      allText: values.context,
    }

    //call API
    //const access_token = Buffer.from("${values.username}:${values.password}','utf8").toString('base64');
    //console.log(articleBody, access_token);
    axios.post('${api.uri}/articles', {articleBody},
     {
      auth: {
        username: values.username,
        password: values.password
      }
      }).then((res) => {
        console.log(res.status);
      }).catch((res) => {
        setshowMessage(true);
        setMessage(res.status);
      })
    }

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', background: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Submit Your Details</h2>
      <Form
        {...layout}
        name="new-articles"
        onFinish={(values)=>handleFormSubmit(values)}
        //onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: 'Please input the content!' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter content" />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      { showMessage && <><p> {message} </p></> }
    </div>
  );
};



export default NewArticles;