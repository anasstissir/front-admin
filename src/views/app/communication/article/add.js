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
        let bodyFormData = new FormData();
        bodyFormData.append('title', values.title)
        bodyFormData.append('content', values.content)
        bodyFormData.append('categoryId', values.categoryId)
        bodyFormData.append('beginPublishDateTime', moment(values.beginPublishDateTime).format("YYYY-MM-DDThh:mm:ss") + ".464Z")
        bodyFormData.append('endPublishDateTime', moment(values.endPublishDateTime).format("YYYY-MM-DDThh:mm:ss") + ".464Z")
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
        return this.props.isLoading || (!this.props.isLoadingForEdit && this.props.edit) ? (
            <div className="loading" />)
            :
            (<Card>
                <CardBody className="wizard wizard-default">
                    <Wizard>
                        <TopNavigation className="justify-content-center" disableNav={false} topNavClick={this.topNavClick} />
                        <Formik
                            initialValues={{
                                title: this.props.edit ? this.props.toEdit.title : "",
                                content: this.props.edit ? this.props.toEdit.content : "",
                                categoryId: this.props.edit ? this.props.toEdit.categoryId : null,
                                imageFile: null,
                                beginPublishDateTime: this.props.edit ? moment(this.props.toEdit.beginPublishDateTime) : null,
                                endPublishDateTime: this.props.edit ? moment(this.props.toEdit.endPublishDateTime) : null,
                                attachedFile: null,
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
                                                <FormGroup className="form-group">
                                                    <Label>
                                                        <IntlMessages id="forms.content" />
                                                    </Label>

                                                    <Editor
                                                        name="content"
                                                        value={values.content || ''}
                                                        onChange={setFieldValue}
                                                    />
                                                    {errors.content && touched.content ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.content}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                                <FormGroup className="error-l-100">
                                                    <Label>
                                                        <IntlMessages id="forms.category" />
                                                    </Label>
                                                    <select
                                                        name="categoryId"
                                                        className="form-control"
                                                        value={values.categoryId}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        <option disabled selected>Choisir catég</option>
                                                        {this.props.comm_list && this.props.comm_list.map(item =>
                                                            <option key={item.id} value={item.id}>{item.categoryName}</option>
                                                        )}
                                                    </select>

                                                    {errors.categoryId && touched.categoryId ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.categoryId}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                                <FormGroup className="form-group">
                                                    <Label>
                                                        <IntlMessages id="forms.imageFile" />
                                                    </Label>
                                                    <Row>
                                                        <Colxx sm="8">
                                                            <DropzoneExample
                                                                acceptedFiles="image/*"
                                                                onChange={{
                                                                    init: dz => this.dropzone = dz,
                                                                    addedfile: this.handleImageAdded
                                                                }} />
                                                        </Colxx>
                                                        <Colxx sm="4">

                                                            <div className="position-absolute card-top-buttons">
                                                                <Button outline className="icon-button">
                                                                    <i className="simple-icon-trash" />
                                                                </Button>
                                                            </div>
                                                            <img className="card-img-top" src={this.state.previewImg}></img>
                                                        </Colxx>
                                                    </Row>

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
            </Card>)

    }
}
export default injectIntl(Add)
