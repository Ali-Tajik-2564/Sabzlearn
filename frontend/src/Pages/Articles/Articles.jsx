import React, { useEffect, useState } from "react";
import "./Articles.css";
import Footer from "../../Components/Footer/Footer";
import TopBar from "../../Components/TopBar/TopBar";
import MainHeader from "../../Components/MainHeader/MainHeader";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Pagination from "../../Components/Pagination/Pagination";
import LastArticleBox from "../../Components/LastArticleBox/LastArticleBox";
export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [shownArticles, setShowArticles] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/v1/articles")
      .then((res) => res.json())
      .then((articleData) => {
        console.log(articleData);
        setArticles(articleData);
      });
  }, []);
  return (
    <>
      <TopBar />
      <MainHeader />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 1, title: "مقاله ها", to: "articles/1" },
        ]}
      />
      <div class='courses-content'>
        <div class='container'>
          <div class='row'>
            {shownArticles.map((article) => (
              <div className='col-4'>
                <LastArticleBox {...article} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination
        pathname='/articles'
        itemCount={3}
        items={articles}
        setShownCourses={setShowArticles}
      />
      <Footer />
    </>
  );
}
