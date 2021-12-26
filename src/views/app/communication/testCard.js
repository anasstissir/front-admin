import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { urlPath } from "../../../constants/defaultValues";
import { NavLink } from "react-router-dom";
import { labelUpcoming, labelColor, formatStatus, renderColor } from './utils'
import moment from 'moment'
import Skeleton from '@material-ui/lab/Skeleton';
import More from '../../util/More'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ReactHtmlParser from 'react-html-parser';
import { ContextMenuTrigger } from "react-contextmenu";
import {
    Badge, Card,
    CardBody,
    CardImg,
    CardSubtitle, Collapse,
    Row
} from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        "@media (max-width: 500px)": {
            flex: "100%"
        }
    },
    cover: {
        height: 'auto',
        width: '200px',
        objectFit: 'contain'
    }
}));


export default function MediaControlCard(props) {
    const classes = useStyles();
    const theme = useTheme();

    const optionMore = () => {
        return [{
            label: "Publish",
            action: props.handlePublish
        },
        {
            label: "Notify",
            action: props.handleNotify
        },
        {
            label: "Edit",
            action: props.handleEdit
        },
        {
            label: "Delete",
            action: props.handleDelete
        }
        ]
    }

    return (
        <Colxx xxs="12" className="mb-2">
            <Card
                className="d-flex flex-row"
                style={{ borderRadius: 10 }}
            >
                <div className="d-flex flex-grow-1 min-width-zero">
                    <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                        <NavLink to={`${props.location.pathname}/detail?comm_id=${props.item.id}`} className="w-40 w-sm-100">
                            <p className="list-item-heading mb-1 truncate">
                                {props.item.name || props.item.title}
                            </p>
                        </NavLink>
                        <p className="mb-1 text-muted text-small w-15 w-sm-100">
                            {moment(props.item.creationDate).format("DD/MM/YYYY")}
                        </p>
                        <p className="mb-1 text-muted text-small w-15 w-sm-100">
                        {props.item?.club?.name}
                        </p>
                    </div>
                </div>
                <More options={optionMore()} />
            </Card>
        </Colxx>
    );
}