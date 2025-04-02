import React from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../common/http-common';
import axios from 'axios';
import { Card } from 'antd';
import articles from './articles';

const ArticleDetail = () => {
    const { id } = useParams(); // Get the article ID from the URL
    const [article, setArticle] = React.useState(null);

    React.useEffect(() => {
        axios.get(`${api.url}/articles/${id}`) // Fetch the article by ID
            .then((res) => {
                setArticle(res.data); // Set the article data
            })
            .catch((err) => console.error(err));
    }, [id]);

    if (!article) {
        return <div>Loading article details...</div>;
    }

    return (
        articles && articles.map(({id, title, detail})=> (
        <Card title={title} style={{ maxWidth: 600, margin: '20px auto' }}>
            <p><strong>Detail:</strong> {detail}</p>
        </Card>
        ))
    );
};

export default ArticleDetail;