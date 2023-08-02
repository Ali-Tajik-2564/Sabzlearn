import React, { useEffect, useState } from 'react'
import "./Search.css"
import { useParams } from 'react-router'
import TopBar from '../TopBar/TopBar'
import MainHeader from '../MainHeader/MainHeader'
import Footer from '../Footer/Footer'
import SectionTitle from '../SectionTitle/SectionTitle'

import LastArticleBox from "../LastArticleBox/LastArticleBox";
import CourseBox from '../CourseBox/CourseBox'
export default function Search() {
    const [searchCourses, setSearchCourses] = useState([])
    const [searchArticles, setSearchArticles] = useState([])
    const { value } = useParams()
    useEffect(() => {
        fetch(`http://localhost:4000/v1/search/${value}`)
            .then(res =>
                res.json()

            )
            .then(result => {
                console.log(result);
                setSearchArticles(result.allResultArticles)
                setSearchCourses(result.allResultCourses)
            })
    }, [])

    return (
        <>
            <TopBar />
            <MainHeader />
            <div className="courses">
                <div class='container'>
                    <SectionTitle
                        title='دوره های مرتبت به سرچ شما'
                        desc='پیش به سوی ارتقای دانش'

                    />
                </div>

                <div class='courses-content'>
                    <div class='container'>
                        <div class='row'>
                            {searchCourses.length === 0 ? (
                                <div className="alert alert-warning m-3">دوره مورد نظر شما یافت نشد</div>
                            ) : (
                                <>
                                    {
                                        searchCourses.map((course) => (

                                            <CourseBox {...course} />

                                        ))
                                    }</>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            <div className="articles">
                <div class='container'>
                    <SectionTitle
                        title='مقاله های مرتبت به سرچ شما'
                        desc='پیش به سوی ارتقای دانش'

                    />
                </div>
                <div class='articles__content'>
                    <div className="container">
                        <div class='row'>
                            {searchArticles.length === 0 ? (
                                <div className="alert alert-warning m-3">مقاله مورد نظر شما یافت نشد</div>
                            ) :
                                (
                                    <> {searchArticles.map((article) => (

                                        <LastArticleBox {...article} />

                                    ))}
                                    </>
                                )}
                        </div></div>
                </div>

            </div >
            <Footer />

        </>
    )
}
