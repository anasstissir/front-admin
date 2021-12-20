import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import moment from "moment";
import React, { useState } from "react";
import ReactHtmlParser from 'react-html-parser';
import {
  Badge, Card,
  CardBody,
  CardSubtitle, Collapse,
  Row
} from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import More from '../../util/More';
import { urlPath } from '../../../constants/defaultValues'


const ThumbListView = (props) => {

  const [toggle, setToggle] = useState(false)

  const changeToggle = () => {
    setToggle(!toggle);
  };

  const download = () => {
    props.download(props.item.attachedFileDocument.id)
  };

  const optionMore = () => {
    return [{
      label: "Delete",
      action: props.handleDelete
    },
    {
      label: "Edit",
      action: props.handleEdit
    }]
  }

  const goToEdit = (id) => {
    props.handleEdit(id)
  };

  return (
    <Colxx xxs="12" key={props.item.id} className="mb-2">
      <Card
        className="d-flex flex-row"
        style={{ borderRadius: 10 }}
      >
        <CardBody style={{ paddingTop: 0, paddingBottom: 0 }}>
          <CardSubtitle style={{ marginBottom: 0, marginTop: 0 }}>
            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
              <div style={{ padding: 0 }} className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <p className="list-item-heading truncate mb-0 mt-2 w-40 w-sm-100">

                  {props.item.sectionName || props.item.title}

                  <IconButton aria-label="eye" onClick={changeToggle}>
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </p>
                <p className="text-muted text-small w-40  mb-0 mt-2 w-sm-100">
                  {props.item.createdBy}
                </p>

                <Badge color="outline-success" className="mr-4 w-30 w-sm-100 mb-0 mt-2" pill>
                  {props.item.section && props.item.section.sectionName}
                </Badge>

                <p className=" mb-0 mt-2 text-muted text-small w-15 w-sm-100">
                  {moment(props.item.createdDate).format("DD/MM/YYYY")}
                </p>
              </div>
              <More options={optionMore()} />
            </div>
          </CardSubtitle>
          <Collapse isOpen={toggle} style={{ padding: 2 }}>
            <div className="separator" />
            <div className="mt-1">
              <Row>
                <Colxx sm="10">
                  <p className="mb-5">
                    {ReactHtmlParser(props.item.description || props.item.content)}
                  </p>
                  {props.item.linkUrl &&
                    <p className="mb-5">
                      {props.item.linkUrl}
                    </p>
                  }
                </Colxx>
                <Colxx sm="2">
                  {props.item.attachedFileDocument &&
                    <a target="_blank" href={urlPath + "/api/pdfs/" + props.item.attachedFileDocument.id + "/view"}>
                      <IconButton className="float-right" aria-label="eye" onClick={download}>
                        <CloudDownloadIcon fontSize="small" />
                      </IconButton>
                    </a>
                  }
                </Colxx>
              </Row>



            </div>
          </Collapse>
        </CardBody>
      </Card>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListView);
