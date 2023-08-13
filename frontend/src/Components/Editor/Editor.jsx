import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default function Editor({ value, setValue }) {
    return (

        <div className="App">
            <h2>Using CKEditor&nbsp;5 build in React</h2>
            <CKEditor
                editor={ClassicEditor}
                data={value}

                onChange={(event, editor) => {
                    const data = editor.getData();
                    setValue(data)
                    console.log({ event, editor, data });
                }}

            />
        </div>

    )
}
