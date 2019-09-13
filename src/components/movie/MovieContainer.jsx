import React from 'react'
import ReactTypes from 'prop-types'

// 导入布局相关的组件
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// 导入路由相关的组件
import {Link, Route} from 'react-router-dom'

import MovieList from '@/component/movie/MovieList'

export default class HomeContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {}
    static propTypes = {}

    render() {
        return <Layout style={{height:'100%'}}>
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                        <Menu.Item key="1"><Link to="/movie/in_theaters/1">正在热映</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/movie/coming_soon/1">即将上映</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/movie/top250/1">Top250</Link></Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ paddingLeft: '1px' }}>
                <Content 
                    style={{
                        background: '#fff',
                        padding: 10,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    {/* 匹配的路由规则，类型和页码 */}
                    <Route path="/movie/:type/:page" component={MovieList}></Route>
          </Content>
            </Layout>
        </Layout>
    }
}
