import React, { useEffect, useState } from 'react'
import Table from '../../../Components/AdminPanel/Table/Table';
import swal from 'sweetalert';
export default function AdminTicket() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/v1/tickets`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))
                    }`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setTickets(data);
            });
    }, []);
    const showTicket = (body) => {
        swal({
            title: body,
            buttons: "ok"
        })
    }
    return (
        <>
            <Table title="تیکت‌ها">
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>کاربر</th>
                            <th>عنوان</th>
                            <th>نوع تیکت</th>
                            <th>دوره</th>
                            <th>اولویت</th>
                            <th>مشاهده</th>
                            <th>پاسخ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket, index) => (
                            <tr key={ticket._id}>
                                <td>{index + 1}</td>
                                <td>{ticket.user}</td>
                                <td>{ticket.title}</td>
                                <td>{ticket.departmentSubID}</td>
                                <td>{ticket.course ? ticket.course : "---"}</td>
                                <td>
                                    {ticket.priority === 1 && "بالا"}
                                    {ticket.priority === 2 && "متوسط"}
                                    {ticket.priority === 3 && "کم"}
                                </td>
                                <td>
                                    <button type="button" class="btn btn-primary edit-btn" onClick={() => showTicket(ticket.body)}>
                                        مشاهده
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-primary edit-btn">
                                        پاسخ
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
