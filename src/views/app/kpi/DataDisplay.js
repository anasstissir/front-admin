import React from "react";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Card, CardBody, CardTitle, Badge } from "reactstrap";

import IntlMessages from "../../../helpers/IntlMessages";
import data from "../../../data/products";
import moment from 'moment'
import { urlPath } from "../../../constants/defaultValues";

export default function DataDisplay(props) {
  return (
    <Card className=" mb-2">
      <CardBody>
        <CardTitle>
          {props.title}
        </CardTitle>
        {props.loading ?
          <div className="loading-reltive" />
          :
          <div className="dashboard-list-with-thumbs">
            {props.data && props.data.map((item, index) => {
              return (
                <div key={index} className="d-flex flex-row mb-3">
                  <div className="d-block position-relative">
                    {item.imageId && <img
                      src={urlPath + '/api/images/' + item.imageId + '/view'}
                      alt={item.commTitle}
                      className="list-thumbnail responsive card-img-left"
                      style={{ maxWidth: 100 }}
                    />}
                    <Badge
                      key={index}
                      className="position-absolute badge-top-right"
                      pill
                    >
                      {item.number}
                    </Badge>
                  </div>
                  <div className="pl-3 pt-2 pr-2 pb-2">
                    <p className="list-item-heading">{item.commTitle || item.faqTitle || item.eventTitle}</p>
                    <div className="text-primary text-small font-weight-medium d-none d-sm-block">
                      {moment(item.beginPublishDateTime).format("DD/MM/YYYY")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        }
      </CardBody>
    </Card>
  );
}
