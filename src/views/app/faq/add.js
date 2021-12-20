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
import Editor from '../../util/editor'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const SignupSchema = Yup.object().shape({
    sectionName: Yup.string()
        .min(3, "Write at least 3 caracteres")
        .required("Title is required!"),
});


class FormikCustomWithTopLabels extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (values) => {
        let payload = { description: values.description, sectionName: values.sectionName }
        if (!this.props.sub) {
            if (this.props.editable) {
                this.props.edit({ ...payload, id: this.props.toEdit.id })
            } else {

                this.props.add(payload)
            }
        } else {
            if (this.props.editable) {
                this.props.edit({ ...values, id: this.props.toEdit.id, section: parseInt(values.section) })
            } else {

                this.props.add({ ...payload, section: parseInt(values.section) })
            }
        }

    };


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
                                    initialValues={this.props.sub ?
                                        {
                                            sectionName: this.props.editable && this.props.toEdit ? this.props.toEdit.sectionName : "",
                                            description: this.props.editable && this.props.toEdit ? this.props.toEdit.description : "",
                                            section: this.props.editable && this.props.toEdit && this.props.toEdit['section'] ? parseInt(this.props.toEdit.section.id) : null,
                                        }
                                        :

                                        {
                                            sectionName: this.props.editable && this.props.toEdit ? this.props.toEdit.sectionName : "",
                                            description: this.props.editable && this.props.toEdit ? this.props.toEdit.description : "",
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
                                        handleBlur,
                                        setFieldValue

                                    }) => (
                                        <Form className="av-tooltip tooltip-label-bottom">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="forms.sectionName" />
                                                </Label>
                                                <Field className="form-control" name="sectionName" />
                                                {errors.sectionName && touched.sectionName ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.sectionName}
                                                    </div>
                                                ) : null}
                                            </FormGroup>
                                            {this.props.requireInit && <FormGroup className="form-group has-float-label">
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
                                            </FormGroup>}
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="forms.description" />
                                                </Label>
                                                <Editor
                                                    name="description"
                                                    value={values.description || ''}
                                                    onChange={setFieldValue}
                                                />
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
