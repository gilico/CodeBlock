import React from "react";
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import './TextEditorStyle.css'

const QuillEditor = ({setSummary, summary}) => {

  return(
    <div className="quill-parent">
      <ReactQuill
        placeholder="Write Your Explanation"
        modules={modules}
        formats={formats}
        onChange={(e) => setSummary(e)}
        value={summary}
        
      />
    </div>

  )
}

const modules = {
      toolbar: [
        // [{ header: [1, 2, false] }],
        [{ direction: ''}, { direction: 'rtl'}],
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        ["bold", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["code"],
      ]
}
  
const formats = [
  "direction",
  "align",
  "bold",
  "underline",
  "list",
  "bullet",
  "indent",
  "code"
]

export default QuillEditor;