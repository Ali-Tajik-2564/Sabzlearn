import React, { useState, useEffect } from 'react'
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input/Input";
import Table from '../../../Components/AdminPanel/Table/Table';
import {
    requiredValidator,
    minValidator,
    maxValidator,
} from "./../../../Validator/rules";
import swal from 'sweetalert';
import "./Offs.css"
export default function Offs() {
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const [allCourses, setAllCourses] = useState([])
    const [Offs, setOffs] = useState([])
    const [courseID, setCourseID] = useState("-1")
    const [formState, onInputHandler] = useForm(
        {
            name: {
                value: "",
                isValid: false,
            },
            discount: {
                value: "",
                isValid: false,
            },
            use: {
                value: "",
                isValid: false,
            },

        },
        false
    );
    useEffect(() => {
        getAllCourses()
        getAllOffs()
    }, [])
    function getAllCourses() {
        fetch("http://localhost:4000/v1/courses")
            .then(res => res.json())
            .then(result => setAllCourses(result))
    }
    function getAllOffs() {
        fetch("http://localhost:4000/v1/offs", {
            headers: {
                "Authorization": `Bearer ${localStorageData}`
            }
        })
            .then(res => res.json())
            .then(result => setOffs(result))
    }
    const selectCourses = (event) => {
        setCourseID(event.target.value)

    }
    const addNewOff = (event) => {
        event.preventDefault()
        const newOffInfo = {
            code: formState.inputs.name.value,
            percent: formState.inputs.discount.value,
            max: formState.inputs.use.value
            , course: courseID
        }

        fetch("http://localhost:4000/v1/offs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                , "Authorization": `Bearer ${localStorageData}`
            }
            , body: JSON.stringify(newOffInfo)
        })
            .then(res => {
                res.json()
                if (res.ok) {
                    swal({
                        title: "تخفیف شما با موفقیت ثبت شد"
                        , icon: "success"
                        , buttons: "ok"
                    })
                        .then(() => {
                            getAllOffs()
                        })
                }
            })

    }
    return (
        <>
            <div class="container-fluid" id="home-content">

                <div class="container">
                    <div class="home-title">
                        <span>افزودن تخفیف جدید</span>
                    </div>
                    <form class="form">
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">نام تخفیف</label>
                                <Input
                                    id="name"
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    validations={[requiredValidator(), minValidator(5)]}
                                    type="text"
                                    placeholder="لطفا نام تخفیف را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="number input">
                                <label class="input-title">مقدار درصد تخفیف</label>
                                <Input
                                    id="discount"
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    validations={[requiredValidator()]}
                                    type="text"
                                    isValid="false"
                                    placeholder="لطفا مقدار در صد تخفیف را وارد کنید"
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">حداکثر مقدا استفاده </label>
                                <Input
                                    id="use"
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    validations={[requiredValidator()]}
                                    type="text"
                                    isValid="false"
                                    placeholder="حداکثر دفعات استفاده را وارد کنید"
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="number input">
                                <label class="input-title"> دوره مورد نظر</label>
                                <select onChange={selectCourses}>
                                    <option value="-1">دوره مورد نظر را انتخاب کنید</option>
                                    {allCourses.map((courses) => (
                                        <option value={courses._id}>{courses.name}</option>
                                    ))}
                                </select>
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="bottom-form">

                                <div class="submit-btn">
                                    <input type="submit" value="افزودن" onClick={addNewOff} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


            <Table title=" تخفیف ها">
                <table class="table">
                    <thead>

                        <tr>
                            <th>شناسه</th>

                            <th>کد</th>
                            <th>حداکثر استفاده</th>
                            <th>درصد تخفیف</th>
                            <th>دوره</th>

                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>


                        {Offs.map((off, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{off.code}</td>

                                <td>{off.percent}</td>
                                <td>{off.max}</td>
                                <td>{off.course}</td>

                                <td>
                                    <button type="button" class="btn btn-danger delete-btn"  >
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
