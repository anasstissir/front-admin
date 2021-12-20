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
    CustomInput,
    Input
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
import { Switch } from "react-router";
import Col from "reactstrap/lib/Col";
import axios from 'axios'
import { urlPath } from '../../../constants/defaultValues'


const optionSurvey = [
    { label: 'Zone de text', type: 'text' },
    { label: 'Des bouttons radios', type: 'radiogroup' },
    { label: 'Select list', type: 'dropdown' },
    { label: 'List d\'image', type: 'imagepicker' },
    { label: 'Matrice', type: 'matrix' }
]

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const arrayBuilder = (len = 1) => {
    let arr = [];

    for (var i = 1; i <= len; i++) {
        arr.push(i);
    }

    return arr;
}

const handleChangeOfImageList = (event, index, props) => {
    let bodyFormData = new FormData();
    bodyFormData.append('files', event.target.files[0])
    axios.defaults.headers.common['Authorization'] = props.token;
    axios.post(urlPath + '/api/documents/multiplefiles', bodyFormData, { "Content-Type": "multipart/form-data" }).then(res => {
        props.setFieldValue(`pages.question${props.numberQuestion}.choices.${index}.imageLink`, res.data[0])
    }).catch(error => console.log(error))
}

const RenderInputText = props => {
    return (
        <FormGroup className="form-group has-float-label">
            <Label>
                <IntlMessages id="forms.answer" />
            </Label>
            <Field
                className="form-control"
                name={`pages.question${props.numberQuestion}.answer`}
                value={props.values.pages['question' + props.numberQuestion] &&
                    props.values.pages['question' + props.numberQuestion].answer}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
            />
        </FormGroup>
    )
}

const RenderRadio = props => {
    return (
        <>

            <FormGroup className="form-group has-float-label">
                <Label>
                    <IntlMessages id="forms.numberRadio" />
                </Label>
                <select
                    name={`pages.question${props.numberQuestion}.numberItems`}
                    className="form-control"
                    value={props.values.pages['question' + props.numberQuestion].numberItems}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}

                >
                    {numbers.map((item) =>
                        <option key={item} value={item}>{item}</option>
                    )}
                </select>
            </FormGroup>
            <Row>
                {
                    arrayBuilder(props.values.pages['question' + props.numberQuestion].numberItems).map((item, index) => {
                        return (

                            <Colxx sm="4">
                                <FormGroup className="form-group has-float-label">
                                    <Label>
                                        <IntlMessages id="forms.radioText" />
                                    </Label>
                                    <Field
                                        className="form-control"
                                        name={`pages.question${props.numberQuestion}.choices.${index}`}
                                        value={props.values.pages['question' + props.numberQuestion] &&
                                            props.values.pages['question' + props.numberQuestion].choices &&
                                            props.values.pages['question' + props.numberQuestion].choices[index]}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </FormGroup>
                            </Colxx>
                        )
                    })
                }
            </Row>
        </>
    )
}

const RenderMatrix = props => {
    return (
        <>
            <Row>
                <Colxx xss="12" sm="6">
                    <FormGroup className="form-group has-float-label">
                        <Label>
                            <IntlMessages id="forms.numberRow" />
                        </Label>
                        <select
                            name={`pages.question${props.numberQuestion}.numberRows`}
                            className="form-control"
                            value={props.values.pages['question' + props.numberQuestion].numberRows}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}

                        >
                            {numbers.map((item) =>
                                <option key={item} value={item}>{item}</option>
                            )}
                        </select>
                    </FormGroup>
                </Colxx>
                <Colxx xss="12" sm="6">
                    <FormGroup className="form-group has-float-label">
                        <Label>
                            <IntlMessages id="forms.numberColumn" />
                        </Label>
                        <select
                            name={`pages.question${props.numberQuestion}.numberColumn`}
                            className="form-control"
                            value={props.values.pages['question' + props.numberQuestion].numberColumn}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}

                        >
                            {numbers.map((item) =>
                                <option key={item} value={item}>{item}</option>
                            )}
                        </select>
                    </FormGroup>
                </Colxx>
            </Row>
            <Row>
                <Colxx sm="6" xss="12">
                    {
                        arrayBuilder(props.values.pages['question' + props.numberQuestion].numberRows).map((item, index) => {
                            return (

                                <Colxx sm="6">
                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                            <IntlMessages id="forms.rowTxt" />
                                        </Label>
                                        <Field
                                            className="form-control"
                                            name={`pages.question${props.numberQuestion}.choices.row.${index}`}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </FormGroup>
                                </Colxx>
                            )
                        })
                    }
                </Colxx>
                <Colxx sm="6" xss="12">
                    {
                        arrayBuilder(props.values.pages['question' + props.numberQuestion].numberColumn).map((item, index) => {
                            return (

                                <Colxx sm="6">
                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                            <IntlMessages id="forms.colTxt" />
                                        </Label>
                                        <Field
                                            className="form-control"
                                            name={`pages.question${props.numberQuestion}.choices.column.${index}`}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </FormGroup>
                                </Colxx>
                            )
                        })
                    }
                </Colxx>

            </Row>
        </>
    )
}

