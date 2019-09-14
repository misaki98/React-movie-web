import React from 'react'
import ReactTypes from 'prop-types'

import { Button, Icon } from 'antd'
import { Spin, Alert } from 'antd'

import fetchJSONP from 'fetch-jsonp'

export default class Moviedetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {}, //电影信息对象
            isloading:true
        }
    }

    static defaultProps = {}
    static propTypes = {}

    componentWillMount() {
        fetchJSONP(`https://api.douban.com/v2/movie/subject/${this.props.match.params.id}?apikey=0b2bdeda43b5688921839c8ecb20399b`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    info: data,
                    isloading:false
                })
            })
    }

    render() {
        return <div> {this.renderList()}
            
        </div>
    }

    getImages(_url){
        if( _url !== undefined ){
            let _u = _url.substring( 7 );
            return 'https://images.weserv.nl/?url=' + _u;
        }
    }

        // 自定义一个渲染电影列表的方法
        renderList = () => {
            if(this.state.isloading){
                // 正在加载中的情况
                return <Spin tip="Loading...">
                    <Alert
                        message="正在请求电影列表"
                        description="精彩内容，马上呈现……"
                        type="info"
                    />
                </Spin>
            }else{
                // 加载完成的情况,循环数组将返回的数据封装为一个组件
                return <div><Button type="primary" onClick={this.goBack}>
                <Icon type="left" />
                返回电影列表页面
            </Button>
            <h1>{this.state.info.title}</h1>
            <img src={this.getImages(this.state.info.images.large)} alt=""/>
            <p>{this.state.info.summary}</p></div>
            }
        }

    goBack = () => {
        this.props.history.go(-1)
    }
}
