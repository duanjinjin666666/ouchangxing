import React from 'react';
import { Flex } from 'antd-mobile';
import "../../styles/list.scss";

import { browserHistory } from 'react-router';

export default class Card extends React.Component {
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

    renderTag(data, index) {
        return <span key={index} className="btn-base">{data}</span>;
    }

    goInfo(id) {
        browserHistory.push({ pathname: "/detail/" + id, state: { id: id } });
    }

    render() {
        let obj = this.state.data
        return (
            <div className="popular-list" onClick={this.goInfo.bind(this, obj.id)}>
                <img src={obj.img} className="imgfull" />
                <div className="con">
                    <div className="info">
                        <Flex>
                            <Flex.Item className="Item" className="title">
                                {obj.title}
                            </Flex.Item>
                            <Flex.Item className="guess-price">
                                <span className="text-price">
                                    <i>¥</i>
                                    <span className="num">{parseInt(obj.price)}</span>
                                    <span className="u-start">起</span>
                                </span>
                            </Flex.Item>
                        </Flex>
                        <p>{obj.des}</p>
                        <div className="btn-label">
                            {
                                obj.tag.map((item, index) => this.renderTag(item, index))
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}