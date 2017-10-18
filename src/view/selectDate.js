import React from "react";
import Month from '../components/calendar/month';
import { Modal, Button, Flex, List, Stepper } from 'antd-mobile';
import { browserHistory } from 'react-router';
import moment from "moment";
import "../styles/calendar.scss";
import net from "../components/net";
import EEvent from "../components/Eevent";
import DocumentTitle from 'react-document-title';
import $ from "n-zepto";
let Item = Flex.Item;
let ListItem = List.Item;
let Brief = ListItem.Brief;




export default class SelectDateView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            line: [],
            btnClass: "btnNext",
            numClass: "",
            data: {
                vacancy: 0,
                pay_price: 0,
                pay_price_child: 0,
                pay_price_four_in_room: 0,
                pay_price_two_in_room: 0,
                pay_price_two_not_in_room: 0,
                safety_price: 0,
                safety_price_child: 0
            },
            selectDate: "",
            people_num: 0,
            child_num: 0

        };
        this.line_id = this.props.params.id;
        this.weekCN = ["日", "一", "二", "三", "四", "五", "六"];
        this.weekEN = {
            "Sunday": 0,
            "Monday": 1,
            "Tuesday": 2,
            "Wednesday": 3,
            "Thursday": 4,
            "Friday": 5,
            "Saturday": 6
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            date: nextProps.date
        });
    }

    componentWillUnmount() {
        EEvent.rm("selectDate");
        $("body").css({
            "overflow": "auto",
            "position": "static",
            "top": "",
            "bottom": "",
            "right": "",
            "left": ""
        });
    }

    componentDidMount() {
        $("body").css({
            "overflow": "hidden",
            "position": "fixed",
            "top": 0,
            "bottom": 0,
            "right": 0,
            "left": 0
        });
        this.loadLine();
        EEvent.add("selectDate", e => {
            if (e.selected) {
                this.setState({
                    selectDate: e.date,
                    numClass: "shownum",
                    data: {
                        ...e.info
                    }
                });
            } else {
                this.setState({
                    btnClass: "btnNext",
                    selectDate: "",
                    numClass: "",
                    data: {
                        pay_price: 0,
                        pay_price_child: 0,
                        pay_price_four_in_room: 0,
                        pay_price_two_in_room: 0,
                        pay_price_two_not_in_room: 0
                    },
                    people_num: 0,
                    child_num: 0
                });
            }
        });
    }

    date() {
        const dateCount = 3;
        let currentDate = new Date();
        let endDates = [{ y: currentDate.getFullYear(), m: currentDate.getMonth() + 1 }];
        for (let i = 1; i <= dateCount; i++) {
            currentDate.setMonth(currentDate.getMonth() + 1);
            endDates.push({
                y: currentDate.getFullYear(), m: currentDate.getMonth() + 1
            });
        }
        return endDates;
    }

    getFullDate(month, day) {
        let m = month >= 10 ? month : `0${month}`;
        let d = day >= 10 ? day : `0${day}`;
        return `${this.state.year}-${m}-${d}`;
    }



    btnNext() {
        browserHistory.push({
            pathname: "/order", state: {
                date: this.state.selectDate,
                people_num: this.state.people_num,
                child_num: this.state.child_num,
                ...this.state.data,
                line_id: this.line_id
            }
        });
    }

    loadLine() {
        net.get("/api/line_calendar_info", {
            line_id: this.line_id
        }).then(data => {
            let infos = data.info.calendar;
            this.setState({
                line: infos
            });
        });
    }

    renderWeek() {
        let w = [];
        let week = this.weekCN;
        let c = week.length - 1;
        week.forEach((item, index) => {
            w.push(
                <Item key={index} style={{ marginLeft: 0 }}>
                    <Flex justify="center" align="center" className={(index == 0 || c == index) ? "week-item week-ts" : "week-item"}>
                        {item}
                    </Flex>
                </Item>
            );
        });
        return (
            <Flex direction="row" className="weekBox">
                {w}
            </Flex>
        );
    }

    render() {
        let date = this.date();
        let week = this.renderWeek();
        let self = this;
        return (
            <DocumentTitle title="选择出发日期 - 欧畅行">
                <div className="selectDateBox calendarMain">
                    {week}
                    <div className="sDatabox">
                        {
                            date.map((item, index) => {
                                return (
                                    <Month
                                        selectDate={this.state.selectDate}
                                        key={index}
                                        isRenderWeek={index == 0}
                                        data={this.state.line}
                                        year={item.y}
                                        month={item.m}
                                    />
                                );
                            })
                        }
                    </div>
                    <div className={`number ${this.state.numClass}`}>
                        <List>
                            <ListItem multipleLine extra={
                                <Stepper min={0} showNumber size="small" value={this.state.people_num} onChange={(e) => {
                                    let css = "btnNext";
                                    if (e > 0) {
                                        css = "btnNext btnNextAct";
                                    }
                                    this.setState({
                                        people_num: e,
                                        btnClass: css
                                    });
                                }} />
                            }>成人价<Brief>¥{this.state.data.pay_price}人</Brief></ListItem>
                            <ListItem multipleLine extra={
                                <Stepper min={0} showNumber size="small" value={this.state.child_num} onChange={(e) => this.setState({ child_num: e })} />
                            } className="col-flex">
                                <div>儿童价<Brief>¥{this.state.data.pay_price_child}人</Brief></div>
                            </ListItem>
                        </List>
                    </div>
                    <div className={this.state.btnClass} onClick={this.btnNext.bind(this)} >
                        请选择出发日期
                </div>
                </div>
            </DocumentTitle>
        );
    };


} 
