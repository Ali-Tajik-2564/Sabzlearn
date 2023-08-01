import Index from "./Pages/Index/Index";
import Category from "./Pages/Category/Category";
import CourseInfo from "./Pages/CourseInfo/CourseInfo";
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo";
import Courses from "./Pages/Courses/Courses";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Articles from "./Pages/Articles/Articles";
import Contact from "./Pages/Contact/Contact";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/category/:categoryName/:page", element: <Category /> },
  { path: "/contact", element: <Contact /> },
  { path: "/article-info/:articleName", element: <ArticleInfo /> },
  { path: "/course-info/:courseName", element: <CourseInfo /> },
  { path: "/courses/:page", element: <Courses /> },
  { path: "/articles/:page", element: <Articles /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];
export default routes;
