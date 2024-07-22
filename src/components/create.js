import React, { useState, useContext } from "react";
// import { TaskContext } from "../context/Taskscontext";
import { Button, Form, Input, DatePicker, Modal, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DataContext } from "../context/DataContext";

const dateFormat = "YYYY-MM-DD";
function Create() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState(null);
  const [open, setOpen] = useState(false);
  const { status, getData } = useContext(DataContext);

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  async function postJSON(data) {
    try {
      const response = await fetch("http://139.59.47.49:4004/api/task", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      getData(status);
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleSubmit() {
    const newTask = {
      task_name: taskTitle,
      date: taskDate ? taskDate.format(dateFormat) : null,
    };

    postJSON(newTask);
    console.log(newTask);
    setOpen(false);
  }

  return (
    <Flex justify="end">
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
        Create Task
      </Button>
      <Modal
        open={open}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <h1 style={{ textAlign: "center" }}> Create Task</h1>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="Title"
            rules={[
              {
                required: true,
                message: "Please input your task title!",
              },
            ]}
          >
            <Input onChange={(e) => setTaskTitle(e.target.value)} />
          </Form.Item>

          <Form.Item label="End date" name="endDate">
            <DatePicker
              format={dateFormat}
              onChange={(date) => setTaskDate(date)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Flex>
  );
}

export default Create;
