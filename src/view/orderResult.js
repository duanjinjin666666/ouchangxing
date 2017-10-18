import React from 'react';
import { Flex, Button, Result } from 'antd-mobile';
const WIDTH = screen.width;
const HEIGHT = screen.height;
import { browserHistory } from 'react-router';

export default class OrderResultView extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.location.state;
    }


    renderView() {
        switch (this.state.type) {
            case "success":
                return <Result
                    imgUrl="https://zos.alipayobjects.com/rmsportal/yRUDxcBPvzZTDHK.png"
                    title="订单提交成功"
                    message={<div><div style={{ fontSize: '0.72rem', color: '#000', lineHeight: 1 }}>金额{this.state.money}</div></div>}
                    buttonText="确定"
                    buttonType="primary"
                    buttonClick={() => {
                        browserHistory.replace({ pathname: "ucenter" });
                    }}
                >
                </Result>
            case "fail":
                return <Result
                    imgUrl="https://zos.alipayobjects.com/rmsportal/LUIUWjyMDWctQTf.png"
                    title="订单失败"
                    message={<div><div style={{ fontSize: '0.72rem', color: '#000', lineHeight: 1 }}>{this.state.message}</div></div>}
                    buttonText="返回"
                    buttonType="primary"
                    buttonClick={() => {
                        browserHistory.goBack();
                    }}
                >
                </Result>
        }
    }

    render() {
        return (
            <div style={{ width: WIDTH, height: HEIGHT, background: "#fff", paddingTop: 100 }}>
                {this.renderView()}
            </div>
        );
    }
}