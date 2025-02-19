// import React from 'react'
// import { Button, Menu, Typography, Avatar } from 'antd'
// import { Link } from 'react-router-dom'
// import { HomeOutlined, SlidersTwoTone , BulbTwoTone , FundTwoTone, MenuOutlined } from '@ant-design/icons'
// import icon from '../images/cryptocurrency.png' 
// import {Exchanges,Homepage,Cryptocurrencies,News,CryptoDetailes} from './index'

import React, { useState, useCallback, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
 
    HomeOutlined,
    SlidersOutlined,
    FundOutlined,
    RocketOutlined,
    BulbOutlined,
    BookOutlined,
    LineOutlined

} from '@ant-design/icons';
import {Row,Col, Image,Layout, Menu, Space, theme, Typography, Avatar} from 'antd';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import Homepage from './Homepage';
import Exchanges from './Exchanges';
import Cryptocurrencies from './Cryptocurrencies';
import CryptoDetailes from './CryptoDetailes';
import News from './News';
import icon from '../images/cryptocurrency.png';
import './nav.css';
import ToggleMode from './ToggleMode';
import Bookmarks from './Bookmarks';
import BookmarkService from '../services/bookmarkService';

const Navbar = () => {


  const { Header, Sider, Content } = Layout;

  const [collapsed, setCollapsed] = useState(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  const [selectedMenuItem, setSelectedMenuItem] = useState(['/']);
  const [coins, setCoins] = useState(BookmarkService.coinArray());

  const handleClick = e => setSelectedMenuItem(e.key);
  const reRender = (callback) => {
    setCoins(callback());
  }

  const sendCoins = () => {
    return coins;
  };

  useEffect(() => {
    if(selectedMenuItem !== window.location.pathname)
      setSelectedMenuItem(window.location.pathname)
  }, [selectedMenuItem])

  return (
    <>
    <Layout className='main_component' >
      <Sider trigger={null} collapsible collapsed={collapsed}>
       <div className="logo" > 
          <Row style={{width:"100%"}} type="flex" align="center">
            <Col> 
              <Image src={icon} preview={false} />
            </Col>
            <Col>
              <Typography.Title level={5} >
                  <Link to="/" onClick={handleClick}>Coinverse</Link>
              </Typography.Title>
            </Col>
          </Row>
        </div>
        <Menu
          theme="dark" 
          mode="inline" 
          defaultSelectedKeys={'/'}
          selectedKeys={[selectedMenuItem]}
          onClick={handleClick}
        >
          <Menu.Item key="/" icon={<HomeOutlined/>}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/Cryptocurrencies" icon={<SlidersOutlined/>}>
            <Link to="/Cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item key="/News" icon={<BulbOutlined/>}>
            <Link to="/News">News</Link>
          </Menu.Item>
          <Bookmarks sendCoins={sendCoins}/>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ paddingLeft: "1rem",fontSize:"1.8rem"}} className='nav-head'>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <ToggleMode />
        </Header>
        <Content>
          <div className="main" >
            <Layout>
              <div className='routes'>
                <Routes>
                  <Route path='/' element={<Homepage onClick={handleClick}/>}/>
                    <Route path='/Exchanges' element={<Exchanges/>}/>
                    <Route path='/Cryptocurrencies' element={<Cryptocurrencies onClick={handleClick}/>}/>
                    <Route path='/crypto/:coinId' element={<CryptoDetailes update={reRender}/>}/>
                    <Route path='/news' element={<News/>}/>
                </Routes>
              </div> 
            </Layout>
            <Layout.Footer className='footer' style={{background: '#002547', color: 'white', padding: '20px' }}>
              <Row className='row'>
                <Col className='tech' > 
                  <h3>Made with ❤️ by Community</h3>
                  <p>Using <span><a href="https://rapidapi.com/Coinranking/api/coinranking1"> Coinranking API</a>
                  , <a href="https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/bing-news-search1/">Bing News API </a> </span>
                  , React, Ant Design, Redux and React Router.</p>
                </Col> 
                <Col id='link'>
                  <h3>Links</h3>
                  <a href="/" style={{ color: 'grey' }}>Home</a>
                  &nbsp; &nbsp;
                  <a href="/Cryptocurrencies" style={{ color: 'grey' }}>Cryptocurrencies</a>
                  &nbsp; &nbsp;
                  <a href="/News" style={{ color: 'grey' }}>Crypto News</a>
                </Col>
              </Row>
            </Layout.Footer>
          </div>
        </Content> 
      </Layout>
    </Layout>
  </> 
)
}

export default Navbar