import React from 'react';
import { browserHistory } from 'react-router';
import { Flex, List, Button, Toast, InputItem, Radio, DatePicker } from 'antd-mobile';
import '../styles/guest.scss';
import moment from "moment";
import Cache from "../components/cache";
import config from "../config/cfg";
let Item = Flex.Item

const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('1920-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);


export default class CreateGuest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.memberId,
            gender: 1,
            room_type: 1,
            birth: null,
            birthday: "",
            first_name: "",
            last_name: "",
            passport_id: "",
        }
    }

    componentWillReceiveProps(nextState) {
        if (this.state.id != nextState.memberId) {
            this.setState({
                id: nextState.memberId
            });
        }
    }

    onSexSelect(sex) {
        this.setState({
            gender: sex
        });
    }

    onRoomSelect(type) {
        this.setState({
            room_type: type
        });
    }

    birthday(date) {
        let d = date.format("YYYY-MM-DD");
        this.setState({
            birth: date,
            birthday: d
        });
    }

    save() {
        if (!this.state.first_name) {
            Toast.info('请输入姓');
            return;
        }
        if (!this.state.last_name) {
            Toast.info('请输入名');
            return;
        }
        if (!this.state.passport_id) {
            Toast.info('请输入护照号码');
            return;
        }
        if (!this.state.birthday) {
            Toast.info('请选择出生日期');
            return;
        }
        this.props.submit && this.props.submit(this.state);
        this.setState({
            gender: 1,
            room_type: 1,
            birth: null,
            birthday: "",
            first_name: "",
            last_name: "",
            passport_id: "",
        });
    }

    render() {
        return (
            <div className="main guest">
                <List>
                    <Item className="item">
                        <div className="label">姓名：</div>
                        <InputItem placeholder="姓（拼音）"
                            value={this.state.first_name}
                            onChange={text => this.setState({ first_name: text })}
                        />
                        <i className="sp-line"></i>
                        <InputItem placeholder="名（拼音）"
                            value={this.state.last_name}
                            onChange={text => this.setState({ last_name: text })}
                        />
                    </Item>
                    <Item className="item">
                        <div className="label">请输入护照号：</div>
                        <InputItem
                            placeholder="请输入护照号"
                            value={this.state.passport_id}
                            onChange={text => this.setState({ passport_id: text })}
                        ></InputItem>
                    </Item>
                    <Item className="item">
                        <div className="label">性别：</div>
                        <Radio className="my-radio" checked={this.state.gender == 1} onChange={this.onSexSelect.bind(this, 1)} >男</Radio>
                        <Radio className="my-radio" checked={this.state.gender == 2} onChange={this.onSexSelect.bind(this, 2)} >女</Radio>
                    </Item>
                    <Item className="item my-picker">
                        <div className="label">出生日期：</div>
                        <DatePicker
                            mode="date"
                            minDate={minDate}
                            maxDate={maxDate}
                            value={this.state.birth}
                            onChange={this.birthday.bind(this)}
                        >
                            <List.Item arrow="horizontal"></List.Item>
                        </DatePicker>
                    </Item>
                    <Item className="item"><div className="label">房型：</div>
                        <Radio className="my-radio" checked={this.state.room_type == 1} onChange={this.onRoomSelect.bind(this, 1)}>单人间</Radio>
                        <Radio className="my-radio" checked={this.state.room_type == 2} onChange={this.onRoomSelect.bind(this, 2)}>标准间</Radio>
                    </Item>
                </List>
                <div style={{ padding: 10 }}>
                    <Button className="btn" type="primary" onClick={this.save.bind(this)}>保存</Button>
                </div>
            </div>
        )
    }


}