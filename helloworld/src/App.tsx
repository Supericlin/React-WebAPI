import { Layout, Menu, Space } from 'antd';
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Dashboard from './components/dashboard'
import About from './components/about'
import Article from './components/articles'
//import DetailArticle from './components/detailArticle'
import NewArticles from './components/newArticles'
import ArticleDetail from './components/newArticlesDetail';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Layout.Header style={{ display: 'flex'}}>
          <nav>
            <Space>
              <Link to='/'>Home</Link>
              <Link to='/about'>About</Link>
              <Link to='/dashboard'>Dashboard</Link>
              <Link to='/newArticles'>New Article</Link>
            </Space>
          </nav>
        </Layout.Header>

        <Layout.Content style={{ padding: '0 40px'}}>
          
          <div style={{minHeight: 200}}>
          <Routes>
              <Route index element = { <Home />} />
              <Route path="/about" element = { <About />} />
              <Route path="/dashboard" element = { <Dashboard />} /> 
              <Route path="/newArticles" element = { <NewArticles />} /> 
              <Route path="/detail/:id" element={ <ArticleDetail />} />
          </Routes>
          </div>
        </Layout.Content>

        <Layout.Footer>
          <p>(c) 2025 Web API Development.</p>
        </Layout.Footer>
      </BrowserRouter>
    </>
 );
}

export default App;