import React from "react";
import { Link } from "react-router-dom";

export default function UserBox({ title, href }) {
    return (
        <div class="col-4">
            <Link to={href} class="main__link" href="#">
                {title}
            </Link>
        </div>
    );
}
