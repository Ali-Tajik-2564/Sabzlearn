import Index from "./Pages/Index/Index";
import Category from "./Pages/Category/Category";
import CourseInfo from "./Pages/CourseInfo/CourseInfo";
import ArticleInfo from "./Pages/ArticleInfo/ArticleInfo";
import PrivatePAdmin from "./Components/Private/Private-PAdmin";
import Courses from "./Pages/Courses/Courses";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Articles from "./Pages/Articles/Articles";
import Contact from "./Pages/Contact/Contact";
import Search from "./Components/Search/Search";
import AdminIndex from "./Pages/AdminPanel/Index/AdminIndex"
import Menus from "./Pages/AdminPanel/Menus/Menus"
import User from "./Pages/AdminPanel/User/User"
import AdminArticles from "./Pages/AdminPanel/Articles/Articles"
import AdminCourses from "./Pages/AdminPanel/AdminCourses/AdminCourses"
import AdminCategory from "./Pages/AdminPanel/Category/AdminCategory";
import AdminContact from "./Pages/AdminPanel/AdminContact/AdminContact";
import Sessions from "./Pages/AdminPanel/Sessions/Sessions";
import SessionInfo from "./Pages/SessionInfo/SessionInfo";
import AdminComments from "./Pages/AdminPanel/AdminComments/AdminComments";
import Offs from "./Pages/AdminPanel/Offs/Offs";
import Draft from "./Pages/AdminPanel/Articles/Draft";
import PAdmin from "./Pages/AdminPanel/Index/PAdmin";
import UserIndex from "./Pages/UserPanel/UserIndex/UserIndex";
import MainIndex from "./Pages/UserPanel/mainIndex/mainIndex";
import UserOrders from "./Pages/UserPanel/UserOrders/UserOrders";
import UserOrderDetail from "./Pages/UserPanel/UserOrderDetail/UserOrderDetail";
import Buy from "./Pages/UserPanel/Buy/Buy";
import UserTicket from "./Pages/UserPanel/UserTicket/UserTicket";
import TicketsInfos from "./Pages/UserPanel/UserTicket/TicketsInfos";
import TIcketAnswer from "./Pages/UserPanel/UserTicket/TIcketAnswer";
import EditAccount from "./Pages/UserPanel/EditAccount/EditAccount";
import AdminTicket from "./Pages/AdminPanel/AdminTicket/AdminTicket";
import Discount from "./Pages/AdminPanel/Discount/Discount";
const routes = [

  { path: "/", element: <Index /> },
  { path: "/category/:categoryName/:page", element: <Category /> },
  { path: "/contact", element: <Contact /> },
  { path: "/article-info/:articleName", element: <ArticleInfo /> },
  { path: "/course-info/:courseName", element: <CourseInfo /> },
  { path: "/courses/:page", element: <Courses /> },
  { path: "/articles/:page", element: <Articles /> },
  { path: "/search/:searchName", element: <Search /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/:shortName/:sessionID", element: <SessionInfo /> },
  {
    path: "/admin-panel/*", element: (<PrivatePAdmin><AdminIndex /></PrivatePAdmin>), children: [
      { path: "", element: <PAdmin /> },
      { path: "user/:page", element: <User /> },
      { path: "menus", element: <Menus /> },
      { path: "admin-articles", element: <AdminArticles /> },
      { path: "admin-articles/draft/:shortName", element: <Draft /> },
      { path: "admin-courses", element: <AdminCourses /> },
      { path: "category", element: <AdminCategory /> },
      { path: "contact", element: <AdminContact /> },
      { path: "sessions", element: <Sessions /> },
      { path: "comment", element: <AdminComments /> },
      { path: "off", element: <Offs /> },
      { path: "ticket", element: <AdminTicket /> },
      { path: "discount", element: <Discount /> },
    ]
  },
  {
    path: "/my-account", element: <UserIndex />, children: [

      { path: "", element: <MainIndex /> },
      { path: "orders/:pagenumber", element: <UserOrders /> },
      { path: "orders/detail/:ID", element: <UserOrderDetail /> },
      { path: "buy", element: <Buy /> },
      { path: "ticket", element: <TicketsInfos /> },
      { path: "ticket/send-ticket", element: <UserTicket /> },
      { path: "ticket/ticketAnswer/:ID", element: <TIcketAnswer /> },
      { path: "edit-account", element: <EditAccount /> },



    ]
  },
];
export default routes;
