import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CardMedia from '@material-ui/core/CardMedia';

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
import { urlPath } from "../../../constants/defaultValues";
import Avatar from '@material-ui/core/Avatar';
import {labelUpcoming} from './utils'

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));


const ThumbListView = (props) => {

  const classes = useStyles();

  const goToEdit = (id) => {
    props.handleEdit(id)
  };

  return (
    <Colxx xxs="12" key={props.item.id} className="mb-4">
      <Card
        className="d-flex flex-row"
      >
        <CardBody >
          <CardSubtitle >
            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
              <div style={{ padding: 0 }} className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <div className=" w-10">
                <Avatar
                  src={urlPath + '/api/images/' + props.item.imageDocument.id + '/view'}
                  title={props.item.title}
                  className={classes.large}
                />
                </div>
                <NavLink to={`${props.location.pathname}/detail?comm_id=${props.item.id}`} className="w-20">
                  <p className="list-item-heading mb-1 truncate">
                    {props.item.title}
                  </p>
                </NavLink>
                <p className="mb-1 text-muted text-small w-20">
                  {props.item.createdBy}
                </p>
                <Badge color="info" className="w-10" pill>
                  {props.item.status}
                </Badge>
                <Badge color="outline-success" className="w-20" pill>
                  {props.item.category && props.item.category.categoryName}
                </Badge>

                <Badge color="outline-success" className="w-20" pill>
                  {props.item.eventDateTime && labelUpcoming(props.item.eventDateTime)}
                </Badge>

                <IconButton aria-label="edit" onClick={() => goToEdit(props.item.id)}>
                  <EditIcon fontSize="small" />
                </IconButton>

                <IconButton aria-label="delete" onClick={props.handleDelete}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          </CardSubtitle>
        </CardBody>
      </Card>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListView);
