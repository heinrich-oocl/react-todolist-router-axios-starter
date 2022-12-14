import { useDispatch } from "react-redux";
import { deleteTodo, updateTodos } from "./todoSlice";
import "./TodoItem.css";
import { updateTodoAPI, deleteTodoAPI } from "../../api/todo";
import { Button, Modal, Form, Input, Space } from "antd";
import {EditOutlined} from "@ant-design/icons";
import { useState } from "react";

const TodoItem = (props) => {
  const { todo } = props;
  const dispatch = useDispatch();

  const [showEdit, setShowEdit] = useState(false);

  const onToggle = (event) => {
    event.stopPropagation();
    const todoObj = { ...todo, done: !todo.done };
    updateTodoAPI(todo.id, todoObj).then((response) => {
      dispatch(updateTodos(response.data));
    });
  };

  const onDelete = (event) => {
    event.stopPropagation();
    deleteTodoAPI(todo.id).then((response) => {
      dispatch(deleteTodo(response.data.id));
    });
  };


  const [form] = Form.useForm();

  return (
    <div className="box" onClick={onToggle}>
      <span className={todo.done ? "done" : ""}>{todo.text}</span>
      <Button type="primary" danger onClick={onDelete}>
        x
      </Button>
      <Space onClick={(event)=>{
        event.stopPropagation();
        setShowEdit(!showEdit)}}>
        <EditOutlined />
      </Space>
      <Modal
        title="Modal Title"
        open={showEdit}
        onOk={(event) => {
          event.stopPropagation();
          form.validateFields().then((val) => {
            const todoObj = { ...todo, text: val.description };
            updateTodoAPI(todo.id, todoObj).then((response) => {
              dispatch(updateTodos(response.data));
            });
          });
          setShowEdit(!showEdit)
        }}
        onCancel={(event)=>{
          event.stopPropagation();
          setShowEdit(!showEdit)}}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item name="description">
            <Input type="textarea" defaultValue={todo.text}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TodoItem;
