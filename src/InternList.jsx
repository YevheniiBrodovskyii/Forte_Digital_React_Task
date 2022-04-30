import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./styles/internList.sass";
const InternList = () => {
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    const fetchInterns = async () => {
      const response = await fetch("http://localhost:3001/interns");
      const interns = await response.json();
      setInterns(interns);
    };
    fetchInterns();
  }, []);

  return (
    <div className="container">
      <img className="Logo" src="./logo.svg" alt="logo" />
      <div className="InternList">
        <h1 className="InternList_title">Participants</h1>
        <ul className="InternList_ul">
          {interns.map((u) => (
            <li className="InternList_ul-li" key={u.id}>
              <h3 className="InternList_ul-li--name">{u.name}</h3>
              <NavLink to={`/interns/${u.id}`}>
                <button className="InternList_ul-li--button">
                  <img
                    className="InternList_ul-li--button_img"
                    src="./button_icon.svg"
                    alt="button_icon"
                  />{" "}
                  Edit
                </button>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InternList;
