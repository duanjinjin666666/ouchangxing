import React from 'react';
import { browserHistory } from 'react-router';
import { Flex, List, Stepper, Checkbox, InputItem, TextareaItem, Icon, Popup, Modal } from 'antd-mobile';
import '../styles/fillorder.scss';
import $ from "n-zepto";

// fix touch to scroll background page on iOS
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    // Note: the popup content will not scroll.
    wrapProps = {
        // onTouchStart: e => e.preventDefault(),
    };
}

const Item = List.Item;
const Brief = Item.Brief;

export default class OrderAirport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.params.id,
        };
    }

    showDetail() {
        Popup.show(
            <div className="price-detail">
                <List renderHeader={() => (<div>价格明细</div>)}
                    className="popup-list"
                >
                    <List.Item extra="¥12990x1">
                        成人价
                    </List.Item>
                    <List.Item extra="¥9990x1">
                        儿童价
                    </List.Item>
                </List>
                <nav className="group-submit">
                    <div className="total">
                        <span>订单总额：</span>
                        <span className="price">￥24920</span>
                        <Icon type="down" onClick={() => Popup.hide()} />
                    </div>
                    <span className="book">提交订单</span>
                </nav>
            </div>, { animationType: 'slide-up', wrapProps }
        );
    }

    showShipType() {
        Popup.show(
            <div className="ship-type">
                <List style={{background: "#e7e7e7"}} renderHeader={() => (
                    <Flex className="pop-hd-handle">
                        <Flex.Item onClick={() => Popup.hide()}>取消</Flex.Item>
                        <Flex.Item className="done" onClick={() => { alert('confirm'); Popup.hide(); }}>
                            确定
                    </Flex.Item>
                    </Flex>)}
                    className="popup-list"
                >
                {['5座舒适型', '9座舒适型', '17座舒适型', '17座以上'].map((i, index) => (
                    <List.Item key={index} className="pop-bd-list" onClick={() => console.log(index)}>{i}</List.Item>
                ))}
                </List>
            </div>, { animationType: 'slide-up', wrapProps }
        );
    }

    render() {
        // const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className="main">
                    <div className="card tour">
                        <h3>xxx机场-目的地</h3>
                    </div>
                    <div className="card-space">
                        <List className="my-list">
                            <Item extra="2016年7月24日  11:00" arrow="horizontal" onClick={() => {
                                let id = this.state.id;
                                browserHistory.push({ pathname: "/selectDate/" + id, state: { id: id } });
                            }}>用车日期</Item>
                        </List>
                    </div>
                    <List>
                        <Item multipleLine extra={<Stepper showNumber size="small" defaultValue={1} />}>成人价<Brief>¥12990人</Brief></Item>
                        <Item multipleLine extra={<Stepper showNumber size="small" defaultValue={1} />} className="col-flex">
                            <div>儿童价<Brief>¥12990人</Brief></div>
                            <i className="icon-wenhao" />
                        </Item>
                    </List>

                    <List>
                        <Item extra="5座舒适型" arrow="horizontal" onClick={this.showShipType}>
                            <Flex className="boat-type">
                                <span>车型</span>
                            </Flex>
                        </Item>
                    </List>

                    <div className="contact card-space">
                        <Flex>
                            <span>联系人</span>
                            <span className="require">*必填</span>
                        </Flex>
                        <List>
                            <InputItem
                                placeholder="请输入姓名"
                                extra="*">姓名：</InputItem>
                            <InputItem type="phone" placeholder="请输入手机" extra="*">手机：</InputItem>
                            <InputItem placeholder="请输入邮箱" extra="*">邮箱：</InputItem>
                        </List>
                    </div>

                    <div className="remarks">
                        <List>
                            <Item>订单备注</Item>
                            <TextareaItem rows={6} placeholder="例如:境外联系方式，需要中文司机" />
                        </List>
                    </div>
                    <div className="notice onepix">
                        点击提交订单表示已阅读并接受<span>客户协议，预定须知</span>。
                    </div>
                    <nav className="group-submit">
                        <div className="total" onClick={this.showDetail}>
                            <span>订单总额：</span>
                            <span className="price">￥24920</span>
                            <Icon type="up" />
                        </div>
                        <span className="book">提交订单</span>
                    </nav>
                    
                
            </div>
        )
    }
} 