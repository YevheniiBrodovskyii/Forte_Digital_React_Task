import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

import "./styles/editIntern.sass";

const EditIntern = () => {
  const { id } = useParams();
  const [name, inputName] = useState("");
  const [email, inputEmail] = useState("");
  const [start, inputStart] = useState("");
  const [end, inputEnd] = useState("");

  const [errorNameEmpty, isErrorNameEmpty] = useState(false);
  const [errorEmailValid, isErrorEmailValid] = useState(false);
  const [errorStartEmpty, isErrorStartEmpty] = useState(false);
  const [errorEndEmpty, isErrorEndEmpty] = useState(false);
  const [errorDate, isErrorDate] = useState(false);

  useEffect(() => {
    const fetchIntern = async () => {
      const response = await fetch(`http://localhost:3001/interns/${id}`);
      const intern = await response.json();
      console.log(intern);
      inputName(intern.name);
      inputEmail(intern.email);
      inputStart(intern.internshipStart.slice(0, 10));
      inputEnd(intern.internshipEnd.slice(0, 10));
    };
    fetchIntern();
    console.log(`I want to get intern with id: ${id}!`);
  }, [id]);

  useEffect(() => {
    const validEmail = new RegExp(/^\S+@\S+\.\S+$/);
    let startDate = new Date(start).getTime();
    let endDate = new Date(end).getTime();

    isErrorDate(startDate > endDate || startDate === endDate);
    isErrorNameEmpty(name.trim() === "");
    isErrorEmailValid(email.trim() === "" || !validEmail.test(email));
    isErrorStartEmpty(start.trim() === "");
    isErrorEndEmpty(end.trim() === "");
  }, [start, end, name, email]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (
      errorNameEmpty ||
      errorEmailValid ||
      errorStartEmpty ||
      errorEndEmpty ||
      errorDate
    ) {
      console.log("Error");
    } else {
      let newIntern = {
        name: name,
        email: email,
        internshipStart: start + "T00:00+00Z",
        internshipEnd: end + "T00:00+00Z",
      };

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIntern),
      };
      fetch(`http://localhost:3001/interns/${id}`, requestOptions).then(
        (response) => response.json()
      );
      console.log("Updated");
    }
  };

  return (
    <div className="container">
      <img className="Logo" src="../assets/logo.svg" alt="logo" />
      <section className="EditIntern">
        <NavLink to="/">
          <button className="EditIntern_back">
            <img
              className="EditIntern_back-img"
              src="../assets/button_back_icon.svg"
              alt="button_back"
            />
            Back to list
          </button>
        </NavLink>
        <form className="EditIntern_form">
          <h4 className="EditIntern_form-title">Edit</h4>
          <label className="EditIntern_form-label EditIntern_form-label_name">
            Full name *
          </label>
          <input
            className={
              errorNameEmpty
                ? "EditIntern_form-input EditIntern_form-input_name  EditIntern_form-input--error"
                : "EditIntern_form-input EditIntern_form-input_name"
            }
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              inputName(e.target.value);
            }}
          />
          {errorNameEmpty ? (
            <>
              <img
                className="EditIntern_form-error_name--icon"
                src="../assets/error_icon.svg"
                alt="error"
              />
              <span className="EditIntern_form-error EditIntern_form-error_name">
                Name can't be empty
              </span>
            </>
          ) : (
            <></>
          )}

          <label className="EditIntern_form-label EditIntern_form-label_email">
            Email address *
          </label>
          <input
            className={
              errorEmailValid
                ? "EditIntern_form-input EditIntern_form-input_email EditIntern_form-input--error"
                : "EditIntern_form-input EditIntern_form-input_email"
            }
            type="text"
            name="email"
            value={email}
            onChange={(e) => {
              inputEmail(e.target.value);
            }}
          />
          {errorEmailValid ? (
            <>
              <img
                className="EditIntern_form-error_email--icon"
                src="../assets/error_icon.svg"
                alt="error"
              />
              <span className="EditIntern_form-error EditIntern_form-error_email">
                Example: email@gmail.com
              </span>
            </>
          ) : (
            <></>
          )}

          <label className="EditIntern_form-label EditIntern_form-label_start">
            Internship start *
          </label>
          <input
            className={
              errorStartEmpty
                ? "EditIntern_form-input EditIntern_form-input_start EditIntern_form-input--error"
                : "EditIntern_form-input EditIntern_form-input_start"
            }
            type="date"
            name="email"
            value={start}
            onChange={(e) => {
              inputStart(e.target.value);
            }}
          />
          {errorStartEmpty ? (
            <>
              <img
                className="EditIntern_form-error_start--icon"
                src="../assets/error_icon.svg"
                alt="error"
              />
              <span className="EditIntern_form-error EditIntern_form-error_start">
                Start date can't be empty
              </span>
            </>
          ) : (
            <></>
          )}

          <label className="EditIntern_form-label EditIntern_form-label_end">
            Internship end *
          </label>
          <input
            className={
              errorEndEmpty
                ? "EditIntern_form-input EditIntern_form-input_end EditIntern_form-input--error"
                : "EditIntern_form-input EditIntern_form-input_end"
            }
            type="date"
            name="email"
            value={end}
            onChange={(e) => {
              inputEnd(e.target.value);
            }}
          />
          {errorEndEmpty ? (
            <>
              <img
                className="EditIntern_form-error_end--icon"
                src="../assets/error_icon.svg"
                alt="error"
              />
              <span className="EditIntern_form-error EditIntern_form-error_end">
                End date can't be empty
              </span>
            </>
          ) : (
            <></>
          )}
          {errorDate ? (
            <>
              <img
                className="EditIntern_form-error_start--icon"
                src="../assets/error_icon.svg"
                alt="error"
              />
              <img
                className="EditIntern_form-error_end--icon"
                src="../assets/error_icon.svg"
                alt="error"
              />
              <span className="EditIntern_form-error EditIntern_form-error_date">
                Start date more or equal to end date
              </span>
            </>
          ) : (
            <></>
          )}

          <input
            className="EditIntern_form-submit"
            type="submit"
            value="Submit"
            onClick={onFormSubmit}
          />
        </form>
      </section>
    </div>
  );
};

export default EditIntern;
