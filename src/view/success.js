import React from 'react';
import '../styles/pay.scss';
import imgMark from "../images/mark_ok.png"
import { browserHistory } from 'react-router';


export default class Error extends React.Component {

    constructor(props) {
        super(props);
    }

    goOrder() {
        browserHistory.replace({
            pathname: "/myorder"
        });
    }

    render() {
        let data = this.props.location.state;
        return (
            <div className="pay-box white-bg">
                <div className="icon onepix">
                    <img src={`${imgMark}`} />
                    <h3>恭喜您，支付成功！</h3>
                    <h5>¥{data.money}</h5>
                </div>
                <p className="txt">订单名称：{data.title}</p>
                <div className="back">
                    <a onClick={this.goOrder.bind(this)} className="btn-back">确定</a>
                    <a onClick={this.goOrder.bind(this)} className="btn-view">查看订单</a>
                </div>
            </div>
        );
    }

}