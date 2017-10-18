import React from 'react';
import { Carousel, Flex } from 'antd-mobile'; 


export default class DetailTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            infoHeight: this.props.height
        }
    }


    componentDidMount() {


    }


    render() {
        return (
            <Carousel style={{ height: this.state.infoHeight }} dots={false} autoplay={false} infinite={false} vertical={true} className="info">
                <div className="info-item" style={{ height: this.state.infoHeight }}>
                    <div className="top-car">
                        <div className="title-box">
                            <h1 className="title">产品名称</h1>
                            <h1 className="title">简介</h1>
                        </div>
                        <span className="text-price">
                            <i>¥</i>
                            <span className="num">99998</span>
                            <span className="u-start"> 起/人</span>
                        </span>
                    </div>
                    <div className="content-car">
             
                    </div>
                </div>
                <div className="info-item" style={{ height: this.state.infoHeight }}>
                    <text> 2 </text>
                </div>
            </Carousel>
        );
    }
} 