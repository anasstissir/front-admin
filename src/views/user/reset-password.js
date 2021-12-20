import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { resetPassword } from "../../redux/actions";
import logo from "../../assets/images/logo.png";
import { NotificationManager } from "../../components/common/react-notifications";
import { connect } from "react-redux";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            newPasswordAgain: ''
        };
    }

    onResetPassword = (values) => {
        if (!this.props.loading) {
            const params = new URLSearchParams(this.props.location.search);
            const oobCode = params.get('key');
            if (oobCode) {
                if (values.newPassword !== "") {
                    this.props.resetPassword({ newPassword: values.newPassword, key: oobCode, history: this.props.history });
                }
            } else {
                NotificationManager.warning(
                    "Faites attention au lien envoyé par Email.",
                    "Erreur",
                    3000,
                    null,
                    null,
                    ''
                );
            }

        }
    }

    validateNewPassword = (values) => {
        const { newPassword, newPasswordAgain } = values;
        let errors = {};
        if (newPasswordAgain && newPassword !== newPasswordAgain) {
            errors.newPasswordAgain = "Les deux mots de passes sont différents";
        }
        return errors;
    }

    componentDidUpdate() {
        if (this.props.error) {
            NotificationManager.warning(
                this.props.error,
                "Erreur dans l'initiation de mot de passe",
                3000,
                null,
                null,
                ''
            );
        } else {
            if (!this.props.loading && this.props.newPassword === "success") {
                NotificationManager.success(
                    "Authentifiez vous avec votre nouveau mot de passe",
                    "Mot de passe changé avec succès",
                    3000,
                    null,
                    null,
                    ''
                );
                this.props.history.push("/user/login")
            }
        }

    }


    render() {
        const { newPassword, newPasswordAgain } = this.state;
        const initialValues = { newPassword, newPasswordAgain };

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
                                validate={this.validateNewPassword}
                                initialValues={initialValues}
                                onSubmit={this.onResetPassword}>
                                {({ errors, touched }) => (
                                    <Form className="av-tooltip tooltip-label-bottom">
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="user.new-password" />
                                            </Label>
                                            <Field
                                                className="form-control"
                                                name="newPassword"
                                                type="password"
                                            />
                                        </FormGroup>
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="user.new-password-again" />
                                            </Label>
                                            <Field
                                                className="form-control"
                                                name="newPasswordAgain"
                                                type="password"
                                            />
                                            {errors.newPasswordAgain && touched.newPasswordAgain && (
                                                <div className="invalid-feedback d-block">
                                                    {errors.newPasswordAgain}
                                                </div>
                                            )}
                                        </FormGroup>

                                        <div className="d-flex justify-content-center">
                                            <Button
                                                color="primary"
                                                className={`btn-multiple-state ${this.props.loading ? "show-spinner" : ""}`}
                                                size="lg"
                                            >
                                                <span className="spinner d-inline-block">
                                                    <span className="bounce1" />
                                                    <span className="bounce2" />
                                                    <span className="bounce3" />
                                                </span>
                                                <span className="label"><IntlMessages id="user.reset-password-button" /></span>
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
    const { newPassword, resetPasswordCode, loading, error } = authUser;
    return { newPassword, resetPasswordCode, loading, error };
};

export default connect(
    mapStateToProps,
    {
        resetPassword
    }
)(ResetPassword);

