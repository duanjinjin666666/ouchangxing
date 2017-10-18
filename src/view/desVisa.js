import React from 'react';
import { Tabs, Popup, Flex } from 'antd-mobile';
import $ from "n-zepto";
import '../styles/visa.scss';
import { browserHistory } from 'react-router';

import net from "../components/net";
import flow from "../images/img_visa_flow.jpg";
import star from "../images/star.png";
import starOn from "../images/star_on.png";
import tel from "../images/tel.png";

const TabPane = Tabs.TabPane;

export default class Description extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            info: {}
        }
    }

    componentDidMount() {
        this.getData();
    }


    getData() {
        let self = this;
        let { id } = this.props.location.state || {};
        net.get("/api/line_info", {
            line_id: id
        }).then(data => {
            console.log("info", data);
            if (data.status_code == 10000) {
                self.setState({
                    info: data.info
                });
            }
        });
    }





    contactHotline() {
        let self = this;
        Popup.show(
            <div className="contact-hotline">
                <p>为节省您的时间，请告知客服此产品的产品编号</p>
                <h3>产品编号：{self.state.line_num}</h3>
                <button className="btn-call">拨打客服电话</button>
                <button className="btn-cancel" onClick={() => { Popup.hide() }}>取消</button>
            </div>, { animationType: 'slide-up' }
        );
    }

    render() {
        let { info } = this.state
        return (
            <div className="visa">
                <div className="info-item">
                    <div className="top-car">
                        <span className="text-price" style={{ float: 'right' }}>
                            <i>¥</i>
                            <span className="num">{info.visa_price}</span>
                            <span className="u-start"> /人</span>
                        </span>
                        <div className="title-box">
                            <span className="title">丹麦个人旅游签证</span>
                        </div>
                    </div>
                </div>
                <Tabs defaultActiveKey="1" animated={false} swipeable={false} className="content">
                    <TabPane tab="商品详情" key="1">
                        <div className="bd">
                            <h5 className="title">产品说明</h5>
                            <p>
                                {info.introduction}
                            </p>
                        </div>
                        <div className="bd">
                            <h5 className="title">办理流程</h5>
                            <img src={`${flow}`} width="100%" />
                        </div>

                        <div className="bd">
                            <h5 className="title">拒签退款说明</h5>
                        </div>
                    </TabPane>
                    <TabPane tab="签证材料" key="2">
                        <div className="cost-des">
                            <div className="bd">
                                <div className="part">
                                    <p>欧洲领馆在通常情况下，最晚会在团队出发前1个工作日，返还团队旅游者的护照等原件给旅行社，届时才能准确获悉签证结果，若提前出签，我们将会第一时间通知您。（欧洲旅游旺季的时候，部分使领馆如意大利、希腊会出现提前半天出签的情况，此种情况较难理解，但实属欧洲使馆旺季情况下的通常做法，敬请谅解</p>
                                    <p>2.销签说明：团队回国后，需要将全团的护照原件和往返的登机牌交进领馆销签（登机牌不予退还，如您需要换取航空公司积分，可在机场航空公司柜台办理完积分之后再交给领队），也有可能领馆会要求您去面试销签，届时我们会提前通知您，请您配合；销签的时间通常为2个星期，但是旺季由于领馆繁忙，会出现一些团期销签需要二个月的时间，敬请谅解；3.当您从欧洲离境时，一定检查海关是否给您的护照盖了清晰的离境章，它是您已经回到中国的唯一凭证。如果没有盖章或者章不清晰无法辨认将会导致使馆要求您面试销签，由此造成不必要的损失，非常抱歉只能由本人承担。请您谅解的同时也请您自己务必仔细留意。4.行程中所列航班号及时间仅供参考，将根据实际情况做出合理的调整。</p>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="订购须知" key="3">
                        <div className="cost-des">
                            <div className="hd onepix">
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
                <div className="bottomRow">
                    <Flex direction="row">
                        <Flex direction="column" className="bottom-col" align="center" justify="center" >
                            <img src={`${starOn}`} alt="" className="bicon" />
                            <span className="biconText">收藏</span>
                        </Flex>
                        <Flex direction="column" className="bottom-col" align="center" justify="center" onClick={this.contactHotline.bind(this)}>
                            <img src={`${tel}`} alt="" className="bicon" />
                            <span className="biconText">在线客服</span>
                        </Flex>
                        <Flex.Item style={{ marginLeft: 0 }} onClick={() => {
                            browserHistory.push({ pathname: "/visaOrder", state: { info: info } });
                        }}>
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