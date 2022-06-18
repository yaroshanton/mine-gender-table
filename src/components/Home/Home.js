import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import './Home.scss';

const Home = props => {
  return (
    <div className="wrapperHome">
      <NavLink to="/users">
        <Button className="homeButton" type="primary">
          Users
        </Button>
      </NavLink>
    </div>
  );
};

export default Home;
