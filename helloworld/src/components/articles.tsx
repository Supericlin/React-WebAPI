import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'antd';
import articles from './data/articles.json'

const Article = () => {
    return (
    <Row justify="space-around">
        {
            articles && articles.map(({id, title, FullText})=> (
                <Col span={8} key={id} >
                    <Card title={title} style={{ width: 300 }} >
                        <p>{FullText}</p>
                        <p></p>
                        <Link to={`/detail/${id}`}>Details</Link>
                    </Card>
                </Col>
            ))
        }
 </Row>);
}

export default Article;
