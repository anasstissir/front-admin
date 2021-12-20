import React, { useEffect, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
  Card, CustomInput, Badge,
  Collapse,
  Button,
  Row,
  CardBody,
  CardSubtitle
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
import moment from "moment";
import More from '../../util/More'
import ReactHtmlParser from 'react-html-parser';


const ThumbListView = (props) => {

  const [toggle, setToggle] = useState(false)

  const changeToggle = () => {
    setToggle(!toggle);
  };

  const optionMore = () => {
    return [{
      label: "Delete",
      action: props.handleDelete
    },
    {
      label: "Edit",
      action: props.handleEdit
    }
    ]
  }


  return (
    <Colxx xxs="12" key={props.item.id} className="mb-2">
      <Card
        className="d-flex flex-row"
        style={{borderRadius: 10}}
      >
        <CardBody style={{ paddingTop: 0, paddingBottom: 0 }}>
          <CardSubtitle style={{ marginBottom: 0, marginTop: 0 }}>
            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
              <div style={{ padding: 0 }} className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                <p className="list-item-heading mb-0 mt-2 w-40 w-sm-100 truncate">
                  {props.notification ? props.item.title : props.item.categoryName}

                  <IconButton aria-label="eye" onClick={changeToggle}>
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </p>
                <p className="mb-0 mt-2 text-muted text-small w-40 w-sm-100">
                  {props.item.createdBy}
                </p>
                <p className="mb-0 mt-2 text-muted text-small w-15 w-sm-100">
                  {moment(props.item.createdDate).format("DD/MM/YYYY")}
                </p>
              </div>
              <More options={optionMore()} />
            </div>
          </CardSubtitle>
          <Collapse isOpen={toggle} style={{ padding: 2 }}>
            <div className="border mt-1">
              <p className="mb-1">
                {ReactHtmlParser(props.notification ? props.item.content : props.item.description)}
              </p>
            </div>
          </Collapse>
        </CardBody>
      </Card>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListView);
