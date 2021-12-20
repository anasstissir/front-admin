import React from "react";

const Avatar = (props) => {
  return (
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
        {props.user &&  props.user.photoDocumentId ?
          <img src={urlPath + '/api/images/' + props.user.photoDocumentId + '/view'} className="placeholder__avatar" />
          :
          <div className="placeholder__avatar_default">

          </div>
        }

      </div>
    </div>
  </>
  );
};

export default Avatar;
