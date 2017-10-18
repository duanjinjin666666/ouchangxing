import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Home from "./index";
import Line from "./line";
import DetailView from "./detail";
import OrderView from "./fillorder";
import OrderAirp from "./fillorderAirp";
import CreateGuest from "./createGuest";
import PickUp from "./pickup";
import Error from "./error";
import OrderResultView from "./orderResult";
import SelectDateView from "./selectDate";
import config from "../config/cfg";
// import 'normalize.css/normalize.css';
// import 'antd-mobile/dist/antd-mobile.css';

import myOrder from "./myorder";//35-我的订单
import collect from "./collect";//收藏
import fail from "./fail";//37-付款成功
import success from "./success";//38-付款失败
import ucenter from "./ucenter";//34-个人中心 
import listVisa from "./listVisa";//签证列表
import desVisa from "./desVisa";//签证详情
import fillorderVisa from "./fillorderVisa";//签证下单

import net from "../components/net";
import common from "../components/common";

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.wxConfig();
    }

    wxConfig() {
        let self = this;
        let url = common.getCurrentUrl();
        console.log("sign", url);
        net.post("/api/wx_config", {
            url
        }).then(data => {
            console.log("wxc", data);
            if (data.status_code == 401) {
                // window.location.href = common.href();
            } else {
                let wxc = {
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp: data.timeStamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature,// 必填，签名，见附录1
                    jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                };
                window.wx.config(wxc);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <Router history={browserHistory} >
                <Route path="/" onChange={this.wxConfig.bind(this)}>
                    <IndexRoute component={Home} />
                    <Route path="line/:name" component={Line} />
                    <Route path="/detail/:id" component={DetailView} />
                    <Route path="/order" component={OrderView} />
                    <Route path="/orderAirp" component={OrderAirp} />
                    <Route path="/createGuest/:id" component={CreateGuest} />
                    <Route path="/pickup/" component={PickUp} />
                    <Route path="/orderResult" component={OrderResultView} />
                    <Route path="/date/:id" component={SelectDateView} />
                    <Route path="/myorder/:type" component={myOrder} />
                    <Route path="/collect" component={collect} />
                    <Route path="/success" component={success} />
                    <Route path="/fail" component={fail} />
                    <Route path="/ucenter" component={ucenter} />
                    <Route path="/listVisa" component={listVisa} />
                    <Route path="/desVisa/:id" component={desVisa} />
                    <Route path="/visaOrder" component={fillorderVisa} />
                </Route>
            </Router>
        );
    }

}