import React from 'react';
import IScroll from "iscroll/build/iscroll-probe";
import "../../styles/goodsInfo.scss";
import $ from "n-zepto";
const HEIGHT = document.body.scrollHeight;

export default class GoodsInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // infoHeight: this.props.height,
            items: [],
            index: 0,
            topTips: "查看详情",
            bottomTips: "继续拖动，查看产品详情",
            firstHeight: 800
        }
        this.myScrollInit = false;
        this.iScroll = null;
        this.isTouching = false;
        this.y = 0;
        this.tpisHieght = 0;
    }

    componentWillUnmount() {
        document.removeEventListener("touchmove", this.def, { passive: false });
    }

    def(event) {
        // 判断默认行为是否可以被禁用
        if (event.cancelable) {
            // 判断默认行为是否已经被禁用
            if (!event.defaultPrevented) {
                event.preventDefault();
            }
        }
    }

    componentDidMount() {
        if (!this.myScrollInit) {
            this.iScroll = new IScroll('#wrapper', {
                scrollbars: false,
                bounce: true,
                zoom: false,
                probeType: 2,
            });
            document.addEventListener('touchmove', this.def, { passive: false });
            this.myScrollInit = true;
            this.iScroll.on("scroll", this.onScroll.bind(this));
        }
        this.tpisHieght = $("#bottomTips").height();
        this.setState({
            items: $(".goodsItems")
        }); 
    }

    onScroll() {
        this.y = this.iScroll.y;
        if (this.state.index > 0) {
            if (this.y >= this.tpisHieght) {
                this.setState({
                    topTips: "松开查看详情"
                });
            } else {
                this.setState({
                    topTips: "查看详情"
                });
            }
        }
    }
    onTouchStart() {
        this.isTouching = true;
    }
    onTouchEnd() {
        this.isTouching = false;
        if (this.y > this.tpisHieght) {
            this.setState({
                index: 0
            }, () => {
                this.iScroll.refresh();
                this.iScroll.scrollTo(0, 0, 300);
            });
        } else if (this.y <= this.iScroll.maxScrollY - 40) {
            this.setState({
                index: 1
            }, () => {
                this.iScroll.refresh();
                this.iScroll.scrollTo(0, 0, 300);
            });
        }
    }

    computeItems() {
        let self = this;
        let childEelments = [];
        React.Children.forEach(this.props.children, (item, index) => {
            let items = React.cloneElement(item, {
                className: "goodsItems",
                style: { display: self.isShow(index), minHeight: index == 0 ? this.state.firstHeight : HEIGHT - 50 },
                key: index
            });
            childEelments.push(items)
        });
        return childEelments;
    }



    isShow(index) {
        if (index == this.state.index) {
            return "block";
        }
        return "none";
    }


    render() {
        return (
            <div id="wrapper" className={this.props.className} style={this.props.style}
                onTouchStart={this.onTouchStart.bind(this)}
                onTouchEnd={this.onTouchEnd.bind(this)}>
                <div id="scroller">
                    <div id="topTips" style={{ display: this.state.index == 0 ? "none" : "block" }}>
                        <span>{this.state.topTips}</span>
                    </div>
                    {this.computeItems()}
                    <div id="bottomTips" style={{ display: this.state.index == 1 ? "none" : "block" }}>
                        <span>{this.state.bottomTips}</span>
                    </div>
                </div>
            </div>
        )
    }
} 