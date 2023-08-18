import React, { useEffect, useState } from "react";
import Table from "../../../Components/AdminPanel/Table/Table";
import swal from "sweetalert"
import "./AdminComments.css"
export default function AdminComments() {
  const [allComments, setAllComments] = useState([])
  const localStorageData = JSON.parse(localStorage.getItem("user"))



  useEffect(() => {
    getAllComments()
  }, [])
  function getAllComments() {
    fetch("http://localhost:4000/v1/comments")
      .then(res => res.json())
      .then(result => setAllComments(result))
  }
  const watchComment = (body) => {
    swal({
      title: body,
      buttons: "ok"
    })
  }
  const acceptComment = (body, CommentId) => {

    fetch(`http://localhost:4000/v1/comments/accept/${CommentId}`, {
      method: "PUT"
      , headers: {
        "Authorization": `Bearer ${localStorageData}`
      }
      , body: JSON.stringify(body)
    })
      .then(res => {
        res.json()
        if (res.ok) {
          swal({
            title: "کامنت با موفقیت قبول شد"
            , icon: "success"
            , buttons: "ok"
          })
            .then(() => {
              getAllComments()
            })
        }
      })
  }
  const answerComment = (commentID) => {
    swal({
      title: 'پیام خود را وارد کنید'
      , content: "input"
      , buttons: "ارسال"
    })
      .then(result => {
        fetch(`http://localhost:4000/v1/comments/answer/${commentID}`, {
          method: "POST"
          , headers: {

            "Authorization": `Bearer ${localStorageData}`
          }
          , body: JSON.stringify(result)
        })
          .then(res => {
            res.json()
            if (res.ok) {
              swal({
                title: "پیام با موفقیت ارسال شد"
                , icon: "success"
                , buttons: "ok"

              })
                .then(() => {
                  getAllComments()
                })
            }
          })
      })
  }
  const banComment = (commentID, body) => {
    fetch(`http://localhost:4000/v1/comments/reject/${commentID}`, {
      method: "POST"
      , headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorageData}`
      }
      , body: JSON.stringify(body)
    })
      .then(res => {
        res.json()
        if (res.ok) {
          swal({
            title: "کامنت با موفقیت بن شد"
            , icon: "success"
            , buttons:
              "ok"
          })
            .then(() => {
              getAllComments()
            })
        }
      })
  }
  const deleteComment = (commentID) => {
    fetch(`http://localhost:4000/v1/comments/${commentID}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorageData}`
      }

    })
      .then(res => {
        res.json()
        if (res.ok) {
          swal({
            title: "کامنت با موفقیت حذف شد"
            , icon: "success"
            , buttons: "ok"
          })
            .then(() => {
              getAllComments()
            })
        }
      }
      )
  }
  return (
    <>  <Table title="کامنت ها">
      <table class="table">
        <thead>
          <tr>
            <th>شناسه</th>
            <th>عنوان</th>
            <th>دوره</th>
            <th>متن کامنت</th>
            <th>قبول کردن</th>
            <th>جواب دادن</th>
            <th>رد کردن</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {allComments.map((comment, index) => (
            <tr>
              <td className={comment.answer === 1 ? "answer" : "no-answer"}>{index + 1}</td>
              <td>{comment.creator ? comment.creator.name : "?"}</td>
              <td>{comment.course}</td>

              <td>
                <button type="button" class="btn btn-primary edit-btn" onClick={() => watchComment(comment.body)}>
                  مشاهده جواب
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-primary edit-btn" onClick={() => acceptComment(comment.body, comment._id)}>
                  قبول کردن
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-primary edit-btn" onClick={() => answerComment(comment._id)}>
                  پاسخ
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger delete-btn" onClick={() => banComment(comment._id, comment.body)}>
                  بن
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger delete-btn" onClick={() => deleteComment(comment._id)}>
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Table></>
  )
}
