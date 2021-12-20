import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button, CustomInput } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import logo from "../../assets/images/logo.png";
import { NotificationManager } from "../../components/common/react-notifications";
import { Formik, Form, Field } from "formik";

import { loginUser } from "../../redux/actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "superadmin",
      password: "azerty"
    };
  }

  onUserLogin = (values) => {
    this.props.history.push("/app")
    // if (!this.props.loading) {
    //   if (values.email !== "" && values.password !== "") {
    //     this.props.loginUser(values, this.props.history);
    //   }
    // }
  }

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Please enter your password";
    } else if (value.length < 4) {
      error = "Value must be longer than 3 characters";
    }
    return error;
  }

  componentDidUpdate(prevprops) {
    if (this.props.user !== prevprops.user && this.props.user){
      localStorage.setItem("user", JSON.stringify(this.props.user))
      this.props.history.push("/app");
    }
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        "Erreur lors de l'authentification",
        3000,
        null,
        null,
        ''
      );
    }
  }

  render() {
    const { password, username } = this.state;
    const initialValues = {username,password};

    return (
      <Row className="h-100">
        <Colxx xxs="12" md="6" className="mx-auto my-auto">
          <Card style={{borderRadius: 20}} className="auth-card">
            <div className="form-side">
              {/* <NavLink to={`/`} className="white">
                <span className="logo-single" />
              </NavLink> */}
              <NavLink
                to={`/`}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "15px 0px 10px 0px",
                }}
              >
                <img
                  src={logo}
                  alt="HR"
                  style={{ width: "50%", height: "auto", marginBottom: "5%" }}
                />
              </NavLink>

              <CardTitle className="mb-4 d-flex justify-content-center font-weight-bold">
                Bienvenue sur la console admin de gestion des clubs
              </CardTitle>

              <Formik
                initialValues={initialValues}
                onSubmit={this.onUserLogin}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.username" />
                      </Label>
                      <Field
                        className="form-control mt-2"
                        name="username"
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.password" />
                      </Label>
                      <Field
                        className="form-control mt-3"
                        type="password"
                        name="password"
                        validate={this.validatePassword}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup >
                      <Row>
                        <CustomInput
                          type="checkbox"
                          id="exampleCustomCheckbox"
                          label="Garder la session ouverte"
                        />
                        <div style={{position: 'absolute', right: 0}}>
                          <NavLink to={`/user/forgot-password`}>
                            <IntlMessages id="user.forgot-password-question" />
                          </NavLink>
                        </div>
                      </Row>
                    </FormGroup>
                    <div className="d-flex justify-content-center mt-3">
                     
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${this.props.loading ? "show-spinner" : ""}`}
                        size="lg"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label"><IntlMessages id="user.login-button" /></span>
                      </Button>
                    </div>
                    <div className="my-4 d-flex justify-content-center ">
                      <span style={{textAlign:"center"}}>
                        {" "}
                        Vous n'arrivez pas à vous connectez ? Cliquez sur
                        <NavLink
                          style={{ margin: "0px 3px", color: "#007bff" }}
                          to="/assets/Guide Open HR.docx"
                          target="_blank"
                          download
                        >
                          aide
                        </NavLink>
                      </span>
                    </div>


                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser;
  return { user, loading, error: error.data && error.data.detail };
};

export default connect(
  mapStateToProps,
  {
    loginUser
  }
)(Login);
