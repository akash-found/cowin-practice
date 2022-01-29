import React, { useState, useEffect, useRef } from "react";
import "./Dropdown.css";
function Dropdown(props) {
  const reference = useRef(null);
  const [clicked, setClicked] = useState(false);
  const val = useRef(clicked);
  function listenerfunction(e) {
    if (!val.current) {
      val.current = !val.current;
    } else {
      if (reference.current && !reference.current.contains(e.target)) {
        reference.current.style.opacity = 0;
        reference.current.style.pointerEvents = "none";
        document.removeEventListener("click", listenerfunction);
        setClicked(false);
      }
    }
  }
  function setter(e) {
    setClicked(!clicked);
    val.current = clicked;

    reference.current.style.opacity = 1;
    reference.current.style.pointerEvents = "auto";
    document.addEventListener("click", listenerfunction);
  }

  return (
    <div className="dropdown-parent">
      <div className="Dropdown-parent-title" onClick={setter}>
        {props.name}
      </div>
      <div className="dropdown-child" ref={reference}>
        <div className="dropdown-child_list">{props.children} </div>
      </div>
    </div>
  );
}

export default Dropdown;
