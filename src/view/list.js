import React from 'react';
import { Tabs, TabBar, Popup, List, Flex, Menu } from 'antd-mobile';
import '../styles/list.scss';
import net from "../components/net";

const data = [
    {
        value: '2',
        label: '美食',
        children: [
            {
                label: '全部美食',
                value: '22',
            },
            {
                label: '中餐',
                value: '21',
            }, {
                label: '火锅',
                value: '23',
            }, {
                label: '自助餐',
                value: '24',
            }, {
                label: '快餐',
                value: '25',
            }, {
                label: '小吃',
                value: '26',
            }, {
                label: '面包甜点',
                value: '27',
            }, {
                label: '生鲜水果',
                value: '28',
            }, {
                label: '面食',
                value: '29',
            }, {
                label: '休闲食品',
                value: '210',
            }],
    }, {
        value: '3',
        label: '超市',
        children: [
            {
                label: '全部超市',
                value: '31',
            }, {
                label: '超市',
                value: '32',
                disabled: true,
            }, {
                label: '便利店',
                value: '33',
            }, {
                label: '个人护理',
                value: '34',
            }],
    },
];

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

export default class ListTemp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sel: '',
            initData: ''
        }
        this.wrapProps = {};
    }

    componentWillMount() {
    }


    componentDidMount() {
        setTimeout(() => {
            this.setState({
                initData: data,
            });
        }, 1000);
        this.getData();
    }

    getData() {
        net.get("/api/line_list", {
            page: 1
        }).then(data => {
        });
    }

    showTermini() {
        Popup.show(<div>
            <List renderHeader={() => (
                <Flex className="pop-hd-handle">
                    <Flex.Item onClick={() => this.onClose('cancel')}>取消</Flex.Item>
                    <Flex.Item onClick={() => { alert('confirm'); this.onClose('cancel'); } }>
                        确定
                    </Flex.Item>
                </Flex>)}
                className="popup-list"
                >
                {['全部', '丹麦', '芬兰', '挪威', '瑞典'].map((i, index) => (
                    <List.Item key={index} className="pop-bd-list" onClick={() => console.log(index)}>{i}</List.Item>
                ))}
            </List>

        </div>, { animationType: 'slide-up', wrapProps: this.wrapProps, maskClosable: true });
    }

    showDays() {
        Popup.show(<div>
            <List renderHeader={() => (
                <Flex className="pop-hd-handle">
                    <Flex.Item onClick={() => this.onClose('cancel')}>取消</Flex.Item>
                    <Flex.Item onClick={() => { alert('confirm'); this.onClose('cancel'); } }>
                        确定
                    </Flex.Item>
                </Flex>)}
                className="popup-list"
                >
                {['不限', '1-4天', '4-8天', '8天以上'].map((i, index) => (
                    <List.Item key={index} className="pop-bd-list" onClick={() => console.log(index)}>{i}</List.Item>
                ))}
            </List>

        </div>, { animationType: 'slide-up', wrapProps: this.wrapProps, maskClosable: true });
    }

    showFilter() {
        Popup.show(<div>
            <Flex className="pop-hd-handle">
                <Flex.Item onClick={() => this.onClose('cancel')}>取消</Flex.Item>
                <Flex.Item onClick={() => { alert('confirm'); this.onClose('cancel'); } }>
                    确定
                </Flex.Item>
            </Flex>
            <Menu data={data} value={['2', '22']} />

        </div>, { animationType: 'slide-up', wrapProps: this.wrapProps, maskClosable: true });
    }


    onClose(sel) {
        this.setState({ sel });
        Popup.hide();
    }

    render() {
        return (
            <div>
                <Tabs defaultActiveKey="1" animated={true} onChange={callback}>
                    <TabPane tab="北欧深度" key="1">
                        <div>12</div>
                    </TabPane>
                    <TabPane tab="欧洲环游" key="2"></TabPane>
                    <TabPane tab="游轮" key="3"></TabPane>
                    <TabPane tab="订票" key="4"></TabPane>
                </Tabs>

                <TabBar
                    unselectedTintColor="#fff"
                    tintColor="#fff"
                    barTintColor="#666"
                    >
                    <TabBar.Item
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