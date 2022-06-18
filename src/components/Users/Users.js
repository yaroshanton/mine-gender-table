import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Select, Form } from 'antd';
import { getUsers } from '../../services/usersApi';
import { Table } from 'antd';
import './Users.scss';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [gender, setGender] = useState('');

  useEffect(() => {
    getUsers().then(res => setUsers(res.data.data));
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, obj) => <Link to={`edit/${obj.id}`}>{text}</Link>,
    },
  ];

  const filteredUsers = users.filter(user => user.gender === gender);

  const handleFilter = event => {
    setGender(event);
  };

  return (
    <div className="wrapperUsers">
      <Form.Item label="Filter by Gender">
        <Select
          name="gender"
          onChange={handleFilter}
          style={{
            width: 120,
          }}
        >
          <Select.Option value="female">female</Select.Option>
          <Select.Option value="male">male</Select.Option>
        </Select>
      </Form.Item>
      {users && (
        <Table
          columns={columns}
          dataSource={gender.length === 0 ? users : filteredUsers}
          bordered
        />
      )}
    </div>
  );
};

export default Users;
