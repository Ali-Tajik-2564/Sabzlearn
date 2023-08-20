import React, { useEffect, useState } from 'react'
import Editor from '../../../Components/Editor/Editor'
import swal from "sweetalert";
import { useNavigate, useParams } from 'react-router-dom';


export default function Draft() {
    const navigate = useNavigate();
    const { shortName } = useParams()

    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const [title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [ShortName, setShortName] = useState("")
    const [ArticleCover, setArticleCover] = useState({})
    const [ArticleCategory, setArticleCategory] = useState("")
    const [CategoryId, setCategoryId] = useState("")
    const [Body, setBody] = useState("")
    console.log(ArticleCover);




    useEffect(() => {
        getAllInfo()
    }, [])
    function getAllInfo() {
        fetch(`http://localhost:4000/v1/articles/${shortName}`, {
            headers: {
                "Authorization": `Bearer ${localStorageData}`
            }
        })
            .then(res => res.json())
            .then(info => {
                console.log(info);
                setTitle(info.title)
                setDescription(info.description)
                setBody(info.body)
                setShortName(info.shortName)
                setArticleCover(info.cover)
                setCategoryId(info.categoryID._id)
                setArticleCategory(info.categoryID.title)
            })
    }
    const articleCreator = (event) => {
        event.preventDefault()
        let fromArticleData = new FormData()
        fromArticleData.append("title", title)
        fromArticleData.append("description", Description)
        fromArticleData.append("shortName", ShortName)
        fromArticleData.append("cover", ArticleCover)
        fromArticleData.append("categoryID", CategoryId)
        fromArticleData.append("body", Body)

        fetch("http://localhost:4000/v1/articles", {
            method: "POST",
            headers: {

                "Authorization": `Bearer ${localStorageData}`
            }
            , body: fromArticleData
        })
            .then(res => {
                if (res.ok) {
                    swal({
                        title: "مقاله با موفقیت ثبت شد"
                        , icon: "success"
                        , buttons: "ok"
                    })
                        .then(() => {
                            navigate("/admin-panel/admin-articles")
                        })
                }
            })
    }
    const saveArticleAsDraft = (event) => {
        event.preventDefault()
        let fromArticleData = new FormData()
        fromArticleData.append("title", title)
        fromArticleData.append("description", Description)
        fromArticleData.append("shortName", ShortName)
        fromArticleData.append("cover", ArticleCover)
        fromArticleData.append("categoryID", CategoryId)
        fromArticleData.append("body", Body)

        fetch("http://localhost:4000/v1/articles/draft", {
            method: "POST",
            headers: {

                "Authorization": `Bearer ${localStorageData}`
            }
            , body: fromArticleData
        })
            .then(res => {
                if (res.ok) {
                    swal({
                        title: "مقاله با موفقیت پیش نویس شد"
                        , icon: "success"
                        , buttons: "ok"
                    })
                        .then(() => {
                            navigate("/admin-panel/admin-articles")
                        })
                }
            })
    }
    return (
        <div class="container-fluid" id="home-content">
            <div class="container">
                <div class="home-title">
                    <span>افزودن مقاله جدید</span>
                </div>
                <form class="form">
                    <div class="col-6">
                        <div class="name input">
                            <label class="input-title" style={{ display: "block" }}>
                                عنوان
                            </label>
                            <input
                                type="text"
                                onChange={(event) => setTitle(event.target.value)}
                                value={title}

                            />
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="name input">
                            <label class="input-title" style={{ display: "block" }}>
                                لینک
                            </label>
                            <input

                                type="text"
                                value={ShortName}
                                onChange={(event) => setShortName(event.target.value)}
                            />
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="name input">
                            <label class="input-title" style={{ display: "block" }}>
                                چکیده
                            </label>
                            {/* <textarea style={{ width: "100%", height: "200px" }}></textarea> */}

                            <input

                                type="text"
                                value={Description}
                                onChange={(event) => setDescription(event.target.value)}
                                className="article-textarea"
                            />
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <Editor value={Body} setValue={setBody} />
                    <div class="col-6">
                        <div class="name input">
                            <label class="input-title" style={{ display: "block" }}>
                                کاور
                            </label>
                            <input
                                type="file"
                                defaultValue={ArticleCover}
                                // value={ArticleCover[0]}

                                onChange={(event) => setArticleCover(event.target.files[0])}
                            />
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="name input">
                            <label class="input-title" style={{ display: "block" }}>
                                دسته بندی
                            </label>
                            <select

                            >
                                <option
                                    value={CategoryId}
                                >{ArticleCategory}</option>

                            </select>
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="bottom-form">
                            <div class="submit-btn">
                                <input type="submit" value="افزودن" className='m-3' onClick={articleCreator} />
                                <input type="submit" value="ثبت پیش نویس" className='m-3' onClick={saveArticleAsDraft} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
