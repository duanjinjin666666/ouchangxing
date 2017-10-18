import React from 'react';
import { Carousel, Flex, ActivityIndicator } from 'antd-mobile';

import 'normalize.css/normalize.css';
import 'antd-mobile/dist/antd-mobile.css';
import '../styles/home.scss';

import { browserHistory } from 'react-router';

import Card from "../components/card";
import net from "../components/net";
import cache from "../components/cache";


import img_index_col_1 from "../images/img_index_col_1.png";
import img_index_col_2 from "../images/img_index_col_2.png";
import img_index_col_3 from "../images/img_index_col_3.png";
import img_index_col_4 from "../images/img_index_col_4.png";
import img_index_visa from "../images/img_index_visa.jpg";

const Topbar = (
    <div className="home-topbar">
        <div className="form-group">
            <span className="magnifier"></span>
            <input type="text" className="txt" />
        </div>
        <div>
            <i className="ico-hotline"></i>
            <i className="ico-user" onClick={() => {
                browserHistory.push({ pathname: "/ucenter" });
            }}></i>
        </div>
    </div>
)
const Slider = (
    <Carousel className="my-carousel" dots={true} autoplay={false} infinite>
        {['index_slider_1', 'index_slider_1'].map((ii) => (
            <a href="#" key={ii}><img src={`${require("../images/" + ii + ".jpg")}`} /></a>
        ))}
    </Carousel>
)

const Column = (
    <div className="home-column col-space">
        <Flex>
            <Flex.Item>
                <Flex direction="column" onClick={() => {
                    browserHistory.push({ pathname: "/line/nordic", state: { type: "nordic" } });
                }}>
                    <img src={`${img_index_col_1}`} />
                    <span>北欧深度</span>
                </Flex>
            </Flex.Item>
            <Flex.Item>
                <Flex direction="column" onClick={() => {
                    browserHistory.push({ pathname: "/line/europe", state: { type: "europe" } });
                }}>
                    <img src={`${img_index_col_2}`} />
                    <span>欧洲环游</span>
                </Flex>
            </Flex.Item>
            <Flex.Item>
                <Flex direction="column" onClick={() => {
                    browserHistory.push({ pathname: "/line/cruises", state: { type: "cruises" } });
                }}>
                    <img src={`${img_index_col_3}`} />
                    <span>游轮</span>
                </Flex>
            </Flex.Item>
            <Flex.Item>
                <Flex direction="column" onClick={() => {
                    browserHistory.push({ pathname: "/line/visa", state: { type: "visa" } });
                }}>
                    <img src={`${img_index_col_4}`} />
                    <span>订票</span>
                </Flex>
            </Flex.Item>
        </Flex>
    </div>
)

const column2 = (
    <nav className="home-column-2 col-space">
        <Flex>
            <Flex.Item className="subitem" onClick={() => {
                browserHistory.push({ pathname: "/pickup/", state: { type: "pickup" } });
            }}>
                <i className="icon icon-flight"></i>
                <span>接送机</span>
            </Flex.Item>
            <Flex.Item className="subitem">
                <i className="icon icon-hotel"></i>
                <span>酒店预定</span>
            </Flex.Item>
        </Flex>
        <Flex>
            <Flex.Item className="subitem">
                <i className="icon icon-car"></i>
                <span>包车</span>
            </Flex.Item>
            <Flex.Item className="subitem" onClick={() => {
                browserHistory.push({ pathname: "/listVisa/", state: { type: "listVisa" } });
            }}>
                <i className="icon icon-visa"></i>
                <span>签证</span>
            </Flex.Item>
        </Flex>
    </nav>
)

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: (
                <Flex.Item>
                    <Flex justify="center" align="center">
                        < ActivityIndicator text="加载中" />
                    </Flex>
                </Flex.Item>
            )
        };
    }

    componentDidMount() {
        this.renderList();
    }


    renderList() {
        net.get("/api/home_data").then(data => {
            if (data.status_code == 10000) {
                let ui = [];
                data.featured.forEach((obj, index) => {
                    ui.push(
                        <Card data={obj} key={index} />
                    );
                });
                this.setState({
                    list: ui
                });
            } else {
                this.setState({
                    list: <div>{data.message}</div>
                });
            }
        });
    }


    render() {
        return (
            <div className="home">
                {Topbar}
                {Slider}
                {Column}
                {column2}
                <div className="cheap-trip col-space">
                    <div className="hd">
                        <h4>优惠活动</h4>
                        <p>会玩乐，更会省</p>
                    </div>
                    <img src={`${img_index_visa}`} className="imgfull" />
                    <div className="info">
                        <div className="col">
                            <h4>丹麦签证优惠</h4>
                            <p>多种优惠，轻松旅行多种优惠，轻松旅行</p>
                        </div>
                        <div className="discount">
                            <span className="text-price">
                                <i>¥</i>
                                <span className="num">188</span>
                                <span className="u-start">起</span>
                            </span>
                            <span className="save-money">立省 ¥100</span>
                        </div>
                    </div>
                </div>
                {this.state.list}
            </div>
        )
    }
}