import React, { useEffect, useState } from 'react'
import Table from '../../../Components/AdminPanel/Table/Table'
import swal from 'sweetalert'
import Input from "./../../../Components/Form/Input/Input"
import { useForm } from "./../../../hooks/useForm";
import {
    requiredValidator,
    minValidator,
    maxValidator,
    emailValidator,
} from "../../../Validator/rules";

export default function AdminCagetory() {
    const [categories, setCategories] = useState([])
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    const [formState, onInputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            name: {
                value: "",
                isValid: false,
            },

        },
        false
    );

    useEffect(() => {
        getAllCategory()
    }, [])
    function getAllCategory() {
        fetch("http://localhost:4000/v1/category")
            .then(res => res.json())
            .then(allcagetories => {
                console.log(allcagetories);
                setCategories(allcagetories)
            })
    }
    const registerNewCategory = (event) => {
        event.preventDefault()
        let newCategory = {
            title: formState.inputs.title.value,
            name: formState.inputs.name.value
        }
        fetch("http://localhost:4000/v1/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorageData}`
            }
            , body: JSON.stringify(newCategory)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                swal({
                    title: "دسته بندی مورد نظر با موفقیت اضافه شد"
                    , icon: "success",
                    buttons: "ok"
                })
                    .then(() => {
                        getAllCategory()
                    })
            })
    }
    const removeHandler = (categoryID) => {
        swal({
            title: "ایا از حذف مطمٰن هستید؟",
            icon: "warning",
            buttons: ["نه", "اره"]
        })
            .then((result) => {
                if (result) {
                    fetch(`http://localhost:4000/v1/category/${categoryID}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${localStorageData}`
                        }
                    })
                        .then(res => res.json())
                        .then((ans) => {
                            if (ans) {
                                swal({
                                    title: "دسته بندی با موفقیت هذف شد"
                                    , icon: "success"
                                    , buttons: "ok"
                                })
                                    .then(() => {
                                        getAllCategory()
                                    })
                            }
                        })

                }
            })
    }
    const updateCategory = (categoryID) => {

        swal({
            title: "عنوان   جدید را وارد کنید"
            , content: "input"
            , buttons: "ثبت"
        }).then(resultName => {
            newTitle.title = resultName
            fetch(`http://localhost:4000/v1/category/${categoryID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorageData}`
                }
                , body: JSON.stringify(() => {
                    title: resultName

                })
            })
                .then(res => res.json())
                .then(() => {
                    swal({
                        title: "اطلاعات با موفقیت ویرایش شد",
                        icon: "success"
                        , buttons: "ok"
                    })
                        .then(() => {
                            getAllCategory()
                        })
                })

        })

    }
    return (
        <>
            <div class="home-content-edit">
                <div class="back-btn">
                    <i class="fas fa-arrow-right"></i>
                </div>
                <form class="form">
                    <div class="col-6">
                        <div class="name input">
                            <label class="input-title">عنوان</label>
                            <Input
                                type="text"
                                className=""
                                id="name"
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                ]}
                                onInputHandler={onInputHandler}
                                placeholder="لطفا عنوان دسته بندی  را وارد کنید..."
                            />
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="family input">
                            <label class="input-title">اسم دسته بندی</label>
                            <Input
                                type="text"
                                className=""
                                id="title"
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                ]}
                                onInputHandler={onInputHandler}
                                placeholder="لطفا نام دسته بندی را وارد کنید..."
                            />
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="bottom-form">
                            <div class="submit-btn">
                                <input type="submit" value="افزودن" onClick={(event) => registerNewCategory(event)} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <Table title="دسته بندی ها">
                <table class="table">
                    <thead>

                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>


                        {categories.map((user, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>
                                    <button type="button" class="btn btn-primary edit-btn" onClick={() => updateCategory(user._id)}>
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger delete-btn" onClick={() => removeHandler(user._id)}>
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
