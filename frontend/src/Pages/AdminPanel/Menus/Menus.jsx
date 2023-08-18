import React, { useEffect, useState } from "react";
import Table from "../../../Components/AdminPanel/Table/Table";
import swal from "sweetalert"
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input/Input";
import { minValidator } from "../../../Validator/rules";
export default function Menus() {
    const [menus, setMenus] = useState([]);
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const [menuParent, setMenuParent] = useState("-1");

    const [formState, onInputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            href: {
                value: "",
                isValid: false,
            },
        },
        false
    );



    useEffect(() => {
        getAllMenu()
    }, []);

    function getAllMenu() {
        fetch("http://localhost:4000/v1/menus/all")
            .then((res) => res.json())
            .then((allMenus) => setMenus(allMenus));
    }
    const removeMenu = (menuID) => {
        swal({
            title: "ایا از حذف اطمینان دارید؟"
            , icon: "warning"
            , buttons: ["نه", "اره"]
        })
            .then(result => {
                if (result) {
                    fetch(`http://localhost:4000/v1/menus/${menuID}`, {
                        method: "DELETE"
                        , headers: {
                            "Authorization": `Bearer ${localStorageData}`
                        }
                    })
                        .then(res => {
                            res.json()
                            if (res.ok) {
                                swal({
                                    title: "منو با موفقیت حذف شد"
                                    , icon: "success"
                                    , buttons: "ok"
                                })
                                    .then(() => {
                                        getAllMenu()
                                    })
                            }

                        })

                }
            })
    }
    const createMenu = (event) => {
        event.preventDefault();
        let newMenu = {
            title: formState.inputs.title.value,
            href: formState.inputs.href.value,
            title: menuParent
        }
        fetch("http://localhost:4000/v1/menus/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorageData}`
            }
            , body: JSON.stringify(newMenu)
        })
            .then(res => {
                res.json()
                if (res.ok) {
                    swal({
                        title: "منو جدید با موفقیت ثبت شد"
                        , icon: "success"
                        , buttons: "ok"
                    })
                        .then(() => {
                            getAllMenu()
                        })
                }

            })

    };


    return (
        <>
            <div class="container">
                <div class="home-title">
                    <span>افزودن منو جدید</span>
                </div>
                <form class="form">
                    <div class="col-6">
                        <div class="name input">
                            <label class="input-title">عنوان</label>
                            <Input
                                element="input"
                                onInputHandler={onInputHandler}
                                id="title"
                                type="text"
                                isValid="false"
                                placeholder="لطفا عنوان را وارد کنید..."
                                validations={[minValidator(5)]}
                            />
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="name input">
                            <label class="input-title">href</label>
                            <Input
                                element="input"
                                onInputHandler={onInputHandler}
                                id="href"
                                type="text"
                                isValid="false"
                                validations={[minValidator(5)]}
                                placeholder="لطفا عنوان را وارد کنید..."
                            />
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="name input">
                            <label class="input-title">منو اصلی</label>
                            <select
                                class="select"
                                onChange={(event) => setMenuParent(event.target.value)}
                            >
                                <option value="-1">منوی اصلی را انتخاب کنید</option>
                                {menus.map((menu) => (
                                    <>
                                        {!Boolean(menu.parent) && (
                                            <option value={menu._id}>{menu.title}</option>
                                        )}
                                    </>
                                ))}
                            </select>
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="bottom-form">
                            <div class="submit-btn">
                                <input type="submit" value="افزودن" onClick={createMenu} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <Table title="منوها">
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>مقصد</th>
                            <th>فرزند ...</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map((menu, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{menu.title}</td>
                                <td>{menu.href}</td>
                                <td>{menu.parent ? menu.parent.title : (<i className="fa fa-check"></i>)}</td>
                                <td>
                                    <button type="button" class="btn btn-primary edit-btn">
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger delete-btn" onClick={() => removeMenu(menu._id)}>
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Table>
        </>
    );
}
