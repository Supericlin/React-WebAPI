import React from 'react';
import articles from './data/articles.json';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const DetailArticle = () => {
    const { aid } = useParams();

    const navigate = useNavigate();

    for(const article of articles) {
        if(article.id == parseInt(aid!)) {
            return(
                <>
                    <h1>{article.title}</h1>
                    <p>{article.FullText}</p>
                    <Button type="primary" onClick={()=>navigate(-1)}>Back</Button>
                </>
            );
        };
    }
}

export default DetailArticle;