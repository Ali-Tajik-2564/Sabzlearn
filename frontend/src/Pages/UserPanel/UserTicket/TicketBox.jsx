import React from 'react'

export default function TicketBox(props) {
    return (
        <div class="ticket-content">
            <span class="ticket-content__title">{props.title}</span>
            <div class="ticket-content__box">
                <div class="ticket-content__right">
                    <div class="ticket-content__right-right">
                        <a class="ticket-content__link" href="#">
                            {props.departmentSubID}
                        </a>
                        <span class="ticket-content__category">
                            <i class="fa fa-ellipsis-v ticket-content__icon"></i>
                            {props.departmentID}
                        </span>
                    </div>
                    <div class="ticket-content__right-left">
                        <span class="ticket-content__name">{props.user}</span>
                    </div>
                </div>
                <div class="ticket-content__left">
                    <div class="ticket-content__left-right">
                        <div class={`ticket-content__condition ${props.answer === 0 ? "condition-text-not-answer" : ""}`}>
                            <span class={`ticket-content__condition-text `}>
                                {
                                    props.answer === 0 ? "پاسخ داده نشده" : "پاسخ داده شده"
                                }
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
    )
}
