import React, { useEffect, useState } from "react";
import Table from "../../../Components/AdminPanel/Table/Table";

export default function Menus() {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/v1/menus/all")
            .then((res) => res.json())
            .then((allMenus) => setMenus(allMenus));
    }, []);

    return (
        <>
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
                                    <button type="button" class="btn btn-danger delete-btn">
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
