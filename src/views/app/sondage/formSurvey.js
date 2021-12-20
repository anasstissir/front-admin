import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle,
    CustomInput
} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import DropzoneExample from "../../../containers/forms/DropzoneExample";
import RadioButtonsGroup from "./radio";
import Switches from "./switch";
import { FormikDatePicker } from "../../../containers/form-validations/FormikFields";
import SurveyItem from './surveyItem'
import moment from "moment";

const SignupSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Write at least 3 caracteres")
        .required("Title is required!"),
});

const options = [
    { value: "top", label: "En haut" },
    { value: "bottom", label: "En bas" }
]

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const questionByIndex = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10']

const arrayBuilder = (len) => {
    let arr = [];

    for (var i = 1; i <= len; i++) {
        arr.push(i);
    }

    return arr;
}

const formatPages = (pagesObject, surveyNumber) => {
    let questions = [];
    for (let i = 0; i < surveyNumber; i++) {
        let j = i + 1
        let obj = pagesObject['question' + j]
        switch (obj.type) {
            case 'text':
                let txtObject = {
                    type: 'text',
                    title: obj.question,
                    correctAnswer: obj.answer
                }
                questions.push(txtObject);
                break
            case 'radiogroup':
                let radioObject = {
                    type: 'radiogroup',
                    title: obj.question,
                    correctAnswer: "",
                    choices: obj.choices
                }
                questions.push(radioObject);
                break
            case 'dropdown':
                let selectObject = {
                    type: 'dropdown',
                    title: obj.question,
                    correctAnswer: "",
                    choices: obj.choices
                }
                questions.push(selectObject);
                break
            case 'matrix':
                let matrixObject = {
                    type: 'matrix',
                    title: obj.question,
                    correctAnswer: "",
                    rows: obj.choices.row.map(item => ({ value: item, text: item })),
                    columns: obj.choices.column.map(item => ({ value: item, text: item }))
                }
                questions.push(matrixObject);
                break
            case 'imagepicker':
                let imgObject = {
                    type: 'imagepicker',
                    title: obj.question,
                    name: "choosepicture",
                    choices: obj.choices,
                }
                questions.push(imgObject);
                break
        }

    }

    return questions;

}

