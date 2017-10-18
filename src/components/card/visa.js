import React from 'react';
import { Flex } from 'antd-mobile';
import '../../styles/visa.scss';
import imgDemo from "../../images/demo_visa_1.jpg";
import { browserHistory } from 'react-router';

export default class Visa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }

    goInfo(id) {
        browserHistory.push({ pathname: "/desVisa/" + id, state: { id: id } });
    }

    render() {
        let obj = this.state.data
        return (
            <li onClick={this.goInfo.bind(this, obj.id)} >
                <img src={obj.img} className="pic" />
                <h5>{obj.title} </h5>
                <div className="price">
                    <i>￥</i>
                    <span>{obj.visa_price}</span>
                    <i>/人</i>
                </div>
            </li>
        );
    }
}