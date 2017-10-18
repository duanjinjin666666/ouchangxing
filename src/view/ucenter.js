import React from 'react';
import { List } from 'antd-mobile';
import '../styles/ucenter.scss';
import imgCollect from "../images/icon_collect.png";
import imgOrder from "../images/icon_order.png";
import imgDemo from "../images/demo_2.jpg";
import { browserHistory } from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

export default class Error extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ucenter">
                <div className="tx">
                    <div className="pic">
                        <img src={`${imgDemo}`} />
                    </div>
                    <p className="txt">159****0078</p>
                </div>
                <List className="my-list">
                    <Item
                        arrow="horizontal"
                        thumb={`${imgOrder}`}
                        onClick={() => {
                            browserHistory.push({ pathname: "/myorder/1", state: { orderStatus: "1" } });
                        }}
                    >
                        我的订单
                    </Item>
                    <Item
                        arrow="horizontal"
                        thumb={`${imgCollect}`}
                         onClick={() => {
                            browserHistory.push({ pathname: "/myorder/2", state: { orderStatus: "2" } });
                        }}
                    >
                        我的收藏
                    </Item>
                </List>
            </div>
        );
    }

}