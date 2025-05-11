
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../Header';
import Footer from '../Footer';
import ScrollToTop from '../ScrollToTop';

const BlogLayout = () => {
  return (
    <>
      <Helmet>
        <title>Blog - NovaHypnose</title>
        <meta name="description" content="Blog professionnel sur l'hypnose, la thérapie et le bien-être - NovaHypnose" />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-16">
        <Outlet />
      </main>
      
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default BlogLayout;
