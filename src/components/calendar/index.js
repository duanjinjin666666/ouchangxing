import React from 'react';
import Swiper from "swiper";
import { Flex, Menu } from 'antd-mobile';
import Month from "./month";
import moment from "moment";
import "swiper/dist/css/swiper.min.css";
import "../../styles/calendar.scss";
let Item = Flex.Item;  



export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        let currentDate = this.props.date ? new Date(this.props.date) : new Date();
        this.state = {
            minYear: 1970,
            maxYear: currentDate.getFullYear(),
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1,
            day: currentDate.getDate(),
            date: this.props.date
        };
        this.actIndex = 1;
        this.prevMount = currentDate.getMonth();
        this.swiper;
        this.isInit = false;
    }

    componentWillMount() {

    }

    componentDidMount() {
        let self = this;
        if (!this.swiper) {
            this.swiperInit();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            date: nextProps.date
        });
    }

    getPrevMount() {
        let obj = {
            year: this.state.year,
            month: this.state.month
        }
        if (this.state.month == 1) {
            obj.year = this.state.year - 1;
            obj.month = 12;
        } else {
            obj.month = this.state.month - 1;
        }
        return obj;
    }

    getNextMount() {
        let obj = {
            year: this.state.year,
            month: this.state.month
        }
        if (this.state.month == 12) {
            obj.year = this.state.year + 1;
            obj.month = 1;
        } else {
            obj.month = this.state.month + 1;
        }
        return obj;
    }

    swiperInit() {
        let self = this;
        this.swiper = new Swiper(".swiper-container", {
            initialSlide: 1
        });

        this.swiper.on("slideChangeEnd", w => {
            if (w.activeIndex < self.actIndex) {
                //上个月  
                let prev = self.getPrevMount();
                self.setState({
                    year: prev.year,
                    month: prev.month
                }, () => {
                    self.swiper.destroy(false);
                    self.swiperInit();
                });
            }
            else if (w.activeIndex > self.actIndex) {
                //下个月 
                let next = self.getNextMount();
                self.setState({
                    year: next.year,
                    month: next.month
                }, () => {
                    self.swiper.destroy(false);
                    self.swiperInit();
                });
            } else {
                if (w.previousIndex > w.activeIndex) {
                    let prev = self.getPrevMount();
                    self.setState({
                        year: prev.year,
                        month: prev.month
                    }, () => {
                        self.swiper.destroy(false);
                        self.swiperInit();
                    });
                }
                else {
                    let next = self.getNextMount();
                    self.setState({
                        year: next.year,
                        month: next.month
                    }, () => {
                        self.swiper.destroy(false);
                        self.swiperInit();
                    });
                }
            }
        });
    }

    nextDate() {
        this.swiper.slideNext();
    }

    prevDate() {
        this.swiper.slidePrev();
    }


    render() {
        let prev = this.getPrevMount();
        let next = this.getNextMount();
        return (
            <div className="calendarMain">
                <Flex direction="row">
                    <div className="monthBtn prev" onClick={this.prevDate.bind(this)}></div>
                    <Item style={{ marginLeft: 0 }}>
                        <Flex align="center" justify="center" className="currDate">
                            {`${this.state.year}年${this.state.month}月`}
                        </Flex>
                    </Item>
                    <div className="monthBtn next" onClick={this.nextDate.bind(this)}></div>
                </Flex>
            </div>
        );
    }

}