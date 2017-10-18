import React from 'react';
import { browserHistory } from 'react-router';
import { Flex, List, Toast, Stepper, DatePicker, Checkbox, InputItem, TextareaItem, Icon, Popup, Modal } from 'antd-mobile';
import '../styles/fillorder.scss';
import net from "../components/net";

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

let phoneReg = /^1[3|4|5|8][0-9]\d{4,8}$/;
let emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;


let citys = ["北京", "上海", "广州", "深圳"];

export default class OrderAirport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            info: {},
            isError: false,
            date: null,
            dateStr: "",
            visa_count: 1,
            contact: "",
            phone: "",
            email: "",
            visa_map: "",
            visa_speed_count: 0,
            count: 0
        };
    }

    showDetail() {
        let info = this.state.info;
        Popup.show(
            <div className="price-detail">
                <List renderHeader={() => (<div>价格明细</div>)}
                    className="popup-list"
                >
                    {
                        this.state.visa_count > 0 &&
                        <List.Item extra={`¥${info.visa_price} x ${this.state.visa_count}`}>
                            签证费
                      </List.Item>
                    }
                    {
                        this.state.visa_speed_count > 0 &&
                        <List.Item extra={`¥${info.visa_fee_speed_price} x ${this.state.visa_speed_count}`}>
                            签证加急费
                        </List.Item>
                    }
                    {
                        this.state.visa_count > 0 &&
                        <List.Item extra={`¥${info.visa_safety_price} x ${this.state.visa_count}`}>
                            保险
                        </List.Item>
                    }
                    <List.Item extra={`¥${this.state.info.visa_fee_price}`}>
                        服务费
                    </List.Item>
                </List>
                <nav className="group-submit">
                    <div className="total">
                        <span>订单总额：</span>
                        <span className="price">￥{this.state.count}</span>
                        <Icon type="down" onClick={() => Popup.hide()} />
                    </div>
                    <span className="book">提交订单</span>
                </nav>
            </div>, { animationType: 'slide-up', wrapProps }
        );
    }

    componentDidMount() {
        let { info } = this.props.location.state || {};
        console.log(info);
        this.setState({
            isError: !info,
            id: info.id || 0,
            info: info,
        }, () => {
            if (info.id > 0) {
                this.setState({
                    count: info.visa_price * this.state.visa_count + parseInt(info.visa_safety_price) + parseInt(info.visa_fee_price)
                })
            }
        });
    }


    numberChange(val) {
        let info = this.state.info;
        let count = 0;
        if (val > 0) {
            count = (val * info.visa_price) + (info.visa_fee_speed_price * this.state.visa_speed_count) + val * info.visa_safety_price + parseInt(info.visa_fee_price);
        } else {
            count = 0
        }
        this.setState({
            visa_count: val,
            count: count
        })
    }

    speedNumberChange(val) {
        let info = this.state.info;
        let count = 0;
        if (val > 0) {
            count = info.visa_fee_speed_price * val;
        } else {
            count = this.state.count;
        }
        this.setState({
            visa_speed_count: val,
            count: count
        })
    }

    sendOrder() {
        let self = this;
        if (this.state.contact.length == 0) {
            Toast.fail("请输入联系人姓名");
            return;
        }
        if (this.state.phone.length == 0) {
            Toast.fail("请输入手机号");
            return;
        }
        if (!phoneReg.test(this.state.phone)) {
            Toast.fail("手机号格式不正确");
            return;
        }
        if (this.state.email.length == 0) {
            Toast.fail("请输入邮箱");
            return;
        }
        if (!emailReg.test(this.state.email)) {
            Toast.fail("邮箱号格式不正确");
            return;
        }
        Toast.loading("下单中..");
        let { info } = this.state;
        net.post("/api/create_order", {
            line_id: info.id,
            visa_count: this.state.visa_count,
            contact: this.state.contact,
            phone: this.state.phone,
            email: this.state.email,
            visa_speed_count: this.state.visa_speed_count,
            visa_map: info.country,
            remark: ""
        }).then(data => {
            Toast.hide();
            if (data.status_code == 10000) {
                self.wxPay({ ...data });
            } else {
                Toast.fail("下单失败");
            }
        }).catch(err => {
            Toast.hide();
            Toast.fail("下单失败");
        });
    }

    wxPay(data) {
        let self = this;
        wx.chooseWXPay({
            timestamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success: function (res) {
                self.goResultPage();
            }
        });
    }

    goResultPage() {
        let { info } = this.state;
        browserHistory.replace({
            pathname: "/success",
            state: { money: this.state.count, title: info.title }
        });
    }

    render() {
        let data = this.state.info;
        if (this.state.isError) return <div>订单异常</div>
        return (
            <div className="main visa">
                <div className="card tour">
                    <span>产品编号：{data.line_num}</span>
                    <h3>{data.title}</h3>
                </div>
                <div className="card-space">
                    <List className="my-list">
                        <Item extra={data.country} arrow="horizontal">送签地点</Item>
                    </List>
                </div>
                <List>
                    <Item multipleLine extra={<Stepper onChange={this.numberChange.bind(this)} min={1} showNumber size="small" value={this.state.visa_count} />}>签证数量<Brief>¥{data.visa_price}人</Brief></Item>
                    <Item multipleLine extra={<Stepper onChange={this.speedNumberChange.bind(this)} min={0} max={this.state.visa_count} showNumber size="small" value={this.state.visa_speed_count} />} className="col-flex">
                        <div>签证加急费（可选项）<Brief>¥{data.visa_fee_speed_price}人</Brief></div>
                    </Item>
                    <Item style={{ Flex: "2" }} extra="服务费（材料审核翻译预约)" arrow="horizontal">
                        <div>服务费<Brief>¥{data.visa_fee_price}</Brief></div>
                    </Item>
                </List>

                <div className="contact">
                    <Flex>
                        <span>联系人</span>
                        <span className="require">*必填</span>
                    </Flex>
                    <List>
                        <InputItem
                            placeholder="请输入姓名"
                            extra="*"
                            onChange={text => this.setState({ contact: text })}
                        >姓名：</InputItem>
                        <InputItem
                            maxLength={11}
                            onChange={text => this.setState({ phone: text })}
                            type="number"
                            placeholder="请输入手机"
                            extra="*">手机：</InputItem>
                        <InputItem onChange={text => this.setState({ email: text })} placeholder="请输入邮箱" extra="*">邮箱：</InputItem>
                    </List>
                </div>
                <nav className="group-submit visa-sub">
                    <div className="total" onClick={this.showDetail.bind(this)}>
                        <span>订单总额：</span>
                        <span className="price">￥{this.state.count}</span>
                        <Icon type="up" />
                    </div>
                    <span className="book" onClick={this.sendOrder.bind(this)}>提交订单</span>
                </nav>
            </div>
        )
    }
} 