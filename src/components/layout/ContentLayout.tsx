
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ScrollToTop from '../ScrollToTop';
import FloatingButton from '../FloatingButton';

interface ContentLayoutProps {
  children: React.ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <>
      <Header />
      <main id="main-content">
        {children}
      </main>
      <ScrollToTop />
      <FloatingButton />
      <Footer />
    </>
  );
};

export default ContentLayout;
