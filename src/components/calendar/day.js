import React from "react";
import moment from "moment";
import EEvent from "../Eevent";
import { Flex } from 'antd-mobile'; 
let Item = Flex.Item;
const WIDTH = document.body.scrollWidth;
let random = () => { parseInt(Math.random() * 99999999) };

export default class Day extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            day: this.props.day,
            year: this.props.year,
            today: this.props.today,
            month: this.props.month,
            data: this.props.data,
            selected: this.props.selected
        };
        let m = this.state.month >= 10 ? this.state.month : `0${this.state.month}`;
        let d = this.state.day >= 10 ? this.state.day : `0${this.state.day}`;
        this.fullDay = `${this.state.year}-${m}-${d}`;
    }

    componentDidMount() {
        let self = this;
        if (this.state.day) {
            EEvent.add("selected", function (e) {
                if (e.date == self.fullDay) {
                    EEvent.emit("selectDate", { selected: e.selected, date: self.fullDay, info: self.state.data });
                } else {
                    self.setState({
                        selected: false
                    });
                }
            });
        }
    }

    componentWillUnmount() {
        EEvent.rm("selected");
    }


    renderTask() {
        if (this.state.day) {
            if (this.state.data) {
                let c = this.state.data.vacancy > 100 ? "充足" : `余${this.state.data.vacancy}位`;
                return (
                    <div className="dayItems" style={{ background: "#fff", width: WIDTH / 7 }} onClick={() => {
                        this.setState({
                            selected: !this.state.selected
                        }, () => {
                            EEvent.emit("selected", { date: this.fullDay, selected: this.state.selected });
                        });
                    }}>
                        <Flex align="center" justify="center" direction="column" className={`dayCol ${this.state.selected ? "selected" : ""}`}>
                            <div className="dayTaskBox">
                                <div className="dayTaskItemT" style={{ width: WIDTH / 7 }}>{c}</div>
                                <div className={`daybox ${this.state.today ? " today" : ""}`}>{this.state.today ? "今天" : this.state.day}</div>
                                <div className="dayTaskItemB" style={{ width: WIDTH / 7 }}>{`￥${parseInt(this.state.data.pay_price)}`}</div>
                            </div>
                        </Flex>
                    </div>
                );
            } else {
                return (
                    <div className="dayItems" style={{ width: WIDTH / 7 }} >
                        <Flex align="center" justify="center" direction="column" className={`dayCol ${this.state.today ? " today" : ""}`}>
                            <div>{this.state.today ? "今天" : this.state.day}</div>
                        </Flex>
                    </div>
                )
            }
        }
        return (
            <div className="dayItems" style={{ width: WIDTH / 7 }} ></div>
        )
    }

    render() {
        return this.renderTask();
    }
}