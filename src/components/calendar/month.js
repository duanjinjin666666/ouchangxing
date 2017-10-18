import React from "react";
import { Flex } from 'antd-mobile';
import moment from "moment";
import Day from "./day";
let Item = Flex.Item;


export default class Month extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            month: this.props.month,
            year: this.props.year,
            selectDate: this.props.selectDate,
            data: []
        }; 
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
        this.bigMount = [1, 3, 5, 7, 8, 10, 12];
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.selectDate != nextProps.selectDate) {
            this.setState({
                selectDate: nextProps.selectDate
            });
        }
        this.setState({
            data: nextProps.data
        });
    }

    getRandom() {
        return parseInt(Math.random() * 100000000);
    }

    getFullDate(day) {
        let m = this.state.month >= 10 ? this.state.month : `0${this.state.month}`;
        let d = day >= 10 ? day : `0${day}`;
        return `${this.state.year}-${m}-${d}`;
    }

    dayCount() {
        let year = this.state.year,
            month = this.state.month;
        let count = 30;
        let bigM = this.bigMount;
        if (month == 2) {
            if (this.isLeapYear(year)) {
                count = 29;
            } else {
                count = 28;
            }
        } else {
            let n = bigM.filter(d => d == month);
            count = n.length > 0 ? 31 : 30;
        }
        return count;
    }

    isLeapYear(year) {
        if ((year % 4 == 0 && year % 100 > 0) || year % 400 == 0) {
            return true;
        } else {
            return false;
        }
    }




    renderDays() {
        let days = [];
        let self = this;
        let dayCount = this.dayCount();
        let ws = this.weekEN;
        let m = this.state.month >= 10 ? this.state.month : `0${this.state.month}`;
        let startDate = `${this.state.year}-${m}-01`;
        let startWeek = moment(startDate).format("dddd");
        let startNumber = this.weekEN[startWeek];
        let endNumber = 7 - startNumber;
        let isBigM = this.bigMount.filter(d => d == self.state.month).length > 0;
        let date = new Date();
        for (let i = 0; i < startNumber; i++) {
            days.push(
                <Day key={this.getRandom()} />
            );
        }
        for (let i = 1; i <= dayCount; i++) {
            let s = this.state.data.filter(item => parseInt(item.go_date) == i);
            let it;
            if (s.length > 0 && this.getFullDate(i) == s[0].date_time) {
                it = s[0];
            }
            days.push(
                <Day
                    year={this.state.year}
                    month={this.state.month}
                    day={i}
                    selected={this.state.selectDate == this.getFullDate(i)}
                    key={this.getRandom()}
                    today={(i == date.getDate() && date.getFullYear() == this.state.year && date.getMonth() + 1 == this.state.month)}
                    data={it}
                />
            );
        }
        for (let i = 0; i < endNumber; i++) {
            days.push(
                <Day key={this.getRandom()} />
            );
        }
        return days;
    }

    renderMonthText() {
        return (
            <div className="monthText">
                {this.state.month}月
            </div>
        );
    }

    render() {
        let days = this.renderDays();
        return (
            <div className="monthContent">
                {this.renderMonthText()}
                <div className="monthDays">
                    {days}
                </div>
            </div>
        );
    }
}