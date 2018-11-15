import React from 'react'
import Style from './index.scss'
import { Icon } from 'antd';

function SlickDot () {
    return (
        this.props.imageList.length > 1?
        (   
            <ul className="slick-dot">
                {
                    this.props.imageList.map((item,index) => {
                        return (
                            <li 
                                className={this.state.isActived === index ? 'acitve' : ''} key={index}
                                // onClick={this.changeSlick.bind(this, index)} 
                            ></li>
                        )
                    })
                }
            </ul>
        )
        : 
        ''
    )
}

class Carousel extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isActived: 0
        }
        // 更改作用域
        SlickDot = SlickDot.bind(this)
    }

    slickNext () {
        let target = this.state.isActived + 1 >= this.props.imageList.length ? 0 : this.state.isActived + 1
        this.setState({
            isActived: target
        })
    }

    slickPre () {
        let target = this.state.isActived -1 < 0 ? this.props.imageList.length - 1 : this.state.isActived - 1
        this.setState({
            isActived: target
        })
    }

    changeSlick (number) {
        this.setState({
            isActived: number
        })
    }

    render () {
        return (
            <div className={Style['carousel']}>
                <ul className="carousel-list">
                    {/* 轮播图列表 */}
                    {
                        this.props.imageList.map((item,index) => {
                            return (
                                <li 
                                    className={['carousel-item', this.state.isActived === index ? 'actived': ''].join(' ')} 
                                    key={index}
                                >
                                    <img src={item} height="100%" width="100%"/>
                                </li>
                            )
                        })
                    }
                    {/* 左右切换icon */}
                    {
                        this.props.imageList.length > 1 ?
                        <div>
                            <Icon className="pre-btn" type="left-circle" theme="outlined" onClick={this.slickPre.bind(this)}/>
                            <Icon className="next-btn" type="right-circle" theme="outlined" onClick={this.slickNext.bind(this)}/>
                        </div>
                        :
                        ''
                    }
                    {/* 原点 */}
                    <SlickDot />
                </ul>
            </div>
        )
    }
}
export default Carousel
