import React, { useEffect, useState } from "react";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
  CardText,
  Button,
  Badge
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";
import ThumbnailImage from "../../components/cards/ThumbnailImage"
import ThumbnailLetters from "../../components/cards/ThumbnailLetters"
import IconCard from "../../components/cards/IconCard";
import { urlPath } from '../../constants/defaultValues'
import { withRouter } from "react-router-dom";

const renderRole = (role = "ROLE_EDITOR") => {
  switch (role) {
    case 'ROLE_ADMIN':
      return 'Administrateur';
    case 'ROLE_SUPER_ADMIN':
      return 'Super Administrateur'
    default:
      return 'Editeur'
  }
}

const UserCardExamples = (props) => {

  let history = useHistory()


  const handelEdit = (event, user) => {
    props.history.push({
      pathname: 'edit?user_id=' + user.id
    });
  }


  return (
    !props.user ?
      <div classname="loading"></div>
      :
      <Row>
        <Colxx xxs="12">
          <Row>
            <Colxx xxs="">
              <Card className="mb-4">
                <CardBody>
                  <div className="text-center">
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >

                        <div
                          style={{
                            width: 200,
                            borderRadius: "50%",
                            overflow: "hidden",
                            height: "200px",
                          }}
                          className={"DropzoneExample"
                          }
                        >
                          {props.user.photoDocumentId ?
                            <img src={urlPath + '/api/images/' + props.user.photoDocumentId + '/view'} className="placeholder__avatar" />
                            :

                            <div className="placeholder__avatar_default">

                            </div>


                          }

                        </div>
                      </div>
                    </>
                    <CardSubtitle className=" text-large mb-1">{props.user.name}
                    </CardSubtitle>
                    <Row>
                      <Colxx sm="12">
                        <CardText className="text-muted text-one mb-4"><i className="iconsminds-email" /> E-mail : {props.user.email}</CardText>
                        <CardText className="text-muted text-one mb-4"><i className="simple-icon-user" /> Nom d'utilisateur : {props.user.login}</CardText>
                      </Colxx>
                      <Colxx sm="12">
                        <CardText className="text-muted text-one mb-4"><i className="simple-icon-user" /> Prénom : {props.user.firstname}</CardText>
                        <CardText className="text-muted text-one mb-4"><i className="simple-icon-user" /> Nom : {props.user.lastname}</CardText>
                      </Colxx>
                      <Colxx sm="12">
                        <CardText className="text-muted text-one mb-4"><i className="iconsminds-security-check" /> Role : </CardText>
                      </Colxx>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
  )
}

export default withRouter(UserCardExamples)
