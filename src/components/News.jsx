import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, ListGroup } from "react-bootstrap";
import "../styles/News.css";

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = process.env.REACT_APP_NEWS_API_KEY;
      const response = await axios.get(
        `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=soccer&pageSize=5`,
        { next: { revalidate: 20 } }
      );
      setArticles(response.data.articles);
    };

    fetchNews();
  }, []);

  return (
    <div className="news-list">
      <ListGroup>
        {articles.map((article, index) => (
          <ListGroup.Item key={index} className="news-item">
            <Card className="news-card">
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                {article.urlToImage && (
                  <Card.Img
                    variant="top"
                    src={article.urlToImage}
                    alt={article.title}
                  />
                )}
                <Card.Text className="news-author">
                  {article.author} -{" "}
                  {new Date(article.publishedAt).toLocaleString()}
                </Card.Text>
                <Card.Link href={article.url} target="_blank">
                  Read more
                </Card.Link>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default News;
