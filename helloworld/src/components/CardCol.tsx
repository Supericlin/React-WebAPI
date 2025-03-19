import React from 'react';
import { Col, Row } from 'antd';
import Card1 from './card1';
import Card2 from './card2';
import Card3 from './card3';

const App: React.FC = () => (
  <Row>
    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
        <Card1 />
    </Col>
    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
        <Card2 />
    </Col>
    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
        <Card3 />
    </Col>
  </Row>
);

export default App;