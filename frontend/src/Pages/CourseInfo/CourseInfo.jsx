import React, { useEffect, useState } from "react";
import "./CourseInfo.css";
import TopBar from "./../../Components/TopBar/TopBar";
import MainHeader from "./../../Components/MainHeader/MainHeader";
import Footer from "./../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import CourseInfoBox from "../../Components/CourseInfoBox/CourseInfoBox";
import Comment from "../../Components/Comment/Comment";
import Accordion from "react-bootstrap/Accordion";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
export default function CourseInfo() {
  const { courseName } = useParams();
  console.log(courseName);
  const LocalStorageToken = JSON.parse(localStorage.getItem("user"));
  const [sessions, setSessions] = useState([]);
  const [comments, setComments] = useState([]);
  const [courseDetail, setCourseDetail] = useState({});
  const [createAt, setCreateAt] = useState("");
  const [updateAt, setUpdateAt] = useState("");
  const [teacherInfo, setTeacherInfo] = useState("");
  const [relatedCourse, setRelatedCourse] = useState([]);
  useEffect(() => {
    getAllCourses()
    getRelatedCourses()
  }, []);
  function getAllCourses() {
    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      headers: {
        Authorization: `Bearer ${LocalStorageToken === "" ? null : LocalStorageToken
          }}`,
      },



    })

      .then((res) => res.json())
      .then((courseData) => {
        setComments(courseData.comments);
        setSessions(courseData.sessions);
        setCourseDetail(courseData);
        setCreateAt(courseData.createdAt);
        setUpdateAt(courseData.updatedAt);
        setTeacherInfo(courseData.creator);
        console.log(courseData);
      });
  }
  function getRelatedCourses() {
    fetch(`http://localhost:4000/v1/courses/related/${courseName}`)
      .then(res => res.json())
      .then(allData => setRelatedCourse(allData))

  }
  const onSubmitHandler = (enteredComment, score) => {
    fetch("http://localhost:4000/v1/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LocalStorageToken}`,
      },
      body: JSON.stringify({
        body: enteredComment,
        courseShortName: courseName,
        score: score
      }),
    })
      .then((res) => console.log(res))
      .then((result) => {
        console.log(result);
        swal({
          title: "کامنت مورد نظر با موفقیت ثبت شد",
          button: "تایید",
          icon: "success",
        });
      });
  };
  const registerToCourse = (courseInfo) => {
    if (courseInfo.price === 0) {
      swal({
        title: "ایا از ثبت نام خود اطمینان دارید؟"
        , icon: "warning"
        , buttons: ["نه", "اره"]

      })
        .then(result => {
          if (result)
            fetch(`http://localhost:4000/v1/courses/${courseInfo._id}/register`, {
              method: "POST"
              , headers: {
                "Authorization": `Bearer ${LocalStorageToken}`
                , "Content-Type": "application/json"
              },
              body: JSON.stringify({
                course: courseInfo.price
              })
            })
              .then(res => {
                res.json()
                if (res.ok) {
                  swal({
                    title: "با موفقیت در دوره ثبت نام شدید"
                    , icon: "success"
                    , buttons: "ok"
                  })
                    .then(() => {
                      getAllCourses()
                    })
                }
              })
        })
    } else {
      swal({
        title: "ایا از ثبت نام خود اطمینان دارید؟"
        , icon: "warning"
        , buttons: ["نه", "اره"]

      })
        .then(result => {
          if (result) {
            swal({
              title: "درصورت وجود کد تخفیف ان را وارد کنید"
              , content: "input"
              , buttons: ["ثبت نام بدون کد تخفیف", "ثبت نام با کد تخفیف"]
            })
              .then(result => {
                if (result === null) {
                  fetch(`http://localhost:4000/v1/courses/${courseInfo._id}/register`, {
                    method: "POST"
                    , headers: {
                      "Authorization": `Bearer ${LocalStorageToken}`
                      , "Content-Type": "application/json"
                    }

                    , body: JSON.stringify({
                      price: courseInfo.price
                    })
                  })
                    .then(res => {
                      res.json()
                      if (res.ok) {
                        swal({
                          title: "با موفقیت در دوره ثبت نام شدید"
                          , icon: "success"
                          , buttons: "ok"
                        })
                          .then(() => {
                            getAllCourses()
                          })
                      }
                    })
                } else {
                  fetch(`http://localhost:4000/v1/offs/${result}`, {
                    method: "POST",
                    headers: {
                      "Authorization": `Bearer ${LocalStorageToken}`
                      , "Content-Type": "application/json"
                      , body: JSON.stringify({
                        course: courseInfo._id
                      })

                    }
                  })
                    .then(res => {
                      if (res.status === 404) {
                        swal({
                          title: "این کد تخفیف معتبر نیست"
                          , icon: "error"
                          , buttons: "ok"
                        })
                      } else if (res.status === 409) {
                        swal({
                          title: "این کد تخفیف قبلا استفاده شده"
                          , icon: "error"
                          , buttons: "ok"
                        })
                      } else {
                        return res.json()
                      }
                    })
                    .then(code => {
                      fetch(`http://localhost:4000/v1/courses/${courseInfo._id}/register`, {
                        method: "POST"
                        , headers: {
                          "Authorization": `Bearer ${LocalStorageToken}`,
                          "Content-Type": "application/json"
                        }

                        , body: JSON.stringify({
                          course: courseInfo.price - (courseInfo.price * code.percent / 100)
                        })
                      })
                        .then(res => {
                          res.json()
                          if (res.ok) {
                            swal({
                              title: "با موفقیت در دوره ثبت نام شدید"
                              , icon: "success"
                              , buttons: "ok"
                            })
                              .then(() => {
                                getAllCourses()
                              })
                          }
                        })
                    })
                }
              })
          }
        })
    }

  }
  console.log(teacherInfo);
  return (
    <div>
      <TopBar />
      <MainHeader />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 1, title: "فرانت اند", to: "course-info/frontend" },
          { id: 1, title: "دوره متخصص جی اس", to: "course-info/js-expert" },
        ]}
      />
      <section class='course-info'>
        <div class='container'>
          <div class='row'>
            <div class='col-6'>
              <a href='#' class='course-info__link'>
                آموزش برنامه نویسی فرانت اند
              </a>
              <h1 class='course-info__title'>{courseDetail.name}</h1>
              <p class='course-info__text'>{courseDetail.description}</p>
              <div class='course-info__social-media'>
                <a href='#' class='course-info__social-media-item'>
                  <i class='fab fa-telegram-plane course-info__icon'></i>
                </a>
                <a href='#' class='course-info__social-media-item'>
                  <i class='fab fa-twitter course-info__icon'></i>
                </a>
                <a href='#' class='course-info__social-media-item'>
                  <i class='fab fa-facebook-f course-info__icon'></i>
                </a>
              </div>
            </div>

            <div class='col-6'>
              <video
                src=''
                poster={courseDetail.cover}
                class='course-info__video'
                controls></video>
            </div>
          </div>
        </div>
      </section>

      <main class='main'>
        <div class='container'>
          <div class='row'>
            <div class='col-8'>
              <div class='course'>
                {/* <!-- Start Course Boxes --> */}
                <div class='course-boxes'>
                  <div class='row'>
                    <CourseInfoBox
                      title='وضعیت دوره:'
                      desc={
                        courseDetail.isComplete === 1
                          ? "به اتمام رسیده"
                          : "درحال برگزاری"
                      }
                      icon='graduation-cap'
                    />
                    <CourseInfoBox
                      title='آخرین بروزرسانی:'
                      desc={updateAt.slice(0, 10)}
                      icon='calendar-alt'
                    />
                    <CourseInfoBox
                      title='روش پشتیبانی'
                      desc={courseDetail.support}
                      icon='user-alt'
                    />
                  </div>
                </div>
              </div>
              {/* <!-- Start Course Progress --> */}
              <div class='course-progress'>
                <div class='course-progress__header'>
                  <i class='fas fa-chart-line course-progress__icon'></i>
                  <span class='course-progress__title'>
                    درصد پیشرفت دوره: 75%
                  </span>
                </div>
                <div class='progress course-progress__bar'>
                  <div
                    class='progress-bar progress-bar-striped progress-bar-animated'
                    role='progressbar'
                    aria-label='Animated striped example'
                    aria-valuenow='75'
                    aria-valuemin='0'
                    aria-valuemax='100'
                    style={{ width: "75% " }}></div>
                </div>
              </div>
              {/* <!-- Finish Course Progress --> */}
              {/* <!-- Start Introduction --> */}

              <div class='introduction'>
                <div class='introduction__item'>
                  <span class='introduction__title title'>
                    آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار
                  </span>
                  <img
                    src='/images/info/1.gif'
                    alt='course info image'
                    class='introduction__img img-fluid'
                  />
                  <p class='introduction__text'>
                    کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد و
                    سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود که
                    در بازار کار به شدت از آن ها استفاده می شود و اگر بدون بلد
                    بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت خواهید
                    شد و حتی ممکن است ناامید شوید!
                  </p>
                  <p class='introduction__text'>
                    در این دوره نحوه کار با 20 مورد از پر استفاده ترین کتابخانه
                    های جاوا اسکریپت به صورت پروژه محور به شما عزیزان آموزش داده
                    می شود تا هیچ مشکلی برای ورود به بازار کار نداشته باشید
                  </p>
                </div>
                <div class='introduction__item'>
                  <span class='introduction__title title'>
                    هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب
                    درآمد)
                  </span>
                  <img
                    src='/images/info/2.jpg'
                    alt='course info image'
                    class='introduction__img img-fluid'
                  />
                  <p class='introduction__text'>
                    وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم،
                    از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در
                    حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون
                    موقع از این کتابخانه ها استفاده نکرده بودم.
                  </p>
                  <p class='introduction__text'>
                    همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از مهم
                    ترین مباحثی هستند که هر برنامه نویس وب برای ورود به بازار
                    کار و کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار کرده
                    باشد{" "}
                  </p>
                  <p class='introduction__text'>
                    همان طور که از اسم این دوره مشخص است، هدف از این دوره آموزش
                    20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه های جاوا
                    اسکریپت است تا شما بتوانید بعد از این دوره با قدرت و آمادگی
                    بیشتر ادامه مسیر برنامه نویسی وب را ادامه دهید، ری اکت یا
                    نود یا … را راحت تر یاد بگیرید و در نهایت وارد بازار کار شده
                    و کسب درآمد کنید.
                  </p>
                  <p class='introduction__text'>
                    شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی
                    کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه
                    جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد.
                    آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                  </p>
                  <p class='introduction__text'>
                    در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه،
                    نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش
                    دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص
                    خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و وب
                    اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                  </p>
                </div>
                <div class='introduction__btns'>
                  <a href='#' class='introduction__btns-item'>
                    دانلود همگانی ویدیوها
                  </a>
                  <a href='#' class='introduction__btns-item'>
                    دانلود همگانی پیوست‌ها
                  </a>
                </div>

                <div class='introduction__topic'>
                  <Accordion defaultActiveKey='0'>
                    <Accordion.Item eventKey='0' class='accordion'>
                      <Accordion.Header>جلسات دوره</Accordion.Header>
                      {sessions.map((session, index) => (
                        <Accordion.Body className='introduction__accordion-body'>
                          {session.free = 1 || courseDetail.isUserRegisteredToThisCourse === true ? (
                            <>  <div class='introduction__accordion-right'>
                              <span class='introduction__accordion-count'>
                                {index + 1}
                              </span>
                              <i class='fab fa-youtube introduction__accordion-icon'></i>
                              <Link to={`${courseName}/${session._id}`} class='introduction__accordion-link'>
                                معرفی دوره + چرا یادگیری کتابخانه ها ضروری است؟
                              </Link>
                            </div>
                              <div class='introduction__accordion-left'>
                                <span class='introduction__accordion-time'>
                                  {session.time}
                                </span>
                              </div>
                            </>
                          ) : (
                            <>  <div class='introduction__accordion-right'>
                              <span class='introduction__accordion-count'>
                                {index + 1}
                              </span>
                              <i class='fab fa-youtube introduction__accordion-icon'></i>
                              <span class='introduction__accordion-link'>
                                معرفی دوره + چرا یادگیری کتابخانه ها ضروری است؟
                              </span>
                            </div>
                              <div class='introduction__accordion-left'>
                                <span class='introduction__accordion-time'>
                                  {session.time}
                                </span>
                                <i className="fa fa-lock"></i>
                              </div>
                            </>
                          )}

                        </Accordion.Body>
                      ))}
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>

              {/* <!-- Finish Introduction --> */}

              {/* <!-- Start Teacher Details --> */}

              <div class='techer-details'>
                <div class='techer-details__header'>
                  <div class='techer-details__header-right'>
                    <img
                      src={teacherInfo.profile}
                      alt='Teacher Profile'
                      class='techer-details__header-img'
                    />
                    <div class='techer-details__header-titles'>
                      <a href='#' class='techer-details__header-link'>
                        {teacherInfo.name}
                      </a>
                      <span class='techer-details__header-skill'>
                        {teacherInfo.role}
                      </span>
                    </div>
                  </div>
                  <div class='techer-details__header-left'>
                    <i class='fas fa-chalkboard-teacher techer-details__header-icon'></i>
                    <span class='techer-details__header-name'>مدرس</span>
                  </div>
                </div>
                <p class='techer-details__footer'>
                  اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2 سال
                  با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در زمینه وب
                  فعالیت داشته باشم.و..
                </p>
              </div>

              {/* <!-- Finish Teacher Details --> */}
              <Comment comments={comments} onSubmit={onSubmitHandler} />
            </div>
            <div class='col-4'>
              <div class='courses-info'>
                <div class='course-info'>
                  <div class='course-info__register'>
                    {courseDetail.isUserRegisteredToThisCourse === true ? (
                      <span class='course-info__register-title'>
                        <i class='fas fa-graduation-cap course-info__register-icon'></i>
                        دانشجوی دوره هستید
                      </span>
                    ) : (
                      <span class='course-info__register-title' onClick={() => registerToCourse(courseDetail)}>
                        <i class='fas fa-graduation-cap course-info__register-icon' > </i>
                        ثبت نام کنید
                      </span>
                    )}
                  </div>
                </div>
                <div class='course-info'>
                  <div class='course-info__total'>
                    <div class='course-info__top'>
                      <div class='course-info__total-sale'>
                        <i class='fas fa-user-graduate course-info__total-sale-icon'></i>
                        <span class='course-info__total-sale-text'>
                          تعداد دانشجو :
                        </span>
                        <span class='course-info__total-sale-number'>
                          {courseDetail.courseStudentsCount}
                        </span>
                      </div>
                    </div>
                    <div class='course-info__bottom'>
                      <div class='course-info__total-comment'>
                        <i class='far fa-comments course-info__total-comment-icon'></i>
                        <span class='course-info__total-comment-text'>
                          67 دیدگاه
                        </span>
                      </div>
                      <div class='course-info__total-view'>
                        <i class='far fa-eye course-info__total-view-icon'></i>
                        <span class='course-info__total-view-text'>
                          14,234 بازدید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class='course-info'>
                  <div class='course-info__header-short-url'>
                    <i class='fas fa-link course-info__short-url-icon'></i>
                    <span class='course-info__short-url-text'>لینک کوتاه</span>
                  </div>
                  <span class='course-info__short-url'>
                    https://sabzlearn.ir/?p=117472
                  </span>
                </div>
                <div class='course-info'>
                  <span class='course-info__topic-title'>سرفصل های دوره</span>
                  <span class='course-info__topic-text'>
                    برای مشاهده و یا دانلود دوره روی کلمه
                    <a href='#' style={{ color: "blue", fontWeight: "bold" }}>
                      لینک
                    </a>
                    کلیک کنید
                  </span>
                </div>
                {
                  relatedCourse.length !== 0 && (

                    <div class='course-info'>

                      <span class='course-info__courses-title'>دوره های مرتبط</span>
                      <ul class='course-info__courses-list'>
                        {
                          relatedCourse.map(course => (

                            <li class='course-info__courses-list-item'>
                              <Link to={`/course-info/${course.shortName}`} class='course-info__courses-link'>
                                <img
                                  src={`http://localhost:4000/v1/course/cover/${course.cover}`}
                                  alt='Course Cover'
                                  class='course-info__courses-img'
                                />
                                <span class='course-info__courses-text'>
                                  {course.name}
                                </span>
                              </Link>
                            </li>
                          ))
                        }
                        <li class='course-info__courses-list-item'>
                          <a href='#' class='course-info__courses-link'>
                            <img
                              src='/images/courses/fareelancer.png'
                              alt='Course Cover'
                              class='course-info__courses-img'
                            />
                            <span class='course-info__courses-text'>
                              تعیین قیمت پروژه های فریلنسری
                            </span>
                          </a>
                        </li>
                        <li class='course-info__courses-list-item'>
                          <a href='#' class='course-info__courses-link'>
                            <img
                              src='/images/courses/nodejs.png'
                              alt='Course Cover'
                              class='course-info__courses-img'
                            />
                            <span class='course-info__courses-text'>
                              دوره Api نویسی
                            </span>
                          </a>
                        </li>
                        <li class='course-info__courses-list-item'>
                          <a href='#' class='course-info__courses-link'>
                            <img
                              src='/images/courses/jango.png'
                              alt='Course Cover'
                              class='course-info__courses-img'
                            />
                            <span class='course-info__courses-text'>
                              متخصص جنگو
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
