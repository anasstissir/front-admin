import React, { Component } from "react";


import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import 'react-quill/dist/quill.bubble.css';

const quillModules = {
    toolbar: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
        ],
        ["link", "image"],
        ["clean"]
    ]
};

const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
];

export default class EditorsUi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textQuillStandart: "",
        };
    }

    handleChangeQuillStandart = (text) => {
        this.props.onChange(this.props.name, text)
    }

    render() {
        return (
            <ReactQuill
                theme="snow"
                value={this.props.value}
                onChange={this.handleChangeQuillStandart}
                modules={quillModules}
                formats={quillFormats} />

        );
    }
}
