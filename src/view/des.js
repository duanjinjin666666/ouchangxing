import React from 'react';
import { Tabs, Popup, Flex } from 'antd-mobile';
import $ from "n-zepto";
import icon_schedule from "../images/icon_schedule.png";
import icon_rmb from "../images/icon_rmb.png";
import icon_info from "../images/icon_info.png";

import net from "../components/net";

const TabPane = Tabs.TabPane;

export default class Description extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            line_num: "2000101",
            title: "加载中...",
            product_type: "europe",
            introduction: "加载中...",
            details: "加载中...",
            country: "加载中...",
            tag: [],
            img: "http://www.qukaihei.com/app/wx_img_1481448893106102.jpg",
            price: "加载中...",
            days: "6",
            line_type: "加载中...",
            stroke: []
        }
    }

    componentDidMount() {
        this.geiInfo();
    }

    geiInfo() {
        let self = this;
        net.get("/api/line_info", { line_id: this.state.id }).then(data => {
            let item = data.info;
            this.setState({
                stroke: item.stroke || []
            });
        });
    }

    render() {
        return (
            <div style={{ minHeight: window.screen.availHeight }}>
                <Tabs defaultActiveKey="1" animated={false} swipeable={false}>
                    <TabPane tab="行程详情" key="1">
                        <div className="cost-des">
                            <div className="hd onepix">
                                <img src={`${icon_schedule}`} width="18" />
                                <span>{this.state.stroke.length}日行程</span>
                            </div>
                            <div className="bd">
                                <ul className="schedule-list">
                                    {
                                        this.state.stroke.length == 0 && <span>暂无行程安排</span>
                                    }
                                    {
                                        this.state.stroke.map((item, index) => (
                                            <li key={index}>
                                                <div className="day-des">
                                                    <h2>第{item.day}天<span className="city">{item.begin_land}<i className="icon-plane"></i>{item.end_land}</span></h2>
                                                    <p>{item.detail}</p>
                                                </div>
                                                <div className="day-meal">
                                                    <h5 className="meal">餐饮</h5>
                                                    <p>早餐：{item.breakfast}</p>
                                                    <p>午餐：{item.lunch}</p>
                                                    <p>晚餐：{item.dinner}</p>
                                                </div>
                                                <div className="day-hotel">
                                                    <h5 className="hotel">住宿</h5>
                                                    <p>{item.hotel}</p>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="s-notice mark-red"><span>以上行程可能因为天气或其他原因有变动，具体行程以出团通知书为准</span></div>
                            <div className="gotop"></div>
                        </div>
                    </TabPane>
                    <TabPane tab="费用明细" key="2">
                        <div className="cost-des">
                            <div className="hd onepix">
                                <img src={`${icon_rmb}`} width="21" />
                                <span>费用说明</span>
                            </div>
                            <div className="bd">
                                <div className="part onepix">
                                    <h3 className="title">费用包含</h3>
                                    <ul className="num-list">
                                        <li>交通:往返团队/散客机票含税费（团队机票将统一出票，散客机票因实时计价预定后即刻出票）,当地旅游巴士</li>
                                        <li>住宿:酒店标准2人间。</li>
                                        <li>用餐:行程中团队标准用餐，如因特殊情况无法安排用餐，按每人每顿6欧元标准进行退餐（中式餐或自助餐或特色餐，含飞机上用餐，自由活动期间用餐请自理；如因自身原因放弃用餐，则餐费不退）。</li>
                                    </ul>
                                </div>
                                <div className="part">
                                    <h3 className="title">费用不包含</h3>
                                    <ul className="num-list">
                                        <li>交通:往返团队/散客机票含税费（团队机票将统一出票，散客机票因实时计价预定后即刻出票）,当地旅游巴士</li>
                                        <li>住宿:酒店标准2人间。</li>
                                        <li>用餐:行程中团队标准用餐，如因特殊情况无法安排用餐，按每人每顿6欧元标准进行退餐（中式餐或自助餐或特色餐，含飞机上用餐，自由活动期间用餐请自理；如因自身原因放弃用餐，则餐费不退）。</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="订购须知" key="3">
                        <div className="cost-des">
                            <div className="hd onepix">
                                <img src={`${icon_info}`} width="21" />
                                <span>预订须知</span>
                            </div>
                            <div className="bd">
                                <div className="part">
                                    <h3 className="title">温馨提示</h3>
                                    <p>欧洲领馆在通常情况下，最晚会在团队出发前1个工作日，返还团队旅游者的护照等原件给旅行社，届时才能准确获悉签证结果，若提前出签，我们将会第一时间通知您。（欧洲旅游旺季的时候，部分使领馆如意大利、希腊会出现提前半天出签的情况，此种情况较难理解，但实属欧洲使馆旺季情况下的通常做法，敬请谅解</p>
                                    <p>2.销签说明：团队回国后，需要将全团的护照原件和往返的登机牌交进领馆销签（登机牌不予退还，如您需要换取航空公司积分，可在机场航空公司柜台办理完积分之后再交给领队），也有可能领馆会要求您去面试销签，届时我们会提前通知您，请您配合；销签的时间通常为2个星期，但是旺季由于领馆繁忙，会出现一些团期销签需要二个月的时间，敬请谅解；3.当您从欧洲离境时，一定检查海关是否给您的护照盖了清晰的离境章，它是您已经回到中国的唯一凭证。如果没有盖章或者章不清晰无法辨认将会导致使馆要求您面试销签，由此造成不必要的损失，非常抱歉只能由本人承担。请您谅解的同时也请您自己务必仔细留意。4.行程中所列航班号及时间仅供参考，将根据实际情况做出合理的调整。</p>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>

            </div>
        )
    }
} 