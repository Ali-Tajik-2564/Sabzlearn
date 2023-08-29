import React, { useState, useEffect } from 'react'
import "./TicketsINfo.css"
import { Link } from 'react-router-dom';
export default function TicketsInfos() {
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:4000/v1/tickets/user`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))
                    }`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTickets(data);
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
                <div class="ticket-boxes">
                    <div class="ticket-boxes__item">
                        <img class="ticket-boxes__img img-fluid" src="/images/ticket.svg" />
                        <span class="ticket-boxes__condition">باز</span>
                        <span class="ticket-boxes__value">0</span>
                    </div>
                    <div class="ticket-boxes__item ticket-boxes__closed ticket-boxes__custom">
                        <img class="ticket-boxes__img img-fluid" src="/images/ticket.svg" />
                        <span class="ticket-boxes__condition">بسته</span>
                        <span class="ticket-boxes__value ticket-boxes__value-closed">
                            2
                        </span>
                    </div>
                    <div class="ticket-boxes__item ticket-boxes__answered ticket-boxes__custom">
                        <img class="ticket-boxes__img img-fluid" src="/images/ticket.svg" />
                        <span class="ticket-boxes__condition">پاسخ داده شده</span>
                        <span class="ticket-boxes__value ticket-boxes__value-answered">
                            1
                        </span>
                    </div>
                    <div class="ticket-boxes__item ticket-boxes__finished ticket-boxes__custom">
                        <img class="ticket-boxes__img img-fluid" src="/images/ticket.svg" />
                        <span class="ticket-boxes__condition">پایان یافته</span>
                        <span class="ticket-boxes__value ticket-boxes__value-finished">
                            1
                        </span>
                    </div>
                    <div class="ticket-boxes__item">
                        <img class="ticket-boxes__img img-fluid" src="/images/ticket.svg" />
                        <span class="ticket-boxes__condition">همه</span>
                        <span class="ticket-boxes__value">2</span>
                    </div>
                </div>
                <div class="ticket-filter">
                    <form action="#" class="ticket-filter__form">
                        <select class="ticket-filter__select">
                            <option class="ticket-filter__option" value="">
                                همه
                            </option>
                            <option class="ticket-filter__option" value="">
                                فرستاده شده
                            </option>
                            <option class="ticket-filter__option" value="">
                                دریافتی
                            </option>
                        </select>
                        <select class="ticket-filter__select">
                            <option class="ticket-filter__option" value="">
                                همه
                            </option>
                            <option class="ticket-filter__option" value="">
                                باز
                            </option>
                            <option class="ticket-filter__option" value="">
                                بسته
                            </option>
                            <option class="ticket-filter__option" value="">
                                پاسخ داده شده
                            </option>
                            <option class="ticket-filter__option" value="">
                                پایان یافته
                            </option>
                        </select>
                        <select class="ticket-filter__select">
                            <option class="ticket-filter__option" value="">
                                تاریخ پاسخ
                            </option>
                            <option class="ticket-filter__option" value="">
                                تاریخ ایجاد
                            </option>
                        </select>
                        <button class="ticket-filter__btn" type="submit">
                            اعمال
                        </button>
                    </form>
                </div>
                <div class="ticket-content">
                    <span class="ticket-content__title">نمایش 1 تیکت</span>
                    <div class="ticket-content__box">
                        <div class="ticket-content__right">
                            <div class="ticket-content__right-right">
                                <a class="ticket-content__link" href="#">
                                    عضو شدن در گروه تلگرامی دوره ریکت
                                </a>
                                <span class="ticket-content__category">
                                    <i class="fa fa-ellipsis-v ticket-content__icon"></i>
                                    پشتیبانی دوره ها
                                </span>
                            </div>
                            <div class="ticket-content__right-left">
                                <span class="ticket-content__name">محمدامین سعیدی راد</span>
                            </div>
                        </div>
                        <div class="ticket-content__left">
                            <div class="ticket-content__left-right">
                                <div class="ticket-content__condition">
                                    <span class="ticket-content__condition-text">
                                        پاسخ داده شده
                                    </span>
                                </div>
                            </div>
                            <div class="ticket-content__left-left">
                                <span class="ticket-content__time">2022/04/08</span>
                                <span class="ticket-content__time-month">8 ماه قبل</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
