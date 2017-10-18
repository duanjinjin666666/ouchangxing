import React from 'react';
import { Tabs, Flex } from 'antd-mobile';
import '../styles/myorder.scss';
import imgDemo from "../images/demo_1.jpg"

import { browserHistory } from 'react-router';
import net from "../components/net";

const TabPane = Tabs.TabPane;

export default class Line extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderStatus: this.props.params.type,
            data: [],
            title: "加载中...",
            price: "加载中...",
            datetime: "加载中..."
        }
    }
    componentDidMount() {
        this.geiInfo();
    }

    onChange(key) {
        this.setState({
            orderStatus: key
        }, () => {
            browserHistory.replace("/myorder/" + key);
        });
    }
    goInfo(id) {
        browserHistory.push({ pathname: "/detail/" + id, state: { id: id } });
    }
    geiInfo() {
        let self = this;
        net.post("/api/order_list", { orderStatus: self.state.orderStatus }).then(data => {
            let item = data.orderList;
            if (data.status_code == 10000) {
                self.setState({
                    data: item
                });
            }
        });
    }
    renderType(type){
        var ui = '';
        if(type===1){
            ui = <div className="time">{data.datetime}</div>
        }else{
            ui = <a className="btn-pay">马上付款</a>
        }
        return ui;
    }

    renderTag(data, index, type) {
        return (
            <Flex className="item onepix">
                <img src={`${imgDemo}`} className="pic" />
                <div className="detail" direction="column">
                    <h3 className="title">{data.title}</h3>
                    <div className="info">
                        <div className="rmb"><span>¥</span> {data.price}</div>
                        {this.renderType(type)}
                    </div>
                </div>
            </Flex>
        );
    }

    render() {
        let obj = this.state.data;
        return (
            <div className="myorder">
                <Tabs activeKey={this.state.orderStatus} animated={false} onChange={this.onChange.bind(this)}>
                    <TabPane tab="已付款订单" key="1">
                        {
                            obj.map((item, index) => this.renderTag(item, index, 1))
                        }
                    </TabPane>
                    <TabPane tab="未付款订单" key="5">
                        {
                            obj.map((item, index) => this.renderTag(item, index, 2))
                        }
                    </TabPane>
                </Tabs>
            </div>
        )
    }
} 