import React from 'react'
import ReactTypes from 'prop-types'
import { hashHistory } from 'react-router'

// 导入样式表
import styles from '@/css/MovieItem.less'

import { Rate } from 'antd'

export default class MovieItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {}
    static propTypes = {}

    render() {
        return <div className={styles.box} onClick={this.goDetail}>
            <img src={this.getImages(this.props.images.small)} alt="" className={styles.img}/>
            <h4 className={styles.title}>电影名称：{this.props.title}</h4>
            <h4 className={styles.title}>上映年份：{this.props.year}</h4>
            <h4 className={styles.title}>电影类型：{this.props.genres.join(',')}</h4>
            <Rate disabled defaultValue={this.props.rating.average/2} />
        </div>
    }
    getImages(_url){
        if( _url !== undefined ){
            let _u = _url.substring( 7 );
            return 'https://images.weserv.nl/?url=' + _u;
        }
    }
    // 自定义一个跳转函数
    goDetail = () => {
        this.props.history.push('/movie/detail/' + this.props.id)
    }
}
