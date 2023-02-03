import React from "react";
import { Form, Input, DatePicker } from "antd";
import moment from "moment";

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

const FormValidation = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const validateBirthdate = (rule, value) => {
    if (value.isAfter(moment())) {
      return Promise.reject("Birthdate must not be in the future!");
    } else if (value.isSame(moment(), "day")) {
      return Promise.reject("Birthdate must not be today!");
    } else if (value.isAfter(moment().subtract(10, "years"))) {
      return Promise.reject("Birthdate must be at least 10 years old");
    } else if (value.isBefore(moment().subtract(100, "years"))) {
      return Promise.reject(
        "Birthdate must be a valid date and younger than 100 years"
      );
    }
    return Promise.resolve();
  };

  const validateWhitespace = (rule, value) => {
    if (value && value.trim().length === 0) {
      return Promise.reject("Do not input only spaces");
    }
    return Promise.resolve();
  };

  return (
    <Form
      form={form}
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        birthdate: moment(),
      }}
    >
      <Form.Item
        label="Birthdate"
        name="birthdate"
        rules={[
          { required: true, message: "Please input your birthdate!" },
          { validator: validateBirthdate },
        ]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: "Please input your username!" },
          { validator: validateWhitespace },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            pattern: /^\d{10}$/,
            message: "Please enter a valid phone number!",
          },
          { validator: validateWhitespace },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <button type="submit">Submit</button>
      </Form.Item>
    </Form>
  );
};

export default FormValidation;