const RenderImgList = props => {
    return (
        <>

            <FormGroup className="form-group has-float-label">
                <Label>
                    <IntlMessages id="forms.numberImage" />
                </Label>
                <select
                    name={`pages.question${props.numberQuestion}.numberItems`}
                    className="form-control"
                    value={props.values.pages['question' + props.numberQuestion].numberItems}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}

                >
                    {numbers.map((item) =>
                        <option key={item} value={item}>{item}</option>
                    )}
                </select>
            </FormGroup>
            <Row>
                {
                    arrayBuilder(props.values.pages['question' + props.numberQuestion].numberItems).map((item, index) => {
                        return (
                            <>
                                <Colxx sm="6">
                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                            <IntlMessages id="forms.imgInput" />
                                        </Label>
                                        <Input
                                            className="form-control flex-grow-1"
                                            type="file"
                                            name={`pages.question${props.numberQuestion}.choices.${index}.imageLink`}
                                            onChange={(e) => handleChangeOfImageList(e, index, props)}
                                        />
                                    </FormGroup>
                                </Colxx>
                                <Colxx sm="6">
                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                            <IntlMessages id="forms.imgValue" />
                                        </Label>
                                        <Field
                                            className="form-control"
                                            name={`pages.question${props.numberQuestion}.choices.${index}.value`}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </FormGroup>
                                </Colxx>
                            </>
                        )
                    })
                }
            </Row>
        </>
    )
}


const renderSwitch = (
    number,
    token,
    type,
    setFieldValue,
    setFieldTouched,
    handleChange,
    handleBlur,
    values,
    errors,
    touched) => {
    switch (type) {
        case 'radiogroup':
            return <RenderRadio
                numberQuestion={number}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
                touched={touched} />
        case 'dropdown':
            return <RenderRadio
                numberQuestion={number}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
                touched={touched} />
        case 'imagepicker':
            return <RenderImgList
                numberQuestion={number}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                token={token}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
                touched={touched} />
        case 'matrix':
            return <RenderMatrix
                numberQuestion={number}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
                touched={touched} />
        default:
            return <RenderInputText
                numberQuestion={number}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
                touched={touched} />
    }
}

class SurveyItem extends Component {
    constructor(props) {
        super(props);
    }




    render() {
        return (
            <div>
                <Formik
                >
                    <Row className="mb-4">
                        <Colxx xxs="12">
                            <Card>
                                <CardTitle>
                                    {this.props.numberQuestion}
                                </CardTitle>
                                <CardBody>
                                    <Row>
                                        <Colxx sm="6">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="forms.question" />
                                                </Label>
                                                <Field
                                                    className="form-control"
                                                    name={"pages.question" + this.props.numberQuestion + '.question'}
                                                    value={this.props.values.pages['question' + this.props.numberQuestion] &&
                                                        this.props.values.pages['question' + this.props.numberQuestion].question}
                                                    onChange={this.props.handleChange}
                                                    onBlur={this.props.handleBlur}
                                                />
                                            </FormGroup>
                                        </Colxx>
                                        <Colxx sm="6">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="forms.typeSurvey" />
                                                </Label>
                                                <select
                                                    name={`pages.question${this.props.numberQuestion}.type`}
                                                    className="form-control"
                                                    value={this.props.values.pages['question' + this.props.numberQuestion] &&
                                                        this.props.values.pages['question' + this.props.numberQuestion].type}
                                                    onChange={this.props.handleChange}
                                                    onBlur={this.props.handleBlur}
                                                >
                                                    <option disabled selected>Type de reponse</option>
                                                    {optionSurvey.map(item =>
                                                        <option key={item.type} value={item.type}>{item.label}</option>
                                                    )}
                                                </select>
                                            </FormGroup>
                                        </Colxx>
                                    </Row>
                                    <Row>
                                        <Colxx sm="12">
                                            {this.props.values.pages['question' + this.props.numberQuestion] &&
                                                renderSwitch(
                                                    this.props.numberQuestion,
                                                    this.props.token,
                                                    this.props.values.pages['question' + this.props.numberQuestion].type,
                                                    this.props.setFieldValue,
                                                    this.props.setFieldTouched,
                                                    this.props.handleChange,
                                                    this.props.handleBlur,
                                                    this.props.values,
                                                    this.props.errors,
                                                    this.props.touched)}
                                        </Colxx>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Colxx>
                    </Row>
                </Formik>
            </div>
        );
    }
}
export default SurveyItem;
