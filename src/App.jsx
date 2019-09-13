// 这是项目的跟组件

import React from 'react'

// 导入路由组件
import { HashRouter, Route, Link } from 'react-router-dom'

// 导入路由相关的组件页面
import HomeContainer from '@/components/home/HomeContainer'
import MovieContainer from '@/components/movie/MovieContainer'
import AboutComtainer from '@/components/about/AboutContainer'

// 导入antd组件
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

// 导入模块化后的less样式
import styles from '@/css/app.less'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {}
    static propTypes = {}

    render() {
        return <HashRouter>
            <Layout className="layout" style={{ height: '100%' }}>
                {/* 这是h1 头部区域 */}
                <Header>
                    <div className={styles.logo} />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[window.location.hash.split('/')[1]]}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="home"><Link to="/home">首页</Link></Menu.Item>
                        <Menu.Item key="movie"><Link to="/movie/in_theaters/1">电影</Link></Menu.Item>
                        <Menu.Item key="about"><Link to="/about">关于</Link></Menu.Item>
                    </Menu>
                </Header>

                {/* 中间内容区域 */}
                <Content style={{ backgroundColor: '#fff', height:'100%' }}>
                    <Route path="/home" component={HomeContainer}></Route>
                    <Route path="/movie" component={MovieContainer}></Route>
                    <Route path="/about" component={AboutComtainer}></Route>
                </Content>

                {/* 底部区域 */}
                <Footer style={{ textAlign: 'center' }}>Misaki ©2019 Created by Ant UED</Footer>
            </Layout>
        </HashRouter>
    }
}
