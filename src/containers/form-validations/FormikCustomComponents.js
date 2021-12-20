import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import {
  FormikReactSelect,
  FormikCheckboxGroup,
  FormikCheckbox,
  FormikRadioButtonGroup,
  FormikCustomCheckbox,
  FormikCustomCheckboxGroup,
  FormikCustomRadioGroup,
  FormikTagsInput,
  FormikSwitch,
  FormikDatePicker
} from "./FormikFields";
import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { urlPath } from '../../constants/defaultValues'

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required!"),
  firstname: Yup.string().required("A firstname is required!"),
});


class FormikCustomComponents extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    previewImg: null,
    profilePicture: null,
  }




  handleSubmit = (values) => {
    let bodyFormData = new FormData();
    bodyFormData.append('login', values.username)
    bodyFormData.append('firstName', values.firstname)
    bodyFormData.append('lastName', values.lastname)
    bodyFormData.append('email', values.email)
    bodyFormData.append('langKey', values.lang)
    bodyFormData.append('authorities', values.role)
    bodyFormData.append('activated', values.statut)
    if (this.state.profilePicture)
      bodyFormData.append('photoFile', this.state.profilePicture)
    if(this.props.edit){
      bodyFormData.append('id', this.props.toEdit.id)
      this.props.editUser(bodyFormData)
    }else{
      this.props.onAddUser(bodyFormData)
    }
  };

  handleChangeImage = e => {
    this.setState({ previewImg: URL.createObjectURL(e.target.files[0]), profilePicture: e.target.files[0] })
  }

  render() {
    return (
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>

              <Formik
                initialValues={{
                  firstname: this.props.edit && this.props.toEdit ? this.props.toEdit.firstName : "",
                  lastname: this.props.edit && this.props.toEdit ? this.props.toEdit.lastName : "",
                  username: this.props.edit && this.props.toEdit ? this.props.toEdit.login : "",
                  email: this.props.edit && this.props.toEdit ? this.props.toEdit.email : "",
                  lang: this.props.edit && this.props.toEdit ? this.props.toEdit.langKey : "fr",
                  statut: this.props.edit && this.props.toEdit ? this.props.toEdit.activated : false,
                  role: this.props.edit && this.props.toEdit ? this.props.toEdit.authorities : "",
                  photoFile: ""
                }}
                validationSchema={SignupSchema}
                onSubmit={this.handleSubmit}>
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
                  <Form className="av-tooltip tooltip-label-right">
                    <FormGroup className="error-l-100">
                      {this.props.image &&
                        <>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "relative",
                            }}
                          >
                            <div className={"avatar__wrapper"}>
                              <input accept="image/*" name="profil" type="file" onChange={this.handleChangeImage} />
                            </div>

                            <div
                              style={{
                                width: 200,
                                borderRadius: "50%",
                                overflow: "hidden",
                                height: "200px",
                              }}
                              className={"DropzoneExample"
                              }
                            >
                              {this.state.previewImg ?
                                <img src={this.state.previewImg} className="placeholder__avatar" />
                                :
                                this.props.edit && this.props.toEdit && this.props.toEdit.photoDocumentId ?
                                  <img src={urlPath + '/api/images/' + this.props.toEdit.photoDocumentId + '/view'} className="placeholder__avatar" />
                                  :
                                  <div className="placeholder__avatar_default">

                                  </div>
                              }

                            </div>
                            <div className="icon__wrapper">
                              <i className="simple-icon-camera d-block photo__icon" />
                            </div>
                          </div>
                        </>
                      }
                    </FormGroup>
                    <Row>
                      <Colxx md="6">
                        <FormGroup className="error-l-100">
                          <Label>
                            <IntlMessages id="forms.firstname" />
                          </Label>
                          <Field className="form-control" name="firstname" />
                          {errors.firstname && touched.firstname ? (
                            <div className="invalid-feedback d-block">
                              {errors.firstname}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Colxx>
                      <Colxx md="6">
                        <FormGroup className="error-l-100">
                          <Label>
                            <IntlMessages id="forms.lastname" />
                          </Label>
                          <Field className="form-control" name="lastname" />
                          {errors.lastname && touched.lastname ? (
                            <div className="invalid-feedback d-block">
                              {errors.lastname}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx md="6">
                        <FormGroup className="error-l-100">
                          <Label>
                            <IntlMessages id="forms.email" />
                          </Label>
                          <Field className="form-control" name="email" />
                          {errors.email && touched.email ? (
                            <div className="invalid-feedback d-block">
                              {errors.email}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Colxx>
                      <Colxx md="6">
                        <FormGroup className="error-l-100">
                          <Label>
                            <IntlMessages id="forms.username" />
                          </Label>
                          <Field className="form-control" name="username" />
                          {errors.username && touched.username ? (
                            <div className="invalid-feedback d-block">
                              {errors.username}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx md="6">
                        <FormGroup className="error-l-100">
                          <Label>Select </Label>
                          <select
                            name="lang"
                            className="form-control"
                            value={values.lang}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="fr">Français</option>
                            <option value="en">English</option>
                          </select>

                          {errors.lang && touched.lang ? (
                            <div className="invalid-feedback d-block">
                              {errors.lang}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Colxx>
                      <Colxx md="6">
                        <FormGroup className="error-l-100">
                          <Label>Select </Label>
                          <select
                            name="statut"
                            className="form-control"
                            value={values.statut}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value={true}>Actif</option>
                            <option value={false}>Innactif</option>
                          </select>

                          {errors.statut && touched.statut ? (
                            <div className="invalid-feedback d-block">
                              {errors.statut}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Colxx>
                    </Row>
                    <FormGroup className="error-l-100">
                      <Label>
                        <IntlMessages id="forms.role" />
                      </Label>
                      <select
                        name="role"
                        className="form-control"
                        value={values.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option disabled selected value="">Choisir le role</option>
                        <option value="ROLE_ADMIN">Admin</option>
                        <option value="ROLE_EDITOR">Editeur</option>
                        <option value="ROLE_USER">Utilisateur</option>
                      </select>

                      {errors.role && touched.role ? (
                        <div className="invalid-feedback d-block">
                          {errors.role}
                        </div>
                      ) : null}
                    </FormGroup>

                    <Button color="primary" type="submit">
                      <Label>
                        <IntlMessages id="forms.save" />
                      </Label>
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
export default withRouter(FormikCustomComponents);
