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
        if (this.props.notif) {
            let payload = { content: values.description, title: values.categoryName }
            if (this.props.editable) {
                this.props.edit({ ...payload, id: this.props.toEdit.id })
            } else {

                this.props.add(payload)
            }
        } else {
            if (this.props.editable) {
                this.props.edit({ ...values, id: this.props.toEdit.id })
            } else {

                this.props.add(values)
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
                                    initialValues={this.props.notif ?
                                        {
                                            categoryName: this.props.editable && this.props.toEdit ? this.props.toEdit.title : "",
                                            description: this.props.editable && this.props.toEdit ? this.props.toEdit.content : "",
                                        }
                                        :

                                        {
                                            categoryName: this.props.editable && this.props.toEdit ? this.props.toEdit.categoryName : "",
                                            description: this.props.editable && this.props.toEdit ? this.props.toEdit.description : "",
                                        }
                                    }
                                    validationSchema={SignupSchema}
                                    onSubmit={this.handleSubmit}
                                >
                                    {({
                                        errors,
                                        touched,
                                        handleChange,
                                        setFieldValue,
                                        values,
                                        handleBlur
                                    }) => (
                                        <Form className="av-tooltip tooltip-label-bottom">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="forms.categoryName" />
                                                </Label>
                                                <Field className="form-control" name="categoryName" />
                                                {errors.categoryName && touched.categoryName ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.categoryName}
                                                    </div>
                                                ) : null}
                                            </FormGroup>
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="forms.description" />
                                                </Label>
                                                <Editor
                                                    name="description"
                                                    value={values.description}
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
