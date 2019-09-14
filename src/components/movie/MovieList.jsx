import React from 'react'
import ReactTypes, { func } from 'prop-types'

// 导入loadingUI组件
import { Spin, Alert } from 'antd'
import { Pagination } from 'antd'

// 导入fetch-jsonp
import fetchJSONP from 'fetch-jsonp'

// 导入子组件
import MovieItem from '@/components/movie/MovieItem'

export default class MovieList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: [], // 电影列表
            nowPage: parseInt(props.match.params.page) || 1, //当前的页码数据
            pageSize: 18, // 每页显示多少条数据
            total: 0,  //当前电影分类下总共有多少条
            isloading:true, //数据是否正在加载的标识符
            movieType:props.match.params.type  //保存要获取的电影的类型
        }
    }

    componentWillMount(){
        this.loadMovieByTypeAndPage()
    }

    componentWillReceiveProps(nextProps){
        // 在此处监听最新的props
        // 每当地址栏变化的时候，重置state中的参数项，重置完毕后，可以重新发起数据请求
        this.setState({
            isloading:true,
            nowPage:parseInt(nextProps.match.params.page) || 1,
            movieType:nextProps.match.params.type,
        },function(){
            this.loadMovieByTypeAndPage()
        })
    }

    static defaultProps = {}
    static propTypes = {}

    render() {
        return <div>
            {this.renderList()}
            
        </div>
    }


    // 自定义一个根据电影类型和页面去获取列表的函数
    loadMovieByTypeAndPage = () =>{
        // 开始获取数据的索引
        const start = this.state.pageSize * (this.state.nowPage - 1)
        const url = `https://api.douban.com/v2/movie/${this.state.movieType}?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${start}&count=${this.state.pageSize}`

        // 默认的window.fetch受到跨域限制
        // 使用fetch-jsonp第三方包来发送jsonp请求，用法和原声fetch完全一致
        fetchJSONP(url)
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            this.setState({
                isloading:false,
                movie:data.subjects,  //赋值电影列表
                total:data.total  // 保存当前总条数
            }) 
        })
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
            return <div>
                <div style={{display:'flex', flexWrap:'wrap'}}>
                {this.state.movie.map(item=>{
                    // 将整个Item直接传进去
                    return <MovieItem {...item} key={item.id} history={this.props.history}/>
                })}
                <Pagination 
                    defaultCurrent={this.state.nowPage} 
                    total={this.state.total} 
                    pageSize={this.state.pageSize}
                    onChange={this.pageChanged} />
            </div>
            </div>
        }
    }

    // 页面改变的时候加载新数据
    pageChanged = (page)=>{
        // window.location.href = '/#/movie/' + this.state.movieType + '/' + page
        this.props.history.push('/movie/' + this.state.movieType + '/' + page)
    }
}