class FormikCustomWithTopLabels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: {}
        }
    }

    componentDidMount() {
        if (this.props.editable && this.props.toEdit && this.props.toEdit.pages) {
            this.setState({
                pages:
                    this.props.toEdit.pages.map((item, index) => {
                        return { 
                            key: `question${(index + 1)}`, 
                            question: item.questions[0].title, 
                            type: item.questions[0].type ,
                            numberItems: item.questions[0].choices ? item.questions[0].choices.length : 0,
                            choices: item.questions[0].choices
                        }
                    }
                    ).reduce(function (obj, item) {
                        obj[item.key] = { ...item };
                        return obj;
                    }, {})

            })

        }

    }

    handleSubmit = (values) => {
        let payload = {
            name: values.name,
            title: values.title,
            content: values.content,
            showProgressBar: values.showProgressBar,
            goNextPageAutomatic: values.goNextPageAutomatic,
            showNavigationButtons: values.showNavigationButtons,
            startDateTime: values.startDateTime,
            endDateTime: values.endDateTime,
            pages: [{ questions: formatPages(values.pages, values.surveynumber) }]
        }
        if(this.props.editable){

            this.props.edit({...payload, id: this.props.toEdit['id']})
        }else{
            this.props.add(payload)
        }

    };

    handleFileAdded = (file) => {
    }


    render() {
        return (
            <div>
                <Row className="mb-4">
                    <Colxx xxs="12">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <IntlMessages id="menu.add" />
                                </CardTitle>

                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        name: this.props.editable && this.props.toEdit ? this.props.toEdit.name : "",
                                        title: this.props.editable && this.props.toEdit ? this.props.toEdit.title : "",
                                        content: this.props.editable && this.props.toEdit ? this.props.toEdit.content : "",
                                        link: this.props.editable && this.props.toEdit ? this.props.toEdit.url : null,
                                        showProgressBar: this.props.editable && this.props.toEdit ? this.props.toEdit.showProgressBar : 'top',
                                        startDateTime: this.props.editable && this.props.toEdit ? moment(this.props.toEdit.startDateTime) : '',
                                        endDateTime: this.props.editable && this.props.toEdit ? moment(this.props.toEdit.endDateTime) : '',
                                        goNextPageAutomatic: this.props.editable && this.props.toEdit ? this.props.toEdit.goNextPageAutomatic : true,
                                        showNavigationButtons: this.props.editable && this.props.toEdit ? this.props.toEdit.showNavigationButtons : false,
                                        surveynumber: this.props.editable && this.props.toEdit && this.props.toEdit.pages ? this.props.toEdit.pages.length : 1,
                                        pages: this.props.editable && this.props.toEdit && this.props.toEdit.pages ? this.state.pages : {}
                                    }
                                    }
                                    validationSchema={SignupSchema}
                                    onSubmit={this.handleSubmit}
                                >
                                    {({
                                        setFieldValue,
                                        setFieldTouched,
                                        handleChange,
                                        handleBlur,
                                        values,
                                        errors,
                                        touched,

                                    }) => (
                                        <Form className="av-tooltip tooltip-label-bottom">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="forms.name" />
                                                </Label>
                                                <Field className="form-control" name="name" />
                                                {errors.name && touched.name ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.name}
                                                    </div>
                                                ) : null}
                                            </FormGroup>
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="forms.title" />
                                                </Label>
                                                <Field className="form-control" name="title" />
                                                {errors.title && touched.title ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.title}
                                                    </div>
                                                ) : null}
                                            </FormGroup>
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="forms.content" />
                                                </Label>
                                                <Field className="form-control" name="content" component="textarea" />
                                                {errors.content && touched.content ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.content}
                                                    </div>
                                                ) : null}
                                            </FormGroup>
                                            <Row>
                                                <Colxx sm="6">
                                                    <FormGroup>
                                                        <Label>
                                                            <IntlMessages id="forms.progressbar" />
                                                        </Label>
                                                        <RadioButtonsGroup
                                                            options={options}
                                                            name="showProgressBar"
                                                            onChange={setFieldValue}
                                                            value={values.showProgressBar}
                                                        />
                                                        {errors.showProgressBar && touched.showProgressBar ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.showProgressBar}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </Colxx>
                                                <Colxx sm="6">
                                                    <Label>
                                                        <IntlMessages id="forms.otheroption" />
                                                    </Label>
                                                    <Switches
                                                        name="goNextPageAutomatic"
                                                        onChange={setFieldValue}
                                                        value={values.goNextPageAutomatic}
                                                        label="Naviguer automatiquement à la page suivante"
                                                    />
                                                    <Switches
                                                        name="showNavigationButtons"
                                                        onChange={setFieldValue}
                                                        value={values.showNavigationButtons}
                                                        label="Afficher les buttons de navigations"
                                                    />
                                                    {errors.otheroption && touched.otheroption ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.otheroption}
                                                        </div>
                                                    ) : null}
                                                </Colxx>
                                            </Row>
                                            <Row>
                                                <Colxx sm="6">
                                                    <FormGroup className="form-group has-float-label">
                                                        <Label className="d-block">
                                                            <IntlMessages id="form-components.start-time" />
                                                        </Label>
                                                        <FormikDatePicker
                                                            name="startDateTime"
                                                            id="startDateTime"
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                            value={values.startDateTime}
                                                            showTimeSelect
                                                            timeFormat="HH:mm"
                                                            timeIntervals={15}
                                                            dateFormat="LLL"
                                                            timeCaption="Time" />
                                                        {errors.startDateTime && touched.startDateTime ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.startDateTime}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </Colxx>
                                                <Colxx sm="6">
                                                    <FormGroup className="form-group has-float-label">
                                                        <Label className="d-block">
                                                            <IntlMessages id="form-components.end-time" />
                                                        </Label>
                                                        <FormikDatePicker
                                                            name="endDateTime"
                                                            id="endDateTime"
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                            value={values.endDateTime}
                                                            showTimeSelect
                                                            timeFormat="HH:mm"
                                                            timeIntervals={15}
                                                            dateFormat="LLL"
                                                            timeCaption="Time" />
                                                        {errors.endDateTime && touched.endDateTime ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.endDateTime}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </Colxx>
                                            </Row>

                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="forms.surveynumber" />
                                                </Label>
                                                <select
                                                    name="surveynumber"
                                                    className="form-control"
                                                    value={values.surveynumber}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    {numbers.map(item =>
                                                        <option key={item} value={item}>{item}</option>
                                                    )}
                                                </select>
                                                {errors.surveynumber && touched.surveynumber ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.surveynumber}
                                                    </div>
                                                ) : null}
                                            </FormGroup>
                                            {
                                                arrayBuilder(values.surveynumber).map(item => {
                                                    return (
                                                        <SurveyItem
                                                            token={this.props.token}
                                                            numberQuestion={item}
                                                            setFieldValue={setFieldValue}
                                                            setFieldTouched={setFieldTouched}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            values={values}
                                                            errors={errors}
                                                            touched={touched}
                                                        />
                                                    )
                                                })
                                            }
                                            <Button color="primary" type="submit">
                                                <IntlMessages id="forms.add" />
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>
            </div>
        );
    }
}
export default FormikCustomWithTopLabels;
