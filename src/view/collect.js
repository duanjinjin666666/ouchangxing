import React from 'react';
import { Flex } from 'antd-mobile';
import '../styles/myorder.scss';
import imgDemo from "../images/demo_1.jpg"


export default class Line extends React.Component {

    render() {
        return (
            <div className="myorder white-bg">
                <Flex className="item onepix">
                    <img src={`${imgDemo}`} className="pic" />
                    <div className="detail" direction="column">
                        <h3 className="title">北欧极光之旅  </h3>
                        <div className="info">
                            <div className="rmb"><span>¥</span> 19999</div>
                            <i className="collect"></i>
                        </div>
                    </div>
                </Flex>
            </div>
        )
    }
} 