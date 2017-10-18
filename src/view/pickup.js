import React from "react";
import { browserHistory } from 'react-router';
import { NavBar, Icon, Tabs, Flex, InputItem, List } from 'antd-mobile';
import '../styles/pickup.scss';

import img_topic_pickup from "../images/img_topic_pickup.jpg";

const TabPane = Tabs.TabPane;
const Item = List.Item;

export default class PickUp extends React.Component {

    render() {
        return (
            <div className="pickup">
                <Flex className="topbar">
                    <Flex.Item><i className="ico-search"></i></Flex.Item>
                    <Flex.Item align="right">
                        <i className="ico-hotline"></i>
                        <i className="ico-user" onClick={() => {
                            browserHistory.push({ pathname: "/ucenter" });
                        }}></i>
                    </Flex.Item>
                </Flex>
                <div className="topic"><img src={`${img_topic_pickup}`} /></div>
                <Tabs>
                    <TabPane tab="接机" key="1">
                        <List>
                            <InputItem labelNumber={5} placeholder="请填写">航班信息：</InputItem>
                            <Item arrow="horizontal" onClick={() => { }}>用车时间：</Item>
                            <InputItem labelNumber={5} placeholder="请用英文填写">用车时间：</InputItem>
                        </List>
                        <span className="booking" onClick={() => {
                            browserHistory.push({ pathname: "/orderAirport/", state: { type: "airport" } });
                        }}>预定</span>
                    </TabPane>
                    <TabPane tab="送机" key="2">
                        <List>
                            <InputItem labelNumber={5} placeholder="请填写">航班信息：</InputItem>
                            <Item arrow="horizontal" onClick={() => { }}>用车时间：</Item>
                            <InputItem labelNumber={5} placeholder="请用英文填写">用车时间：</InputItem>
                        </List>
                        <span className="booking">预定</span>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}