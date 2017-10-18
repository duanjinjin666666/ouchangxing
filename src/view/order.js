import React from 'react';
import { Flex, Stepper } from 'antd-mobile';
import '../styles/order.scss';

let Item = Flex.Item;

export default class OrderView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dfVal: 0,
            rtVal: 0,
            crVal: 0,
            lkNum: 1
        }
    }


    componentDidMount() {


    }

    showBottomBorder(num) {
        if (num === this.state.lkNum)
            return { border: 0 }
        return {};
    }

    crChange(val) {
        this.setState({
            crVal: val
        });
    }

    rtChange(val) {

        this.setState({
            rtVal: val
        });
    }

    dfChange(val) {
        this.setState({
            dfVal: val
        });
    }


    render() {
        return (
            <div className="orderInfo">
                <div className="topBox" >
                    <div className="topTitle" >
                        北欧邮轮之旅北欧邮轮之旅邮轮之旅
                     </div>
                    <Flex direction="row" className="topRow">
                        <Item className="rowText">
                            北京出发
                        </Item>
                        <Item>
                            <Flex className="rowText" justify="end">
                                产品编号:123333
                            </Flex>
                        </Item>
                    </Flex>
                </div>
                <div className="goTimeBox">
                    <Flex direction="row" className="goTime">
                        <Item>
                            <span className="tipsText">出游日期</span>
                        </Item>
                        <Item >
                            <Flex justify="end">
                                <span className="timeText">2016年7月24日</span> <img src="../images/you.png" alt="" className="you" />
                            </Flex>
                        </Item>
                    </Flex>
                </div>
                <div className="numBox">
                    <div className="numRow">
                        <Flex direction="row">
                            <Item>
                                <Flex direction="column" align="start">
                                    <Item style={{ margin: 2 }}>
                                        <span className="jgTipsText">成人价</span>
                                    </Item>
                                    <Item style={{ margin: 0 }}>
                                        <span className="jgText">￥29999人</span>
                                    </Item>
                                </Flex>
                            </Item>
                            <Item>
                                <Flex justify="end">
                                    <Stepper
                                        showNumber max={10} min={0} value={this.state.crVal} onChange={this.crChange.bind(this)}
                                        />
                                </Flex>
                            </Item>
                        </Flex>
                    </div>
                    <div className="numRow">
                        <Flex direction="row">
                            <Item>
                                <Flex direction="column" align="start">
                                    <Item style={{ margin: 2 }}>
                                        <span className="jgTipsText">儿童价</span>
                                    </Item>
                                    <Item style={{ margin: 0 }}>
                                        <span className="jgText">￥29999人</span>
                                    </Item>
                                </Flex>
                            </Item>
                            <Item>
                                <Flex justify="end">
                                    <Stepper
                                        showNumber max={10} min={0} value={this.state.rtVal} onChange={this.rtChange.bind(this)}
                                        />
                                </Flex>
                            </Item>
                        </Flex>
                    </div>
                    <div className="numRow" style={{ border: 0 }}>
                        <Flex direction="row">
                            <Item>
                                <Flex direction="column" align="start">
                                    <Item style={{ margin: 2 }}>
                                        <span className="jgTipsText">单房差价</span>
                                    </Item>
                                    <Item style={{ margin: 0 }}>
                                        <span className="jgText">￥29999人</span>
                                    </Item>
                                </Flex>
                            </Item>
                            <Item>
                                <Flex justify="end">
                                    <Stepper
                                        showNumber max={10} min={0} value={this.state.dfVal} onChange={this.dfChange.bind(this)}
                                        />
                                </Flex>
                            </Item>
                        </Flex>
                    </div>
                </div>
                <div className="titleBox">
                    <Flex direction="row">
                        <Item>旅客信息</Item>
                        <Item>
                            <Flex justify="end">

                            </Flex>
                        </Item>
                    </Flex>
                </div>

                <div className="lkInfoBox">
                    <Flex direction="row" className="lkRow" style={this.showBottomBorder(1)}>
                        <Item>
                            <span className="tipsText">旅客1</span>
                        </Item>
                        <Item >
                            <Flex justify="end">
                                <span className="timeText">请选择</span> <img src="../images/you.png" alt="" className="you" />
                            </Flex>
                        </Item>
                    </Flex>
                </div>

                <div className="titleBox">
                    <Flex direction="row">
                        <Item>联系人</Item>
                        <Item>
                            <Flex justify="end">
                                <span className="require">*必填</span>
                            </Flex>
                        </Item>
                    </Flex>
                </div>

                <div className="lxrBox">
                    <Flex direction="row" className="lxrRow">
                        <div className="textTips">
                            <span>姓名:</span>
                        </div>
                        <Item>
                            <input type="text" />
                        </Item>
                        <div className="require">
                            *
                        </div>
                    </Flex>
                    <Flex direction="row" className="lxrRow">
                        <div className="textTips">
                            <span>手机:</span>
                        </div>
                        <Item>
                            <input type="text" />
                        </Item>
                        <div className="require">
                            *
                        </div>
                    </Flex>
                    <Flex style={{ border: 0 }} direction="row" className="lxrRow">
                        <div className="textTips">
                            <span>邮箱:</span>
                        </div>
                        <Item>
                            <input type="text" />
                        </Item>
                        <div className="require">
                            *
                        </div>
                    </Flex>
                </div>
            </div>
        );
    }
} 