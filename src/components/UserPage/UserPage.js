import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Select, Form, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { getUser, updateUser } from '../../services/usersApi';
import 'react-toastify/dist/ReactToastify.css';
import './UserPage.scss';

const UserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState('');

  const notify = success =>
    success
      ? toast.success('🔥 Wow, we updated the user!', {
          position: 'top-center',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      : toast.error('🙈 Alas, it did not work, try again ', {
          position: 'top-center',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

  useEffect(() => {
    getUser(id).then(res => {
      setUser(res.data.data);
    });
  }, [id]);

  const handleChangeStatus = event => {
    setUser(prevState => {
      return {
        ...prevState,
        status: event,
      };
    });
  };

  const handleChangeGender = event => {
    setUser(prevState => {
      return {
        ...prevState,
        gender: event,
      };
    });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUser(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    updateUser(id, user).then(res => {
      if (res && res.status === 200) {
        notify(true);
        setTimeout(() => {
          navigate('/users');
        }, 3000);
      } else {
        notify(false);
      }
    });
  };

  return (
    <div className="wrapperUserPage">
      <ToastContainer />
      {user && (
        <Form
          labelWrap={true}
          name="basic"
          onFinish={handleSubmit}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item label="id" name="id">
            <Input defaultValue={user.id} disabled />
          </Form.Item>
          <Form.Item
            label="User Name"
            onChange={e => handleChange(e)}
            rules={[
              {
                required: true,
                message: 'Please input your User Name!',
              },
            ]}
          >
            <Input defaultValue={user.name} name="name" />
          </Form.Item>
          <Form.Item
            label="Email"
            onChange={e => handleChange(e)}
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input defaultValue={user.email} name="email" />
          </Form.Item>
          <Form.Item label="Status">
            <Select
              onChange={handleChangeStatus}
              defaultValue={user.status}
              name="status"
              style={{
                width: 120,
              }}
            >
              <Select.Option value="inactive">inactive</Select.Option>
              <Select.Option value="active">active</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Gender">
            <Select
              defaultValue={user.gender}
              name="gender"
              onChange={handleChangeGender}
              style={{
                width: 120,
              }}
            >
              <Select.Option value="female">female</Select.Option>
              <Select.Option value="male">male</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default UserPage;
