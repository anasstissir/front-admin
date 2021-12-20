import React, { Component } from "react";
import { Card, CardBody, FormGroup, Button, Label, CustomInput, InputGroup, CardImg, Input } from "reactstrap";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import * as Yup from "yup";
import IntlMessages from "../../../../helpers/IntlMessages";
import { Wizard, Steps, Step } from 'react-albus';
import { injectIntl } from 'react-intl';
import { BottomNavigation } from "../../../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../../../components/wizard/TopNavigation";
import { FormikDatePicker } from "../../../../containers/form-validations/FormikFields";
import DropzoneExample from "../../../../containers/forms/DropzoneExample";
import Editor from '../../../util/editor'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CardMedia from '@material-ui/core/CardMedia';
import draftToHtml from 'draftjs-to-html';
import DatePicker from "react-datepicker";
import { withRouter } from "react-router-dom";

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
            videoFile: null
        }
        this.imageFile = React.createRef();
    }

    componentDidMount() {
        if (this.props.edit) {
            this.props.getById(filter_article(this.props.location.search))
        }
    }

    handleFileAdded = (file) => {
        this.setState({ attachedFile: file })
    }
    handleImageAdded = (file) => {
        this.setState({ imageFile: file })
    }
    handleVideoAdded = (file) => {
        this.setState({ videoFile: file })
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
        let bodyFormData = new FormData();
        bodyFormData.append('title', values.title)
        bodyFormData.append('content', values.content)
        bodyFormData.append('eventAdress', values.address)
        bodyFormData.append('maxPlacesNumber', values.numberPlace)
        bodyFormData.append('beginPublishDateTime', moment(values.beginPublishDateTime).format("YYYY-MM-DDThh:mm:ss") + ".464Z")
        bodyFormData.append('endPublishDateTime', moment(values.endPublishDateTime).format("YYYY-MM-DDThh:mm:ss") + ".464Z")
        bodyFormData.append('startDateTime', moment(values.startTime).format("YYYY-MM-DDThh:mm:ss") + ".464Z")
        bodyFormData.append('endDateTime', moment(values.endTime).format("YYYY-MM-DDThh:mm:ss") + ".464Z")
        bodyFormData.append('status', values.status)
        bodyFormData.append('type', values.type)
        if (!this.props.edit) {
            bodyFormData.append('imageFile', this.state.imageFile)
            bodyFormData.append('videoFile', this.state.videoFile)
            bodyFormData.append('attachedFile', this.state.attachedFile)
        }
        if (this.props.edit) {
            bodyFormData.append('id', this.props.toEdit.id)
            this.props.editIem(bodyFormData)
        } else {
            this.props.add(bodyFormData)
        }
    };

    render() {
        const { messages } = this.props.intl;
        return (this.props.isLoading || (!this.props.isLoadingForEdit && this.props.edit) ?
            <div className="loading" />
            :

            <Card>
                {this.props.isAdded &&
                    this.props.history.goBack()
                }
                <CardBody className="wizard wizard-default">
                    <Wizard>
                        <TopNavigation className="justify-content-center" disableNav={false} topNavClick={this.topNavClick} />
                        <Formik
                            initialValues={{
                                title: this.props.edit ? this.props.toEdit.title : "",
                                content: this.props.edit ? this.props.toEdit.content : "",
                                address: this.props.edit ? this.props.toEdit.eventAdress : "",
                                numberPlace: this.props.edit ? this.props.toEdit.maxPlacesNumber : "",
                                imageFile: null,
                                beginPublishDateTime: this.props.edit ? moment(this.props.toEdit.beginPublishDateTime) : null,
                                endPublishDateTime: this.props.edit ? moment(this.props.toEdit.beginPublishDateTime) : null,
                                startTime: this.props.edit ? moment(this.props.toEdit.startDateTime) : null,
                                endTime: this.props.edit ? moment(this.props.toEdit.endDateTime) : null,
                                videoFile: null,
                                attachedFile: null,
                                status: this.props.edit ? this.props.toEdit.status : "SAVED",
                                type: this.props.edit ? this.props.toEdit.type : "NEWS"
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
                                                        <IntlMessages id="forms.numberPlace" />
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        name="numberPlace"
                                                        id="numberPlace"
                                                        placeholder="Places..."
                                                        value={values.numberPlace}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {errors.numberPlace && touched.numberPlace ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.numberPlace}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                                <FormGroup className="form-group">
                                                    <Label>
                                                        <IntlMessages id="forms.content" />
                                                    </Label>
                                                    <Editor
                                                        name="content"
                                                        value={values.content}
                                                        onChange={setFieldValue}
                                                    />
                                                    {errors.content && touched.content ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.content}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>
                                                        <IntlMessages id="forms.imageFile" />
                                                    </Label>
                                                    <DropzoneExample
                                                        acceptedFiles="image/*"
                                                        onChange={{
                                                            init: dz => this.dropzone = dz,
                                                            addedfile: this.handleImageAdded
                                                        }} />
                                                    {errors.imageFile && touched.imageFile ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.imageFile}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                            </Form>
                                        </div>
                                    </Step>
                                    <Step id="step2" name={messages["wizard.creneaux"]}>
                                        <div className="wizard-basic-step">
                                            <Form>
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
                                                <FormGroup className="form-group has-float-label">
                                                    <Label className="d-block">
                                                        <IntlMessages id="form-components.endPublishDateTime" />
                                                    </Label>
                                                    <FormikDatePicker
                                                        name="endPublishDateTime"
                                                        value={values.endPublishDateTime}
                                                        onChange={setFieldValue}
                                                        onBlur={setFieldTouched}
                                                    />
                                                    {errors.endPublishDateTime && touched.endPublishDateTime ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.endPublishDateTime}
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
                                                <FormGroup className="form-group has-float-label">
                                                    <Label className="d-block">
                                                        <IntlMessages id="form-components.end-time" />
                                                    </Label>
                                                    <FormikDatePicker
                                                        name="endTime"
                                                        value={values.endTime}
                                                        onChange={setFieldValue}
                                                        onBlur={setFieldTouched}
                                                        showTimeSelect
                                                        timeFormat="HH:mm"
                                                        timeIntervals={15}
                                                        dateFormat="LLL"
                                                        timeCaption="Time"
                                                    />
                                                    {errors.endTime && touched.endTime ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.endTime}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                            </Form>
                                        </div>

                                    </Step>
                                    <Step id="step3" name={messages["wizard.attachement"]}>
                                        <div className="wizard-basic-step">
                                            <Form>
                                                <FormGroup>
                                                    <Label>
                                                        <IntlMessages id="forms.videoFile" />
                                                    </Label>
                                                    <DropzoneExample
                                                        acceptedFiles="video/*"
                                                        onChange={{
                                                            init: dz => this.dropzone = dz,
                                                            addedfile: this.handleVideoAdded
                                                        }} />
                                                    {errors.videoFile && touched.videoFile ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.videoFile}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>
                                                        <IntlMessages id="forms.attachedFile" />
                                                    </Label>
                                                    <DropzoneExample
                                                        acceptedFiles="image/*, application/pdf"
                                                        onChange={{
                                                            init: dz => this.dropzone = dz,
                                                            addedfile: this.handleFileAdded
                                                        }} />
                                                    {errors.attachedFile && touched.attachedFile ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.attachedFile}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                            </Form>
                                        </div>
                                    </Step>
                                    <Step id="step4" hideTopNav={true}>
                                        <div className="wizard-basic-step text-center">
                                            <h2 className="mb-2"><IntlMessages id="wizard.confirme-submit" /></h2>
                                            <Form>
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
                        <BottomNavigation
                            onClickNext={this.onClickNext}
                            onClickPrev={this.onClickPrev}
                            className="justify-content-center"
                            prevLabel={messages["wizard.prev"]}
                            nextLabel={messages["wizard.next"]} />
                    </Wizard>
                </CardBody>
            </Card>
        );
    }
}
export default withRouter(injectIntl(Add))
