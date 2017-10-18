import React from 'react';
import { browserHistory } from 'react-router';
import { Flex, List, Stepper, Checkbox, SwipeAction, InputItem, TextareaItem, Icon, Popup, Modal, Toast } from 'antd-mobile';
import CreateGuest from "./createGuest";
import SelectDate from "./selectDate";
import '../styles/fillorder.scss';
import $ from "n-zepto";
import net from "../components/net";
import cache from "../components/cache";
import config from "../config/cfg";
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

export default class Fillorder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: "",
            line_id: 0,
            count: 0,
            title: "",
            line_num: "",
            from: "",
            selectDate: false,
            date: "请选择",
            go_date: "",
            isError: false,
            showAddMember: false,
            memberId: 0,
            member_info: [],
            people_num: 0,
            child_num: 0,
            room_num: 0,
            safety_man: 2,
            safety_child: 2,
            contact: "",
            phone: "",
            email: "",
            remark: "",
            cruises_room: {},
            visa_map: "",
            visa_count: 0,
            visa_speed_count: 0,
            pay_price: 0,
            pay_price_child: 0,
            pay_price_room: 0,
            pay_price_four_in_room: 0, //四人内
            pay_price_two_in_room: 0,//2人内
            pay_price_two_not_in_room: 0,//2人外
            safety_price_child: 0,
            safety_price: 0,
            four_in_room: 0,
            two_in_room: 0,
            two_not_in_room: 0,
            countDetail: {},
            countDetailUI: null,
            bx_cr: true,//保险成人
            bx_rt: false,////保险儿童
        };
    }



    componentWillMount() {
        if (!this.props.location || !this.props.location.state || !this.props.location.state.line_id) {
            this.setState({
                isError: true
            });
        }

        // this.setState({
        //     ...testJson
        // })
    }


    initInfo(params) {
        let mInfo = [];
        for (let i = 1; i <= params.people_num; i++) {
            mInfo.push({
                id: i
            });
        }
        this.setState({
            title: params.title,
            line_num: params.line_num,
            //line_id: params.line_id,
            type: params.type,
            ...params,
            member_info: mInfo
        }, () => {
            if (params.people_num > 0) {
                this.countChange("people_num", params.pay_price, params.people_num);
            }
            if (params.child_num > 0) {
                this.setState({
                    bx_rt: true
                }, () => {
                    this.countChange("child_num", params.pay_price_child, params.child_num);
                });
            }
        });
        this.geiInfo(params.line_id);
    }


    geiInfo(id) {
        let self = this;
        Toast.loading("订单初始化", 0);
        net.get("/api/line_info", { line_id: id }).then(data => {
            Toast.hide();
            let item = data.info;
            if (data.status_code == 10000) {
                self.setState({
                    title: item.title,
                    introduction: item.introduction,
                    //details: item.details,
                    line_num: item.line_num,
                    line_type: item.line_type,
                    //tag: item.tag,
                    //product_type: item.product_type,
                    //price: item.price
                });
            } else {
                self.setState({
                    isError: true
                });
            }
        }).catch(err => {
            Toast.hide();
            self.setState({
                isError: true
            });
        });
    }

    componentDidMount() {
        let params = this.props.location.state;
        let orderData = cache.getItem(config.cache.orderData, true);
        if (this.state.isError) {
            return;
        }
        if (orderData) {
            let ui = this.renderCountDetail(orderData.countDetail ? orderData.countDetail : {});
            this.setState({
                ...orderData,
                countDetailUI: ui
            });
        } else {
            this.initInfo(params);
        }
    }

    showDetail() {
        let self = this;
        Popup.show(
            <div className="price-detail">
                <List renderHeader={() => (<div>价格明细</div>)}
                    className="popup-list"
                >
                    {this.state.countDetailUI}
                </List>
                <nav className="group-submit">
                    <div className="total">
                        <span>订单总额：</span>
                        <span className="price">￥{self.state.count}</span>
                        <Icon type="down" onClick={() => Popup.hide()} />
                    </div>
                    <span className="book" onClick={this.sendOrder.bind(this)}>提交订单</span>
                </nav>
            </div>, { animationType: 'slide-up', wrapProps }
        );
    }



    closeAddMember() {
        this.setState({
            showAddMember: false,
        });
    }

    showShipType() {
        Popup.show(
            <div className="ship-type">
                <List renderHeader={() => (
                    <Flex className="pop-hd-handle">
                        <Flex.Item onClick={() => Popup.hide()}>取消</Flex.Item>
                        <Flex.Item className="done" onClick={() => { alert('confirm'); Popup.hide(); }}>
                            确定
                    </Flex.Item>
                    </Flex>)}
                    className="popup-list"
                >
                    <List.Item extra={
                        <Stepper style={{ width: '100%', minWidth: '2rem' }}
                            value={this.state.four_in_room}
                            onChange={this.countChange.bind(this, "four_in_room", this.state.four_in_room)}
                            showNumber
                            min={0}
                            size="small"
                        />
                    }>
                        四人内舱<Brief>¥{this.state.pay_price_four_in_room}人</Brief>
                    </List.Item>
                    <List.Item extra={
                        <Stepper style={{ width: '100%', minWidth: '2rem' }}
                            value={this.state.two_in_room}
                            onChange={this.countChange.bind(this, "two_in_room", this.state.two_in_room)}
                            showNumber
                            min={0}
                            size="small"
                        />
                    }>
                        双人内舱<Brief>¥{this.state.pay_price_two_in_room}人</Brief>
                    </List.Item>
                    <List.Item extra={
                        <Stepper style={{ width: '100%', minWidth: '2rem' }}
                            value={this.state.two_not_in_room}
                            onChange={this.countChange.bind(this, "two_not_in_room", this.state.two_not_in_room)}
                            showNumber
                            min={0}
                            size="small"
                        />
                    }>
                        双人外舱<Brief>¥{this.state.pay_price_two_not_in_room}人</Brief>
                    </List.Item>
                </List>
            </div>, { animationType: 'slide-up', wrapProps }
        );
    }


    closeSelectDate() {
        this.setState({
            selectDate: false,
        });
    }


    showSingle(e) {
        $('#single').show();
    }
    onClose() {
        $('#single').hide();
    }

    getMember() {
        let ms = [];
        let self = this;
        if (this.state.member_info.length == 0) {
            return [<Item key="1233">暂无旅客信息</Item>]
        }
        this.state.member_info.map((item, index) => {
            console.log(item)
            ms.push(
                <List.Item extra={`${item.first_name} ${item.last_name}`} arrow="horizontal">旅客{index + 1}</List.Item>
            );
        });
        return ms;
    }

    countChange(type, money, v) {
        let detial = this.state.countDetail;
        let name = "";
        let chengren = 0;
        let ertong = 0; 
        switch (type) {
            case "people_num":
                name = "成人价";
                this.setState({
                    people_num: v
                });
                if (this.state.bx_cr)
                    chengren = v * this.state.safety_price;
                break;
            case "child_num":
                name = "儿童价";
                this.setState({
                    child_num: v
                });
                if (this.state.bx_rt)
                    ertong = v * this.state.safety_child;
                break;
            case "room_num":
                name = "单房差价";
                this.setState({
                    room_num: v
                });
                break;
            case "four_in_room":
                name = "四人内舱";
                this.setState({
                    four_in_room: v
                });
                break;
            case "two_in_room":
                name = "双人内舱";
                this.setState({
                    two_in_room: v
                });
                break;
            case "two_not_in_room":
                name = "双人外舱";
                this.setState({
                    two_not_in_room: v
                });
                break;
        }
        detial[type] = {
            count: v,
            name: name,
            money: money
        };

        if (ertong > 0) {
            detial["rtbx"] = {
                count: v,
                name: "儿童保险",
                money: ertong
            };
        }

        if (chengren > 0) {
            detial["crbx"] = {
                count: v,
                name: "成人保险",
                money: chengren
            };
        }

        let ui = this.renderCountDetail(detial);
        this.setState({
            countDetail: detial,
            countDetailUI: ui
        });
    }

    bxChange(type, e) {
        let checked = e.target.checked;
        if (type == "cr") {
            let c = checked ? this.state.count + this.state.people_num * this.state.safety_price : this.state.count - this.state.people_num * this.state.safety_price;
            this.setState({
                bx_cr: checked,
                count: c
            }, () => {
                let detail = Object.assign({}, this.state.countDetail);
                if (checked) {
                    let bx = {
                        count: this.state.people_num,
                        name: "成人保险",
                        money: c
                    };
                    detail["crbx"] = bx;
                } else {
                    delete detail.crbx;
                }
                this.setState({
                    countDetail: detail
                }, () => {
                    this.countChange("people_num", this.state.pay_price, this.state.people_num);
                });
            });
        } else {
            let c = checked ? this.state.count + this.state.child_num * this.state.safety_price_child : this.state.count - this.state.child_num * this.state.safety_price_child;
            this.setState({
                bx_rt: checked,
                count: c
            }, () => {
                let detail = Object.assign({}, this.state.countDetail);
                if (checked) {
                    let bx = {
                        count: this.state.people_num,
                        name: "成人保险",
                        money: c
                    };
                    detail["rtbx"] = bx;
                } else {
                    delete detail.rtbx;
                }
                this.setState({
                    countDetail: detail
                }, () => {
                    this.countChange("child_num", this.state.pay_price_child, this.state.child_num);
                });
            });
        }
    }

    renderCountDetail(detial) {
        let countItem = [];
        let c = 0;
        let index = 0;
        let data = detial;
        for (let o in data) {
            let d = `￥${data[o].money} x ${data[o].count}`;
            countItem.push(
                <List.Item extra={d} key={index}>
                    {data[o].name}
                </List.Item>
            );
            c += data[o].money * data[o].count;
            index++;
        }
        if (countItem.length == 0) {
            countItem.push(
                <List.Item key={index}>
                    暂无价格明细
                </List.Item>
            );
        }
        this.setState({
            count: c
        });
        return countItem
    }

    getMemberNum() {
        let n = 0;
        this.state.member_info.map(item => {
            if (item.first_name) n++;
        });
        return n;
    }

    sendOrder() {
        let self = this;
        let sendData = {
            line_id: this.state.line_id,
            go_date: this.state.date,
            people_num: this.state.people_num,
            child_num: this.state.child_num,
            room_num: this.state.room_num,
            safety_man: this.state.bx_cr ? 2 : 1,
            safety_child: this.state.bx_rt ? 2 : 1,
            member_info: this.state.member_info,
            contact: this.state.contact,
            phone: this.state.phone,
            email: this.state.email,
            remark: this.state.remark,
        }
        if (sendData.people_num != this.getMemberNum()) {
            Toast.info("请填写所有出游人信息");
            return;
        }
        if (!sendData.contact) {
            Toast.info("请填写联系人姓名");
            return;
        }
        if (!sendData.phone) {
            Toast.info("请预留联系人手机号");
            return;
        }
        if (!sendData.email) {
            Toast.info("请填写联系人邮箱");
            return;
        }
        Toast.loading("加载中", 0);
        let savaData = Object.assign({}, this.state);
        savaData.countDetailUI = null;
        cache.setItem(config.cache.orderData, savaData, true);
        sendData.member_info = JSON.stringify(sendData.member_info);
        net.post("/api/create_order", sendData).then(data => {
            Toast.hide();
            if (data.status_code == 10000) {
                cache.remove(config.cache.orderData, true);
                self.wxPay({ ...data });
                //browserHistory.push({ pathname: "/orderResult", state: { type: "success", money: this.state.count } });
            } else {
                if (data.status_code == 401) {
                    cache.syncToken();
                }
                browserHistory.push({ pathname: "/orderResult", state: { type: "fail", message: data.message } });
            }
        }).catch(err => {
            Toast.hide();
            browserHistory.push({ pathname: "/orderResult", state: { type: "fail", message: "当前网络不稳定" } });
        });
    }

    renderPeopelInfo() {
        let arr = [];
        let self = this;
        this.state.member_info.map((item, index) => {
            arr.push(
                <Item extra="*" onClick={(e) => {
                    e.preventDefault(); // 修复 Android 上点击穿透
                    self.setState({
                        showAddMember: true,
                        memberId: item.id
                    });
                }} key={index}>{`游客${item.id}：`} <span style={{ color: "#ddd" }}>{item.first_name ? item.first_name + " " + item.last_name : "请输入游客信息"}</span></Item>
            );
        });
        return arr;
    }

    goResultPage() {
        browserHistory.replace({
            pathname: "/success",
            state: { money: this.state.count, title: this.state.title }
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
    render() {
        if (this.state.isError) return <div>订单异常，请重新下单</div>
        return (
            <div className="main">
                <form>
                    <div className="card tour" onClick={this.goResultPage.bind(this)}>
                        <h3>{this.state.title}</h3>
                        <div className="info">
                            <span>北京出发</span>
                            <span>产品编号：{this.state.line_num}</span>
                        </div>
                    </div>
                    {/*<List>
                        <Item multipleLine extra={
                            <Stepper min={0} showNumber size="small" value={this.state.people_num} onChange={this.countChange.bind(this, "people_num", this.state.pay_price)} />
                        }>成人价<Brief>¥{this.state.pay_price}人</Brief></Item>
                        <Item multipleLine extra={
                            <Stepper min={0} showhttp://www.panda.tv/act/kievmajor2017.html?roomid=60995&Number size="small" value={this.state.child_num} onChange={this.countChange.bind(this, "child_num", this.state.pay_price_child)} />
                        } className="col-flex">
                            <div>儿童价<Brief>¥{this.state.pay_price_child}人</Brief></div>
                            <i className="icon-wenhao" />
                        </Item>

                        <Item multipleLine extra={
                            <Stepper min={0} showNumber size="small" value={this.state.room_num} onChange={this.countChange.bind(this, "room_num", this.state.pay_price_room)} />
                        } className="col-flex">
                            <div>单房差价<Brief>¥{this.state.pay_price_room}人</Brief></div>
                            <i className="icon-wenhao" onClick={this.showSingle} />
                        </Item>
                    </List>*/}

                    <List style={{ display: this.state.type == "cruises" ? "block" : "none" }}>
                        <Item extra="四人内舱 x 2" arrow="horizontal">
                            <Flex className="boat-type">
                                <span>船舱类型</span>
                                <span className="price">￥2648</span>
                            </Flex>
                        </Item>
                    </List>
                    <div className="contact">
                        <Flex>
                            <span>出行人信息</span>
                            <span className="require">*必填</span>
                        </Flex>
                        <List className="my-list">
                            {this.renderPeopelInfo()}
                        </List>
                    </div>
                    <div className="contact card-space">
                        <Flex>
                            <span>联系人</span>
                        </Flex>
                        <List>
                            <InputItem placeholder="请输入姓名" extra="*" value={this.state.contact} onChange={text => this.setState({ contact: text })}  >姓名：</InputItem>
                            <InputItem type="phone" placeholder="请输入手机" extra="*" value={this.state.phone} onChange={text => this.setState({ phone: text })}  >手机：</InputItem>
                            <InputItem placeholder="请输入邮箱" extra="*" value={this.state.email} onChange={text => this.setState({ email: text })}  >邮箱：</InputItem>
                        </List>
                    </div>

                    <div className="card insure">
                        <Flex className="onepix">
                            <Flex.Item>
                                <span>成人保险</span>
                                <i className="icon-wenhao" onClick={this.showSingle} />
                            </Flex.Item>
                            <Flex.Item>
                                <span className="txt">{this.state.safety_price}元/人</span>
                                <Checkbox checked={this.state.bx_cr} onChange={this.bxChange.bind(this, "cr")}></Checkbox>
                            </Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item>
                                <span>儿童保险</span>
                                <i className="icon-wenhao" onClick={this.showSingle} />
                            </Flex.Item>
                            <Flex.Item>
                                <span className="txt">{this.state.safety_price_child}元/人</span>
                                <Checkbox checked={this.state.bx_rt} onChange={this.bxChange.bind(this, "rt")}></Checkbox>
                            </Flex.Item>
                        </Flex>
                    </div>

                    <div className="remarks">
                        <List>
                            <Item>订单备注</Item>
                            <TextareaItem rows={6} value={this.state.remark} onChange={text => this.setState({ remark: text })} />
                        </List>
                    </div>
                    <div className="notice onepix">
                        点击提交订单表示已阅读并接受<span>客户协议，预定须知</span>。
                    </div>
                    <nav className="group-submit">
                        <div className="total" onClick={this.showDetail.bind(this)}>
                            <span>订单总额：</span>
                            <span className="price">￥{this.state.count}</span>
                            <Icon type="up" />
                        </div>
                        <span className="book" onClick={this.sendOrder.bind(this)}>提交订单</span>
                    </nav>

                    <div className="defineModal" id="single">
                        <div className="flex">
                            <div className="bd">
                                <h3 className="onepix">儿童保险</h3>
                                <p>交通:往返团队/散客机票含税费（团队机票将统一出票，散客机票因实时计价预定后即刻出票）,当地旅游巴士住宿:酒店标准2人间。用餐:行程中团队标准用餐，如因特殊情况无法安排用餐，按每人每顿6欧元标准进行退餐（中式餐或自助餐或特色  餐，含飞机上用餐，自由活动期间用餐请自理；如因自身原因放弃用餐，则餐费不退）。因特殊情况无法安排用餐，按每人每顿6欧元标准进行退餐（中式餐或自助餐或特色  餐，含飞机上用餐，自由活动期间用餐请自理；如因自身原因放弃用餐，则餐费不退）。</p>
                            </div>
                            <div className="ft"><i className="close" onClick={this.onClose}></i></div>
                        </div>
                    </div>
                </form>

                <Modal
                    title="新增旅客"
                    transparent={false}
                    visible={this.state.showAddMember}
                    onClose={this.closeAddMember.bind(this)}
                >
                    <CreateGuest
                        memberId={this.state.memberId}
                        submit={member => {
                            member.gender = member.gender == 1 ? "男" : "女";
                            let m = this.state.member_info.filter(item => item.id == member.id)[0];
                            let info = Object.assign([], this.state.member_info);
                            if (m) {
                                info.forEach((item, index) => {
                                    if (m.id == item.id) {
                                        info[index] = member;
                                    }
                                });
                                this.setState({
                                    showAddMember: false,
                                    member_info: info
                                });
                            } 
                        }} />
                </Modal>
            </div>
        )
    }
}

const testJson = {
    "line_id": "1",
    "count": 2049,
    "title": "2017北欧极光之旅",
    "line_num": 200001,
    "from": "",
    "selectDate": false,
    "date": "2017-05-12",
    "go_date": "12",
    "isError": false,
    "showAddMember": false,
    "memberId": 1,
    "member_info": [
        {
            "id": 1,
            "gender": "男",
            "room_type": 1,
            "birth": "2017-05-06T06:36:56.558Z",
            "birthday": "2017-05-06",
            "first_name": "22",
            "last_name": "ee",
            "passport_id": "123 123"
        }
    ],
    "people_num": 1,
    "child_num": 0,
    "room_num": 0,
    "safety_man": 2,
    "safety_child": 2,
    "contact": "12333",
    "phone": "233",
    "email": "213123",
    "remark": "12312312",
    "cruises_room": {},
    "visa_map": "",
    "visa_count": 0,
    "visa_speed_count": 0,
    "pay_price": "1999.00",
    "pay_price_child": "1239.00",
    "pay_price_room": "199.00",
    "pay_price_four_in_room": "0.00",
    "pay_price_two_in_room": "0.00",
    "pay_price_two_not_in_room": "0.00",
    "four_in_room": 0,
    "two_in_room": 0,
    "two_not_in_room": 0,
    "countDetail": {
        "people_num": {
            "count": 1,
            "name": "成人价",
            "money": "1999.00"
        },
        "crbx": {
            "count": 1,
            "name": "成人保险",
            "money": 50
        }
    },
    "countDetailUI": [
        {
            "key": "0",
            "ref": null,
            "props": {
                "extra": "￥1999.00 x 1",
                "children": "成人价",
                "prefixCls": "am-list",
                "align": "middle",
                "error": false,
                "multipleLine": false,
                "wrap": false
            },
            "_owner": null,
            "_store": {}
        },
        {
            "key": "1",
            "ref": null,
            "props": {
                "extra": "￥50 x 1",
                "children": "成人保险",
                "prefixCls": "am-list",
                "align": "middle",
                "error": false,
                "multipleLine": false,
                "wrap": false
            },
            "_owner": null,
            "_store": {}
        }
    ],
    "bx_cr": true,
    "bx_rt": false,
    "date_time": "2017-05-12",
    "vacancy": 40,
    "introduction": "这是一个美妙的旅行！",
    "line_type": "极光线路"
};