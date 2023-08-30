import React, { useState, useEffect } from 'react'
import "./TIcketAnswer.css"
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
export default function TIcketAnswer() {
    const { ID } = useParams();
    const [ticketInfo, setTicketInfo] = useState({});
    console.log(ticketInfo);

    useEffect(() => {
        fetch(`http://localhost:4000/v1/tickets/answer/${ID}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))
                    }`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTicketInfo(data);
            });
    }, []);


    return (

        <div class="col-9">
            <div class="ticket">
                <div class="ticket-header">
                    <span class="ticket-header__title">همه تیکت ها</span>
                    <Link class="ticket-header__link" to="/my-account/ticket/send-ticket">
                        ارسال تیکت جدید
                    </Link>
                </div>
                <div class="ticket-top">
                    <div class="ticket-top__right">
                        <a class="ticket-top__link" href="#">
                            <i class="fa fa-angle-right ticket-top__icon"></i>
                        </a>
                    </div>
                    <div class="ticket-top__left">
                        <span class="ticket-top__title">تیکت تست</span>
                        <span class="ticket-top__text">شناسه تیکت : 2070</span>
                    </div>
                </div>
                <div class="ticket-send">
                    <div class="ticket-send__header">
                        <div class="ticket-send__header-right">
                            <div class="ticket-send__header-mic">
                                <i class="fa fa-microphone ticket-send__header-icon"></i>
                                <span class="ticket-send__header-text">0</span>
                            </div>
                            <div class="ticket-send__header-pin">
                                <i class="fa fa-paperclip ticket-send__header-icon"></i>
                                <span class="ticket-send__header-text">0</span>
                            </div>
                        </div>
                        <div class="ticket-send__header-left">
                            <i class="fa fa-bars ticket-send__header-icon-left"></i>
                        </div>
                    </div>
                    <div class="ticket-send__title">
                        <span class="ticket-send__title-text">
                            <i class="ticket-send__title-icon fa fa-plus"></i>
                            ارسال پاسخ
                        </span>
                    </div>
                    <div class="ticket-send__answer">
                        <div class="ticket-send__answer-box">
                            <p class="ticket-send__answer-text">{ticketInfo.ticket}</p>
                        </div>
                        <div class="ticket-send__answer-bottom">
                            <span class="ticket-send__answer-name ticket-send__answer-span">
                                محمد امین سعیدی راد
                            </span>
                            <span class="ticket-send__answer-date ticket-send__answer-span">
                                2022-11-29
                            </span>
                            <span class="ticket-send__answer-time ticket-send__answer-span">
                                14:28
                            </span>
                        </div>
                    </div>
                    <div class="ticket-send__title">
                        <span class="ticket-send__title-text">
                            <i class="ticket-send__title-icon fa fa-plus"></i>
                            پاسخ ها
                        </span>
                    </div>

                    {ticketInfo.answer === null ? (
                        <div className="alert alert-danger">
                            هنوز پاسخی برای تیکت ارسال نشده
                        </div>
                    ) : (
                        <div class="ticket-send__answer-user">
                            <div class="ticket-send__answer-user-box">
                                <p class="ticket-send__answer-user-text">{ticketInfo.answer}</p>
                            </div>
                            <div class="ticket-send__answer-user-bottom">
                                <span class="ticket-send__answer-user-name ticket-send__answer-user-span">
                                    محمد امین سعیدی راد
                                </span>
                                <span class="ticket-send__answer-user-date ticket-send__answer-user-span">
                                    2022-11-29
                                </span>
                                <span class="ticket-send__answer-user-time ticket-send__answer-user-span">
                                    14:28
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}
