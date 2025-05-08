import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../Header";
import Footer from "../Footer";
import BlogSidebar from "./BlogSidebar";

const BlogLayout = () => {
  const isTemporaryBlog = window.location.pathname.startsWith('/blog-temp');
  
  return (
    <>
      <Helmet>
        {isTemporaryBlog && (
          <meta name="robots" content="noindex, nofollow" />
        )}
        <link rel="preconnect" href="https://cdn.gpteng.co" />
        <link rel="preconnect" href="https://tools.luckyorange.com" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <Outlet />
            </div>
            
            <div className="lg:col-span-4">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default BlogLayout;
