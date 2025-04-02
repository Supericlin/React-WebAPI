import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'antd';
import { api } from '../common/http-common';
import axios from 'axios';

//import articles from './data/articles.json'

const Article = () => {
    const [articles, setArticles] = React.useState(null)
    React.useEffect(()=> {
        axios.get(`${api.url}/articles`)
        .then((res)=>{
        setArticles(res.data)
        })
    }, [])

    if(!articles) {
        return (
            <div>There is no article available now.</div>
        )
    } else {
        return (
        <Row justify="space-around">
            {
                articles && articles.map(({id, title, allText})=> (
                    <Col span={8} key={id} >
                        <Card title={title} style={{ width: 300 }} >
                            <p>{allText}</p>
                            <p></p>
                        <Link to={`/detail/${id}`}>Details</Link>
                    </Card>
                    </Col>
                ))
            }
        </Row>);
    }
}

export default Article;
