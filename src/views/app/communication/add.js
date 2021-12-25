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
import moment from "moment";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx } from "../../../components/common/CustomBootstrap";

import { FormikDatePicker } from "../../../containers/form-validations/FormikFields";
import Editor from '../../util/editor'

const SignupSchema = Yup.object().shape({
    categoryName: Yup.string()
        .min(3, "Write at least 3 caracteres")
        .required("Title is required!")
});


class FormikCustomWithTopLabels extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (values) => {
        let payload = {
            title: values.title,
            club: parseInt(values.responsible),
            timeMeeting: moment(values.startTime).format("YYYY-MM-DDThh:mm:ss") + ".464Z",
            place: values.address,
            description: values.content,
        }
        if (this.props.edit) {
            this.props.add({ ...payload, id: this.props.toEdit.id })
        } else {
            this.props.add(payload)
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
                                    onSubmit={this.handleSubmit}
                                >
                                    {({
                                        handleSubmit,
                                        setFieldValue,
                                        setFieldTouched,
                                        handleChange,
                                        handleBlur,
                                        values,
                                        errors,
                                        touched,
                                        isSubmitting
                                    }) => (
                                        <Form className="av-tooltip tooltip-label-bottom">
                                            <FormGroup>
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
                                                    <IntlMessages id="forms.responsible" />
                                                </Label>
                                                <select
                                                    name="responsible"
                                                    className="form-control"
                                                    value={values.responsible}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}

                                                >
                                                    <option disabled selected>Choisir Club</option>
                                                        {this.props.clubs?.map((item) =>
                                                            <option key={item.id} value={item.id}>{item.name}</option>
                                                        )}
                                                </select>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label>
                                                    <IntlMessages id="forms.address" />
                                                </Label>
                                                <Field className="form-control" name="address" />
                                                {errors.address && touched.address ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.address}
                                                    </div>
                                                ) : null}
                                            </FormGroup>
                                            <FormGroup>
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
                                                <Label className="d-block">
                                                    <IntlMessages id="form-components.start-time" />
                                                </Label>
                                                <FormikDatePicker
                                                    name="startTime"
                                                    id="startTime"
                                                    onChange={setFieldValue}
                                                    onBlur={setFieldTouched}
                                                    value={values.startTime}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    dateFormat="LLL"
                                                    timeCaption="Time" />
                                                {errors.startTime && touched.startTime ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.startTime}
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
