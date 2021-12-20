import React, { useEffect } from "react";
import axios from 'axios'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Card, CustomInput, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";
import { urlPath } from '../../constants/defaultValues'
import { getDateFormatted } from '../../helpers/Utils'
import moment from "moment";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import More from './More'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));




const ThumbListView = (props) => {

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

  const classes = useStyles();

  return (
    <Colxx xxs="12" key={props.item.id} className="mb-2">
        <Card
          className="d-flex flex-row"
          style={{borderRadius: 10}}
        >
          <NavLink to={`${props.location.pathname}/detail?user_id=${props.item.id}`} className="d-flex" style={{ alignItems: "center", padding: "10px" }}>
            <div></div>

            <Avatar src={urlPath + '/api/images/' + props.item.photoDocumentId + '/view'} className={classes.small} />
          </NavLink>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div style={{ padding: 0 }} className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`${props.location.pathname}/detail?user_id=${props.item.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {props.item.name}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-40 w-sm-100">
                {props.item.email}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {moment(props.item.createdDate).format("DD/MM/YYYY")}
              </p>
              <div className=" mb-1 w-15 w-sm-100">
                <Badge color={props.item.activated ? "success" : "warning"} pill>
                  {props.item.activated ? "Actif" : "Inactif"}
                </Badge>
              </div>
            </div>
              <More className=" mb-1 " options={optionMore()} />
          </div>
        </Card>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListView);
