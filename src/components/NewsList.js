/* eslint-disable no-template-curly-in-string */
import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 3rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
/*
const sampleArticle = {
  title: 'TITLE',
  description: 'DESC',
  url: 'https://sports.donga.com/ent/article/all/20200506/100921837/1',
  urlToImage:
    'https://dimg.donga.com/wps/SPORTS/IMAGE/2020/05/06/100921835.1.jpg',
};
*/

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    //usePromise에서 알아서 상태관리를 해 주기 때문에 따로 설정할 필요가 없다.
    // 이 역할을 나중에 리덕스와 리덕스 미들웨어에서 좀 더 쉽게 상태를 관리할 수 있다.
    const query = category === 'all' ? '' : `&category=${category}`; // get 형식은 query를 날릴 수 있음 ${}는 쉼표 아니고 물결표시 옆 쉼표임..
    return axios.get(
      `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=3c0a78062426486f868b072d25aea743`, //category가 all이면 공백이고 all이아니면 category를 지정한다.
    );
  }, [category]);

  if (loading) {
    //대기중일때
    return <NewsListBlock>Waiting...</NewsListBlock>;
  }
  // 아직 artices 값이 설정되지 않았을 떄
  if (!response) {
    return null;
  }
  if (error) {
    return <NewsListBlock>ERROR!</NewsListBlock>;
  }

  const { articles } = response.data;
  // articles 값이 있을 때
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
