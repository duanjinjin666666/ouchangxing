import React from 'react';
import { Tabs, TabBar, Popup, List, Flex, Menu, ListView } from 'antd-mobile';
import '../styles/visa.scss';
import net from "../components/net";
import { browserHistory } from 'react-router';
import LineList from "../components/list";
import $ from "n-zepto";

import imgDemo from "../images/demo_visa_1.jpg";


const data = [
    {
        value: '1',
        label: '价格区间',
        children: [
            {
                label: '不限',
                value: '0',
            },
            {
                label: '10000',
                value: 10000,
            }, {
                label: 20000,
                value: 20000,
            }],
    }, {
        value: '2',
        label: '游玩路线',
        children: [
            {
                label: '不限',
                value: '不限',
            }, {
                label: '追寻极光',
                value: '追寻极光',
            }, {
                label: '峡湾风光',
                value: '峡湾风光',
            }, {
                label: '城市游览',
                value: '城市游览',
            }],
    },
];

const terminiData = [{
    label: '全部',
    value: '',
},
{
    label: '丹麦',
    value: '丹麦',
},
{
    label: '芬兰',
    value: '芬兰',
}, {
    label: '挪威',
    value: '挪威',
}, {
    label: '瑞典',
    value: '瑞典',
}];


const dayData = [{
    label: '不限',
    value: '',
},
{
    label: '1-4天',
    value: '1,4',
},
{
    label: '4-8天',
    value: '4,8',
}, {
    label: '8天以上',
    value: '8',
}];

const TabPane = Tabs.TabPane;

export default class Line extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '1',
            sel: '',
            initData: '',
            height: 0,
            country: "",
            days: "",
            daysTemp: [""],
            line_type: "",
            countryTemp: [""]
        }
        this.wrapProps = {};
        this.nordic;
        this.europe;
        this.cruises;
        this.visa;
    }


    showTermini() {
        Popup.show(
            <div>
                <List renderHeader={() => (
                    <Flex className="pop-hd-handle">
                        <Flex.Item onClick={() => {
                            this.setState({
                                country: this.state.countryTemp.join("")
                            }, () => {
                                this[this.state.type].loadData({
                                    country: this.state.country,
                                    line_type: this.state.line_type,
                                    days: this.state.days
                                });
                                this.onClose('cancel');
                            })
                        }}>
                            确定
                    </Flex.Item>
                        <Flex.Item onClick={() => this.onClose('cancel')}>取消</Flex.Item>
                    </Flex>)}
                    className="popup-list"
                >
                    <Menu height={terminiData.length * 46} data={terminiData} value={this.state.countryTemp} level={1} />
                </List>
            </div>
            ,
            { animationType: 'slide-up', wrapProps: this.wrapProps, maskClosable: true });
    }

    showDays() {
        Popup.show(<div>
            <List renderHeader={() => (
                <Flex className="pop-hd-handle">
                    <Flex.Item onClick={() => {
                        this.setState({
                            days: this.state.daysTemp.join("")
                        }, () => {
                            this[this.state.type].loadData({
                                country: this.state.country,
                                line_type: this.state.line_type,
                                days: this.state.days
                            });
                            this.onClose('cancel')
                        });
                    }}>
                        确定
                    </Flex.Item>
                    <Flex.Item onClick={() => this.onClose('cancel')}>取消</Flex.Item>
                </Flex>)}
                className="popup-list"
            >
                <Menu height={dayData.length * 46} data={dayData} value={this.state.daysTemp} level={1} onChange={val => this.setState({ daysTemp: val })} />
            </List>

        </div >, { animationType: 'slide-up', wrapProps: this.wrapProps, maskClosable: true });
    }

    showFilter() {
        Popup.show(<div>
            <Flex className="pop-hd-handle">
                <Flex.Item onClick={() => { alert('confirm'); this.onClose('cancel'); }}>
                    确定
                </Flex.Item>
                <Flex.Item onClick={() => this.onClose('cancel')}>取消</Flex.Item>
            </Flex>
            <Menu data={data} value={['2', '不限']} onChange={this.filter.bind(this)} />
        </div>, { animationType: 'slide-up', wrapProps: this.wrapProps, maskClosable: true });
    }

    filter(val) {
        console.log(val);
    }

    onClose(sel) {
        this.setState({ sel });
        Popup.hide();
    }


    componentDidMount() {
        let tHeight = document.querySelector(".am-flexbox").offsetHeight;
        let bHeight = document.querySelector(".am-tab-bar-bar").offsetHeight;
        let bodyh = $(window).height();
        this.setState({
            height: bodyh - tHeight - bHeight
        });
    }

    getData() {
        net.get("/api/line_list", { product_type: visa, page: 1 });
    }

    render() {
        return (
            <div className="visa top-pd">
                <Flex className="topbar">
                    <Flex.Item><i className="ico-search"></i></Flex.Item>
                    <Flex.Item align="right">
                        <i className="ico-hotline"></i>
                        <i className="ico-user" onClick={() => {
                            browserHistory.push({ pathname: "/ucenter" });
                        }}></i>
                    </Flex.Item>
                </Flex>
                <ul className="list-visa">
                    <LineList type="visa" height={this.state.height} />
                </ul>
                <TabBar
                    unselectedTintColor="#fff"
                    tintColor="#fff"
                    barTintColor="#666"

                >
                    <TabBar.Item
                        ref="bTab"
                        title="目的地"
                        key="目的地"
                        icon={require('../images/ico_tab_1.png')}
                        data-seed="termini"
                        onPress={this.showTermini.bind(this)}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{ uri: '../images/ico_tab_2.png' }}
                        title="时间天数"
                        key="时间天数"
                        data-seed="days"
                        onPress={this.showDays.bind(this)}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{ uri: '../images/ico_tab_3.png' }}
                        title="综合筛选"
                        key="综合筛选"
                        data-seed="filter"
                        onPress={this.showFilter.bind(this)}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>
        )
    }
} 