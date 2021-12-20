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
import ReactHtmlParser from 'react-html-parser';
import { Colxx } from "../../../components/common/CustomBootstrap";
import moment from "moment";
import More from '../../util/More'
import { labelUpcoming, renderColor, formatStatus, labelUpcomingDesign } from './utils'


const ThumbListView = (props) => {

  const [toggle, setToggle] = useState(false)

  const changeToggle = () => {
    setToggle(!toggle);
  };

  const optionMore = () => {
    return [{
      label: "Preview",
      action: props.handlePreview
    },{
      label: "Delete",
      action: props.handleDelete
    },
    {
      label: "Edit",
      action: props.handleEdit
    },
    {
        label: "Publish",
        action: props.handlePublish
    },
    {
        label: "Notify",
        action: props.handleNotify
    }
  ]
  }

  const goToEdit = (id) => {
    props.handleEdit(id)
  };

  return (
    <Colxx xxs="12" className="mb-2">
    <Card
        className="d-flex flex-row"
        style={{ borderRadius: 10 }}
    >
        <div style={{ padding: 0 }} className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <NavLink to={`${props.location.pathname}/detail?sond_id=${props.item.id}`} className="w-40 w-sm-100">
                    <p className="list-item-heading mb-1 truncate">
                    {props.item.sectionName || props.item.title}
                    </p>
                </NavLink>
                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {moment(props.item.createdDate).format("DD/MM/YYYY")}
                </p>
                <div className="w-15 w-sm-100">
                    <Badge color={renderColor(props.item.status)} pill>
                        {formatStatus(props.item.status)}
                    </Badge>
                </div>
                <div className="w-15 w-sm-100">
                    <Badge color={labelUpcomingDesign(props.item.startDateTime, props.item.endDateTime)} pill>
                    {labelUpcoming(props.item.startDateTime, props.item.endDateTime)}
                    </Badge>
                </div>
            </div>
        </div>
                <More options={optionMore()} />
    </Card>
</Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListView);
