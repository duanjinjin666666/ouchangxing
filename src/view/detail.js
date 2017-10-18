import React from 'react';
import { browserHistory } from 'react-router';
import Swiper from "swiper";
import { WhiteSpace, Tabs, ActivityIndicator, Flex, Popup, List } from 'antd-mobile';
import '../styles/des.scss';
import "swiper/dist/css/swiper.min.css";
import net from "../components/net";
import Description from "./des";

import star from "../images/star.png";
import starOn from "../images/star_on.png";
import tel from "../images/tel.png";


const TabPane = Tabs.TabPane;

//import Description from "./des";

import GoodsInfo from "../components/goodsInfo";


export default class DetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            infoHeight: 0,
            id: this.props.params.id,
            details: "加载中...",
            product_type: "",
            introduction: "加载中...",
            line_num: "加载中...",
            line_type: "加载中...",
            tag: [],
            title: "加载中...",
            price: "加载中...",
            firstHeight: this.props.firstHeight
        }
        this.swiper;
        this.isInit = false;
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextState) {
        if (this.state.firstHeight != nextState.firstHeight) {
            this.setState({
                firstHeight: nextState.firstHeight
            });
        }
    }

    componentDidMount() {
        if (!this.isInit) {
            this.swiper = new Swiper(".swiper-container", {
                autoplay: 3000,
                pagination: '.swiper-pagination',
                loop: true
            });
            this.isInit = true;
        }
        this.geiInfo();
    }

    geiInfo() {
        let self = this;
        net.get("/api/line_info", { line_id: this.state.id }).then(data => {
            let item = data.info;
            if (data.status_code == 10000) {
                self.setState({
                    title: item.title,
                    introduction: item.introduction,
                    details: item.details,
                    line_num: item.line_num,
                    line_type: item.line_type,
                    tag: item.tag,
                    product_type: item.product_type,
                    price: item.price
                }, () => {
                    let h = $(".swiper-container").height() + $(".top-car").height() + $(".content-car").height();
                    this.setState({
                        firstHeight: h
                    });
                });
            }
        });
    }

    renderTag(data, index) {
        return <span key={index} className="btn-base">{data}</span>;
    }

    goOrder() {
        let id = this.state.id;
        browserHistory.push({
            pathname: "/date/" + id,
            // state: {
            //     id: id,
            //     title: this.state.title,
            //     line_num: this.state.line_num,
            //     type: this.state.product_type
            // }
        });
    }

    contactHotline() {
        let self = this;
        Popup.show(
            <div className="contact-hotline">
                <p>为节省您的时间，请告知客服此产品的产品编号</p>
                <h3>产品编号：89089</h3>
                <button className="btn-call">拨打客服电话</button>
                <button className="btn-cancel" onClick={() => { Popup.hide() }}>取消</button>
            </div>, { animationType: 'slide-up' }
        );
    }

    render() {
        return (
            <div className="info-box">
                <GoodsInfo className="goodsInfo" height={this.state.infoHeight} firstHeight={this.state.firstHeight} >
                    <div className="info-item" >
                        <div className="swiper-container my-carousel">
                            <div className="swiper-wrapper">
                                {['index_slider_1', 'index_slider_1', 'index_slider_1'].map((ii, index) => (
                                    <div className="swiper-slide" key={index}>
                                        <a href="#" ><img src={`${require("../images/" + ii + ".jpg")}`} /></a>
                                    </div>
                                ))}
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                        <div className="top-car">
                            <div className="title-box">
                                <span className="title">{this.state.title}</span>
                                {/*<span className="title">{this.state.introduction}</span>*/}
                            </div>
                            <span className="text-price">
                                <i>¥</i>
                                <span className="num">{this.state.price}</span>
                                <span className="u-start"> 起/人</span>
                            </span>
                            <div className="btn-label">
                                <span className="goodsNum">编号:{this.state.line_num}</span>
                                {
                                    this.state.tag.map((item, index) => this.renderTag(item, index))
                                }
                            </div>
                        </div>
                        <div className="content-car">
                            <div className="desTitle">
                                产品特色
                            </div>
                            <div className="des-info">
                                {this.state.details}
                            </div>
                        </div>
                    </div>
                    <div className="info-item" >
                        <Description id={this.state.id} />
                    </div>
                </GoodsInfo>
                <div className="bottomRow">
                    <Flex direction="row">
                        <Flex direction="column" className="bottom-col" align="center" justify="center" >
                            <img src={`${starOn}`} alt="" className="bicon" />
                            <span className="biconText">收藏</span>
                        </Flex>
                        <Flex direction="column" className="bottom-col" align="center" justify="center" onClick={this.contactHotline}>
                            <img src={`${tel}`} alt="" className="bicon" />
                            <span className="biconText">在线客服</span>
                        </Flex>
                        <Flex.Item style={{ marginLeft: 0 }} onClick={this.goOrder.bind(this)}>
                            <Flex justify="center" align="center" className="yubtn">
                                <span>立即预订</span>
                            </Flex>
                        </Flex.Item>
                    </Flex>
                </div>
            </div>
        )
    }
} 