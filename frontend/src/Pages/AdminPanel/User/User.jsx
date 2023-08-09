import React, { useEffect, useState } from 'react'
import "./User.css"
import Table from '../../../Components/AdminPanel/Table/Table'
import Pagination from "../../../Components/Pagination/Pagination"
import swal from 'sweetalert'
import Input from "./../../../Components/Form/Input/Input"
import { useForm } from "./../../../hooks/useForm";
import {
    requiredValidator,
    minValidator,
    maxValidator,
    emailValidator,
} from "../../../Validator/rules";



export default function User() {
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const [allUsers, setAllUsers] = useState([])
    const [shownUsers, setShownUsers] = useState([])
    const [users, setUsers] = useState([]);
    const [formState, onInputHandler] = useForm(
        {
            name: {
                value: "",
                isValid: false,
            },
            username: {
                value: "",
                isValid: false,
            },
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
            phone: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        fetch("http://localhost:4000/v1/users", {
            headers: {
                "Authorization": `Bearer ${localStorageData}`
            }
        })
            .then(res => res.json())
            .then(result => {
                setAllUsers(result)
                console.log(result);

            })
    }, [shownUsers])

    const removeHandler = (userId) => {
        swal({
            title: "ایا از حذف اطمینان دارید؟"
            , icon: "warning"
            , buttons: ["نه", "اره"]
        })
            .then(result => {
                if (result) {
                    fetch(`http://localhost:4000/v1/users/${userId}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${localStorageData}`
                        }
                    })
                }
            })
            .then(res => {

                swal({
                    title: "کاربر با موفقیت حذف شد",
                    icon: "success",
                    button: "اوکی"
                })
                    .then(() => {
                        console.log(allUsers);
                    })

            })

    }
    const banHAndler = (userID) => {
        swal({
            title: "ایا از حذف اطمینان دارید؟"
            , icon: "warning"
            , buttons: ["نه", "اره"]
        })
            .then(result => {
                if (result) {
                    fetch(`http://localhost:4000/v1/users/ban/${userId}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${localStorageData}`
                        }
                    })
                }
            })
            .then(res => {
                if (res.ok) {
                    swal({
                        title: "کاربر با موفقیت حذف شد",
                        icon: "success",
                        button: "اوکی"
                    })
                        .then(() => {
                            console.log(allUsers);
                        })
                }
            })
    }
    const registerNewUser = (event) => {
        event.preventDefault();
        const newUserInfo = {
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            confirmPassword: formState.inputs.password.value,
            name: `${formState.inputs.name.value}`,
            phone: formState.inputs.phone.value,
        };

        fetch('http://localhost:4000/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserInfo)
        }).then(res => {
            console.log(res);
            res.json()
        }).then(result => {
            console.log(result);

        })
    };

    return (
        <>
            <div class="home-content-edit">
                <div class="back-btn">
                    <i class="fas fa-arrow-right"></i>
                </div>
                <form class="form">
                    <div class="col-6">
                        <div class="name input">
                            <label class="input-title">نام و نام خانوادگی</label>
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
                                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
                            />
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="family input">
                            <label class="input-title">نام کاربری</label>
                            <Input
                                type="text"
                                className=""
                                id="username"
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                ]}
                                onInputHandler={onInputHandler}
                                placeholder="لطفا نام کاربری را وارد کنید..."
                            />
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="email input">
                            <label class="input-title">ایمیل</label>
                            <Input
                                type="text"
                                className=""
                                id="email"
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                    emailValidator(),
                                ]}
                                onInputHandler={onInputHandler}
                                placeholder="لطفا ایمیل کاربر را وارد کنید..."
                            />
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="password input">
                            <label class="input-title">رمز عبور</label>
                            <Input
                                type="text"
                                className=""
                                id="password"
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                ]}
                                onInputHandler={onInputHandler}
                                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
                            />
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="phone input">
                            <label class="input-title">شماره تلفن</label>
                            <Input
                                type="text"
                                className=""
                                id="phone"
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                ]}
                                onInputHandler={onInputHandler}
                                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
                            />
                            <span class="error-message text-danger"></span>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="bottom-form">
                            <div class="submit-btn">
                                <input type="submit" value="افزودن" onClick={(event) => registerNewUser(event)} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <Table title=" کاربران">
                <table class="table">
                    <thead>

                        <tr>
                            <th>شناسه</th>
                            {/* <th>نام</th> */}
                            <th>نام خانوادگی</th>
                            <th>شماره</th>
                            <th>ایمیل</th>
                            {/* <th>رمز عبور</th> */}
                            <th>ویرایش</th>
                            <th>حذف</th>
                            <th>بن</th>
                        </tr>
                    </thead>
                    <tbody>


                        {shownUsers.map((user, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                {/* <td>{user.username}</td> */}
                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                {/* <td>{user.password}</td> */}
                                <td>
                                    <button type="button" class="btn btn-primary edit-btn">
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger delete-btn" onClick={() => removeHandler(user._id)}>
                                        حذف
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger delete-btn" onClick={() => banHAndler(user._Id)}>
                                        بن
                                    </button>
                                </td>
                            </tr>
                        ))}





                    </tbody>
                </table>

            </Table>
            <Pagination pathname="/admin-panel/user" itemCount={8} items={allUsers} setShownCourses={setShownUsers} />
        </>
    )
}
