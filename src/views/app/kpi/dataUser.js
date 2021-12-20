import React from "react";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Card, CardBody, CardTitle } from "reactstrap";

import IntlMessages from "../../../helpers/IntlMessages";
import data from "../../../data/tickets";
import { urlPath } from "../../../constants/defaultValues";

const DataUser = (props) => {
    return (
        <Card className=" mb-2">
            <CardBody>
                <CardTitle>
                    {props.title}
                </CardTitle>
                {props.loading ?
                    <div className="loading-reltive" />
                    :
                    <div className="dashboard-list-with-user">
                        {props.data && props.data.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="d-flex flex-row mb-3 pb-3 border-bottom">
                                        <img
                                            src={urlPath + '/api/images/' + item.imageId + '/view'}
                                            alt={item.userName}
                                            className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                                        />

                                    <div className="pl-3 pr-2">
                                            <p className="font-weight-medium mb-0 ">{item.userName}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                }
            </CardBody>
        </Card>
    );
};
export default DataUser;
