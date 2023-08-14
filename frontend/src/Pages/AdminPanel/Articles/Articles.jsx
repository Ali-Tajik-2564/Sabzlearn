import React, { useEffect, useState } from 'react'
import Table from '../../../Components/AdminPanel/Table/Table'
import swal from "sweetalert";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input/Input";
import { minValidator } from "./../../../Validator/rules";
import Editor from '../../../Components/Editor/Editor';
import "./Articles.css"
export default function AdminArticles() {
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const [articles, setArticles] = useState([])
    const [categories, setCategories] = useState([]);
    const [articleCategory, setArticleCategory] = useState("-1");
    const [articleCover, setArticleCover] = useState({});
    const [articleBody, setArticleBody] = useState("")
    console.log(articles);

    const [formState, onInputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            shortName: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        getAllArticles()
        fetch(`http://localhost:4000/v1/category`)
            .then((res) => res.json())
            .then((allCategories) => {
                setCategories(allCategories);
            });

    }, [])
    function getAllArticles() {
        fetch("http://localhost:4000/v1/articles", {
            headers: {
                "Authorization": `Bearer ${localStorageData}`
            }
        })
            .then(res => res.json())
            .then(allArticles => {
                setArticles(allArticles)
            })
    }
    const removeArticle = (articleID) => {
        const localStorageDate = JSON.parse(localStorage.getItem("user"));
        swal({
            title: "آیا از حذف مقاله اطمینان دارید؟`",
            icon: "warning",
            buttons: ["نه", "آره"],
        }).then((result) => {
            if (result) {
                fetch(`http://localhost:4000/v1/articles/${articleID}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${localStorageData}`
                    },
                }).then((res) => {
                    if (res.ok) {
                        swal({
                            title: "مقاله مورد نظر با موفقیت حذف شد",
                            icon: "success",
                            buttons: "اوکی",
                        }).then(() => {
                            getAllArticles();
                        });
                    }
                });
            }
        });
    };

    const articleCreator = (event) => {
        event.preventDefault()
        let fromArticleData = new FormData()
        fromArticleData.append("title", formState.inputs.title.value)
        fromArticleData.append("description", formState.inputs.description.value)
        fromArticleData.append("shortName", formState.inputs.shortName.value)
        fromArticleData.append("cover", articleCover)
        fromArticleData.append("categoryID", articleCategory)
        fromArticleData.append("body", articleBody)

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
                            getAllArticles()
                        })
                }
            })
    }
    return (
        <>
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
                                <Input
                                    element="input"
                                    type="text"
                                    id="title"
                                    onInputHandler={onInputHandler}
                                    validations={[minValidator(8)]}
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title" style={{ display: "block" }}>
                                    لینک
                                </label>
                                <Input
                                    element="input"
                                    type="text"
                                    id="shortName"
                                    onInputHandler={onInputHandler}
                                    validations={[minValidator(5)]}
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

                                <Input
                                    element="textarea"
                                    type="text"
                                    id="description"
                                    onInputHandler={onInputHandler}
                                    validations={[minValidator(5)]}
                                    className="article-textarea"
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <Editor value={articleBody} setValue={setArticleBody} />
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title" style={{ display: "block" }}>
                                    کاور
                                </label>
                                <input
                                    type="file"
                                    onChange={(event) => {
                                        setArticleCover(event.target.files[0]);
                                    }}
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
                                    onChange={(event) => setArticleCategory(event.target.value)}
                                >
                                    <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>
                                    {categories.map((category) => (
                                        <option value={category._id}>{category.title}</option>
                                    ))}
                                </select>
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="bottom-form">
                                <div class="submit-btn">
                                    <input type="submit" value="افزودن" onClick={() => articleCreator(event)} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <Table title=" مقاله  ها">
                <table class="table">
                    <thead>

                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>لینک </th>
                            <th>نویسنده</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>


                        {articles.map((article, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{article.title}</td>
                                <td>{article.shortName}</td>
                                <td>{article.creator.username}</td>

                                <td>
                                    <button type="button" class="btn btn-primary edit-btn" >
                                        ویرایش
                                    </button>
                                </td>

                                <td>
                                    <button type="button" class="btn btn-danger delete-btn" onClick={() => removeArticle(article._id)}  >
                                        حذف
                                    </button>
                                </td>

                            </tr>
                        ))}





                    </tbody>
                </table>

            </Table>
        </>
    )
}
