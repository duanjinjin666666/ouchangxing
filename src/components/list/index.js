import React from 'react';
import { ListView, Flex, ActivityIndicator, RefreshControl } from 'antd-mobile';
import net from "../net";

// import 'normalize.css/normalize.css';
// import 'antd-mobile/dist/antd-mobile.css';
import "../../styles/list.scss";
import Card from "../card";
import Visa from "../card/visa";

export default class LineList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
            isLoadding: true,
            refreshing: true,
            type: this.props.type,
            country: "",
            days: "",
            line_type: "",
            page: 1,
            search: "",
            height: this.props.height,
        };
    }

    renderRow(data) {
        if (this.state.type == "visa")
            return <Visa data={data} />
        return <Card data={data} />
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.height != nextProps.height) {
            this.setState({
                height: nextProps.height,
            });
        }
    }

    loadData(data) {
        this.setState({
            country: data.country,
            days: data.days,
            line_type: data.line_type,
            refreshing: true
        });
    }

    onRefresh() {
        let self = this;
        this.setState({
            refreshing: true
        });
        net.get("/api/line_list", {
            product_type: this.state.type,
            country: this.state.country,
            days: this.state.days,
            line_type: this.state.line_type,
            page: this.state.page,
            //search: this.state.search
        }).then(data => {
            if (data.status_code === 10000) {
                let line = data.line;
                self.setState({
                    data: line,
                    dataSource: this.state.dataSource.cloneWithRows(line),
                    refreshing: false,
                    isLoadding: false
                });
            }
        });
    }

    render() {
        let foot = (
            <div style={{ textAlign: 'center' }}>
                {this.state.isLoadding ? '加载中...' : ''}
            </div>
        );
        return (
            <ListView
                style={{ height: this.state.height }}
                dataSource={this.state.dataSource}
                renderFooter={() => foot}
                renderRow={this.renderRow.bind(this)}
                pageSize={5}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                    />
                }
            />

        );
    }
}