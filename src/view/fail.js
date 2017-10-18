import React from 'react';
import '../styles/pay.scss';
import imgMark from "../images/mark_fail.png"

export default class Error extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pay-box white-bg">
                <div className="icon onepix">
                    <img src={`${imgMark}`} />
                    <h3>抱歉，支付失败！</h3>
                </div>
                <p className="txt">错误原因：XXXXXXXXXXXXXXXXX</p>
                <div className="back">
                    <a href="/" className="btn-back">返回</a>
                </div>
            </div>
        );
    }

}