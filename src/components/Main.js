// import 'normalize.css/normalize.css';
import 'styles/App.css';
import React from 'react';
import yeomanImage from '../images/yeoman.png';
import { Button, Flex, Popup, Icon, List } from 'antd-mobile';


// import 'antd-mobile/dist/antd-mobile.css';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sel: ""
    }

    this.wrapProps = {};
  }


  render() {
    return (
      <div className="index">
        <div className="title">轴对齐方式</div>
        <Button className="btn" type="warning" onClick={this.onClick.bind(this)}>warning 按钮</Button>
        <Flex direction="row">
          <Flex.Item>
            <Flex justify="center" align="center">
              <h1>item</h1>
            </Flex>
          </Flex.Item>
          <Flex.Item>
            <Flex justify="center" align="center">
              <h1>item</h1>
            </Flex>
          </Flex.Item>
        </Flex>
      </div>
    );
  }


  onClick() {
    Popup.show(<div>
      <List renderHeader={() => (
        <div style={{ position: 'relative' }}>
          委托买入
          <span
            style={{
              position: 'absolute', right: 3, top: -5,
            }}
            onClick={() => this.onClose('cancel')}
            >
            <Icon type="cross" />
          </span>
        </div>)}
        className="popup-list"
        >
        {['股票名称', '股票代码', '买入价格', '买入数量', '更多', '更多'].map((i, index) => (
          <List.Item key={index}>{i}</List.Item>
        ))}
      </List>
      <ul style={{ padding: '0.18rem 0.3rem' }}>
        <li>投资说明投资说明...</li>
        <li style={{ marginTop: '0.18rem' }}>
          <Button type="primary" onClick={() => this.onClose('cancel')}>买入</Button>
        </li>
      </ul>
    </div>, { animationType: 'slide-up', wrapProps: this.wrapProps, maskClosable: true });
  }

  onClose(sel) {
    this.setState({ sel });
    Popup.hide();
  }

}

AppComponent.defaultProps = {
};

export default AppComponent;
