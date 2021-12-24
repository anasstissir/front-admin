import { EditorState } from 'draft-js';
import { Field, Form, Formik } from "formik";
import moment from "moment";
import React, { Component } from "react";
import { Step, Steps, Wizard } from 'react-albus';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { injectIntl } from 'react-intl';
import { Button, Card, CardBody, FormGroup, Label } from "reactstrap";
import Row from "reactstrap/lib/Row";
import * as Yup from "yup";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import { BottomNavigation } from "../../../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../../../components/wizard/TopNavigation";
import { urlPath } from '../../../../constants/defaultValues';
import { FormikDatePicker } from "../../../../containers/form-validations/FormikFields";
import DropzoneExample from "../../../../containers/forms/DropzoneExample";
import IntlMessages from "../../../../helpers/IntlMessages";
import Editor from '../../../util/editor';


const filter_article = (search) => {
    const params = new URLSearchParams(search);
    const user_id = parseInt(params.get('id'));
    return user_id
}

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required!"),
    firstname: Yup.string().required("A firstname is required!"),
});

class Add extends Component {
    constructor(props) {
        super(props);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.topNavClick = this.topNavClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: "",
            email: "",
            password: "",
            previewImage: "",
            editorState: EditorState.createEmpty(),
            attachedFile: null,
            imageFile: null,
            videoFile: null,
            previewImg: null,
        }
        this.imageFile = React.createRef();
    }

    handleFileAdded = (file) => {
        this.setState({ attachedFile: file })
    }
    handleImageAdded = (file) => {
        this.setState({ imageFile: file, previewImg: URL.createObjectURL(file) })
    }
    handleVideoAdded = (file) => {
        this.setState({ videoFile: file })
    }
    componentDidMount() {
        this.props.getInitData()
        if (this.props.edit) {
            this.props.getById(filter_article(this.props.location.search))
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.idAded !== this.props.isAdded && this.props.isAdded) {
            this.props.history.goBack()
        }
        if (prevProps.toEdit !== this.props.toEdit && this.props.toEdit.imageDocumentId) {
            this.setState({ previewImg: urlPath + "/api/images/" + this.props.toEdit.imageDocumentId + "/view" })
        }
    }


    topNavClick(stepItem, push) {
        push(stepItem.id);
    }

    onClickNext(goToNext, steps, step) {
        step.isDone = true;
        if (steps.length - 1 <= steps.indexOf(step)) {
            return;
        }
        goToNext();
    }

    onClickPrev(goToPrev, steps, step) {
        if (steps.indexOf(step) <= 0) {
            return;
        }
        goToPrev();
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    }

    handleSubmit = (values) => {
        let payload = {
            name: values.title,
            creationDate: moment(values.beginPublishDateTime).format("YYYY-MM-DDThh:mm:ss") + ".464Z"
        }
        if (this.props.edit) {
            this.props.editIem({...payload, id: this.props.toEdit.id})
        } else {
            this.props.add(payload)
        }
    };

    render() {
        const { messages } = this.props.intl;
        return this.props.isLoading || (!this.props.isLoadingForEdit && this.props.edit) ? (
            <div className="loading" />)
            :
            (<Card>
                <CardBody className="wizard wizard-default">
                    <Wizard>
                        <TopNavigation className="justify-content-center" disableNav={false} topNavClick={this.topNavClick} />
                        <Formik
                            initialValues={{
                                title: this.props.edit ? this.props.toEdit.name : "",
                                beginPublishDateTime: this.props.edit ? moment(this.props.toEdit.creationDate) : null,
                            }}
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
                                <Steps>
                                    <Step id="step1" name={messages["wizard.step-information"]} desc={messages["wizard.step-info-fill"]}>
                                        <div className="wizard-basic-step">
                                            <Form>
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
                                                    <Label className="d-block">
                                                        <IntlMessages id="form-components.beginPublishDateTime" />
                                                    </Label>
                                                    <FormikDatePicker
                                                        name="beginPublishDateTime"
                                                        value={values.beginPublishDateTime}
                                                        onChange={setFieldValue}
                                                        onBlur={setFieldTouched}
                                                    />
                                                    {errors.beginPublishDateTime && touched.beginPublishDateTime ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.beginPublishDateTime}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                                
                                                <FormGroup>
                                                    <Button color="primary" type="submit">
                                                        Sauvgarder
                                                    </Button>
                                                </FormGroup>
                                            </Form>
                                        </div>
                                    </Step>
                                </Steps>
                            )}
                        </Formik>
                    </Wizard>
                </CardBody>
            </Card>)

    }
}
export default injectIntl(Add)
