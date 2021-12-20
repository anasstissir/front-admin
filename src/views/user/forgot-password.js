import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { forgotPassword } from "../../redux/actions";
import logo from "../../assets/images/logo.png";
import { NotificationManager } from "../../components/common/react-notifications";
import { connect } from "react-redux";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  onForgotPassword = (values) => {
    if (!this.props.loading) {
      if (values.email !== "") {
        this.props.forgotPassword({email: values.email});
      }
    }
  }

  validateEmail = value => {
    this.setState({ email: value });
    let error;
    if (!value) {
      error = "S'il vous plaît entrer votre adresse email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Adresse e-mail invalide";
    }
    return error;
  };


  componentDidUpdate() {
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        "Erreur",
        3000,
        null,
        null,
        ''
      );
    } else {
      if (!this.props.loading && this.props.forgotUserMail === "success")
        NotificationManager.success(
          "Vérifiez votre boîte mail pour continuer.",
          "Succès",
          3000,
          null,
          null,
          ''
        );
    }

  }


  render() {

    const { email } = this.state;
    const initialValues = { email };

    return (
      <Row className="h-100">
        <Colxx xxs="12" md="6" className="mx-auto my-auto">
          <Card style={{borderRadius: 20}} className="auth-card">
            <div className="form-side">
            <NavLink
                to={`/user/login`}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "15px 0px 10px 0px"
                }}
              >
                <img
                  src={logo}
                  alt="HR"
                  style={{ width: "43%", height: "auto", marginBottom: "40px" }}
                />
              </NavLink>

              <CardTitle className="mb-4">
                Réinitialiser votre mot de passe
              </CardTitle>

              <Formik
                initialValues={initialValues}
                onSubmit={this.onForgotPassword}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.email" />
                      </Label>
                      <Field
                        className="form-control"
                        name="email"
                        validate={this.validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>

                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <NavLink to={`/user/login`}>Connexion</NavLink>
                      <Button
                        color="primary"
                        className={`btn-multiple-state ${
                          this.props.loading ? "show-spinner" : ""
                          }`}
                        size="sm"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          CONFIRMER
                        </span>
                      </Button>
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
  const { forgotUserMail, loading, error } = authUser;
  return { forgotUserMail, loading, error };
};

export default connect(
  mapStateToProps,
  {
    forgotPassword
  }
)(ForgotPassword);

