import React, { Component } from "react";



export default class Title extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title
        }
    }

    componetWillReceiveProps(nextProps) {
        if (this.state.title != nextProps.title) {
            this.setState({
                title: nextProps.title
            });
        }
    }

    render() {
        
    }
}