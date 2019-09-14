import React from 'react'
import ReactTypes from 'prop-types'

// 导入布局相关的组件
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// 导入路由相关的组件
import {Link, Route, Switch} from 'react-router-dom'

import MovieList from '@/components/movie/MovieList'
import Moviedetail from '@/components/movie/Moviedetail'

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
                    defaultSelectedKeys={[window.location.hash.split('/')[2]]}
                    style={{ height: '100%', borderRight: 0 }}
                >
                        <Menu.Item key="in_theaters"><Link to="/movie/in_theaters/1">正在热映</Link></Menu.Item>
                        <Menu.Item key="coming_soon"><Link to="/movie/coming_soon/1">即将上映</Link></Menu.Item>
                        <Menu.Item key="top250"><Link to="/movie/top250/1">Top250</Link></Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ paddingLeft: '1px' }}>
                <Content 
                    style={{
                        background: '#fff',
                        padding: 10,
                        margin: 0,
                        minHeight: 280,
                        overflow:'auto'
                    }}
                >
                    {/* 匹配的路由规则，类型和页码 */}
                    {/* 如果想从路由规则中提取参数，需要使用this.props.match.params获取 */}
                    <Switch>
                        <Route exact path="/movie/detail/:id" component={Moviedetail} />
                        <Route exact path="/movie/:type/:page" component={MovieList} />
                    </Switch>
                   

          </Content>
            </Layout>
        </Layout>
    }
}
