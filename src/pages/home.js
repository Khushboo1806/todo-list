import React  from 'react';
import {Layout } from 'antd';
import Main from './Main';
import { ProfileOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;

const Home = () => {

  return (
    
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{
         fontSize: '2rem',
         fontWeight: 'bold',
      }}>
        <ProfileOutlined />
        Todo List
      </Header>
      <Content style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background:"#f0f0f0"
      }}>
        <Main />
      </Content>
    </Layout>
  );
};

export default Home;
