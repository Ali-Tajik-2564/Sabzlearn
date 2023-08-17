import React, { useEffect, useState } from 'react'
import Table from '../../../Components/AdminPanel/Table/Table'
import swal from 'sweetalert'
import "./AdminContact.css"
export default function AdminContact() {
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        getAllContacts()
    }, [])
    function getAllContacts() {
        fetch("http://localhost:4000/v1/contact")
            .then(res => res.json())
            .then(allContants => {
                console.log(allContants
                );
                setContacts(allContants)
            })
    }
    const showContactBody = (body) => {
        swal({
            title: body,
            buttons: "ok"
        })
    }
    const answerContact = (ContactEmail) => {
        swal({
            title: "پیغام خود را وارد کنید",
            content: "input",
            buttons: "ارسال ایمیل"

        })
            .then((result) => {
                const answerInfo = {
                    email: ContactEmail,
                    answer: result
                }
                fetch("http://localhost:4000/v1/contact/answer", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorageData}`
                    }
                    , body: JSON.stringify(answerInfo)
                })
                    .then(res => {
                        if (res.ok) {
                            console.log(res);
                        }
                    })
                    .then(result => {
                        swal({
                            title: "ایمیل با موفقیت ارسال شد"
                            , icon: "success",
                            buttons: "ok"
                        })
                        getAllContacts()
                    })

            })
    }
    const removeContact = (ContactID) => {
        swal({
            title: "ایا از  حذف اطمینان دارید؟"
            , icon: "warning",
            buttons: ["نه", "اره"]
        })
            .then(result => {
                if (result) {
                    fetch(`http://localhost:4000/v1/contact/${ContactID}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${localStorageData}`
                        }
                    })
                        .then(res => {
                            if (res.ok) {
                                console.log(res);
                            }

                        })
                        .then(result => {
                            swal({
                                title: "با موفقیت پیغام حذف شد"
                                , icon: "success"
                                , buttons: "ok"
                            })
                                .then(() => {
                                    getAllContacts()
                                })
                        })
                }
            })
    }
    return (
        <>

            <Table title=" پیغام ها">
                <table class="table">
                    <thead>

                        <tr>
                            <th >شناسه</th>
                            <th>عنوان</th>
                            <th>ایمیل </th>
                            <th>شماره تماس</th>
                            <th>مشاهده</th>
                            <th>پاسخ</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>


                        {contacts.map((contact, index) => (
                            <tr>
                                <td className={contact.answer === 1 ? "answer" : "no-answer"}>{index + 1}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>

                                <td>
                                    <button type="button" class="btn btn-primary edit-btn" onClick={() => showContactBody(contact.body)}>
                                        مشاهده
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-primary edit-btn" onClick={() => answerContact(contact.email)}>
                                        پاسخ
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger delete-btn" onClick={() => removeContact(contact._id)} >
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
