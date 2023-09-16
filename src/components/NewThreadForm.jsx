import { useContext } from "react";
import "./NewThreadForm.css";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { AuthContext } from "../context/auth-context";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 6,
    },
  },
};
const NewThreadForm = ({ onGetEnteredValues }) => {
  const { firstName, lastName } = useContext(AuthContext);
  const onFinish = (values) => {
    const { questions } = values;
    const transformedQuestion = questions.map((question) => {
      return {
        id: Math.random().toString(),
        title: question,
        askedby: `${firstName} ${lastName}`,
        askedat: new Date(),
        answeredBy: null,
        assigned: {},
        discussion: [],
      };
    });

    onGetEnteredValues(transformedQuestion);
  };
  return (
    <Form
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      className="new-question"
    >
      <Form.List name="questions">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? "Questions" : ""}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please add your qeustion or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="Your Question"
                    style={{
                      width: "100%",
                      padding: "5px",
                    }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{
                  width: "70%",
                }}
                icon={<PlusOutlined />}
              >
                Add your Question
              </Button>

              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="add-action">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};
export default NewThreadForm;
