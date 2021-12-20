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
    CardTitle
} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import DropzoneExample from "../../../containers/forms/DropzoneExample";

const SignupSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Write at least 3 caracteres")
        .required("Title is required!"),
});


class FormikCustomWithTopLabels extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        attachedFile: null
    }

    handleSubmit = (values) => {
        let bodyFormData = new FormData();
        bodyFormData.append('reponse', values.content)
        bodyFormData.append('sectionId', parseInt(values.section))
        bodyFormData.append('linkUrl', values.link)
        bodyFormData.append('title', values.title)
        bodyFormData.append('content', values.content)
        if (!this.props.editable)
            bodyFormData.append('attachedFile', this.state.attachedFile)
        if (this.props.editable) {
            bodyFormData.append('id', this.props.toEdit.id)
            this.props.edit(bodyFormData)
        }else{
            this.props.add(bodyFormData)
        }
            

    };

    handleFileAdded = (file) => {
        this.setState({ attachedFile: file })
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
                                    initialValues={{
                                        title: this.props.editable && this.props.toEdit ? this.props.toEdit.title : "",
                                        content: this.props.editable && this.props.toEdit ? this.props.toEdit.content : "",
                                        section: this.props.editable && this.props.toEdit ? this.props.toEdit.sectionId : null,
                                        link: this.props.editable && this.props.toEdit ? this.props.toEdit.linkUrl : null,
                                        attachedFile: null
                                    }
                                    }
                                    validationSchema={SignupSchema}
                                    onSubmit={this.handleSubmit}
                                >
                                    {({
                                        errors,
                                        touched,
                                        values,
                                        handleChange,
                                        handleBlur

                                    }) => (
                                        <Form className="av-tooltip tooltip-label-bottom">
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
                                                <Field className="form-control" name="content" />
                                                {errors.content && touched.content ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.content}
                                                    </div>
                                                ) : null}
                                            </FormGroup>
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="forms.section" />
                                                </Label>
                                                <select
                                                    name="section"
                                                    className="form-control"
                                                    value={values.section}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <option disabled selected>Choisir Section</option>
                                                    {this.props.comm_list && this.props.comm_list.map(item =>
                                                        <option key={item.id} value={item.id}>{item.sectionName}</option>
                                                    )}
                                                </select>
                                                {errors.section && touched.section ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.section}
                                                    </div>
                                                ) : null}
                                            </FormGroup>
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="forms.link" />
                                                </Label>
                                                <Field className="form-control" name="link" />
                                                {errors.link && touched.link ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.link}
                                                    </div>
                                                ) : null}
                                            </FormGroup>
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="forms.description" />
                                                </Label>
                                                <DropzoneExample onChange={{
                                                    init: dz => this.dropzone = dz,
                                                    addedfile: this.handleFileAdded
                                                }} />
                                                {errors.description && touched.description ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.description}
                                                    </div>
                                                ) : null}
                                            </FormGroup>
                                            <Button color="primary" type="submit">
                                                Sauvgarder
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
