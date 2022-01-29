import React from "react";
import "./InformationBar.css";
function InformationBar(props) {
  const setData = () => {
    if (Object.keys(props.data).length === 0) return null;
    else
      return props.data.topBlock[props.path][
        props.first.value
      ].toLocaleString();
  };

  return (
    <div className="first-info-bar-container">
      <div className="first-info-bar-container_logo">
        <img
          className="first-info-bar-container_logo_tag"
          src={props.logo}
          alt="Logo"
        ></img>
      </div>
      <div className="first-info-bar-container_content">
        <div className="first-info-bar-container_content_upper">
          <div className="first-info-bar-container_content_upper_first">
            {props.first.title}
          </div>
          <div>
            <b>{setData()}</b>
          </div>
          <div className="first-info-bar-container_content_upper_second"></div>
        </div>
        <div className="first-info-bar-container_content_lower">
          <div className="first-info-bar-container_content_lower_first">
            <div className="first-info-bar-container_content_lower_title">
              {props.second.title}
            </div>
            <div>
              {Object.keys(props.data).length === 0
                ? null
                : props.data.topBlock[props.path][
                    props.second.value
                  ].toLocaleString()}
            </div>
          </div>
          <div className="first-info-bar-container_content_lower_second">
            <div className="first-info-bar-container_content_lower_title">
              {props.third.title}
            </div>
            <div>
              {Object.keys(props.data).length === 0
                ? null
                : props.data.topBlock[props.path][
                    props.third.value
                  ].toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationBar;
