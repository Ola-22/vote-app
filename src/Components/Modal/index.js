import React, { useRef } from "react";
import "./style.css";
import { MdClose } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Modal({
  postData,
  showModal,
  setShowModal,
  message,
  setInput,
  Input,
  setName,
  name,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorName, setErrorName] = useState(false);

  const navigate = useNavigate();

  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  function handleClick() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  function handleChange(e) {
    if (Input.length < 8) {
      setError("*حقل الهاتف مطلوب");
    } else if (name.length === 0) {
      setError("");
    }

    if (name.length === 0) {
      setErrorName("*حقل الاسم مطلوب");
    } else if (name.length < 3) {
      setErrorName("*حقل الاسم يجب أن يكون 4 حروف على  الأقل");
    } else {
      setErrorName("");
    }

    if (Input.length === 8 && name.length > 0 && message?.status === true) {
      setTimeout(() => {
        setShowModal(false);
        navigate("/confirm-code");
      }, 1000);
    }
  }

  function onChange(e) {
    if (e.target.value.match(/[0-9]+$/gi)) {
      setErrorName("*يجب ان يتكون حقل الاسم من حروف فقط");
      setName(e.target.value);
    } else {
      setErrorName("");
      setName(e.target.value);
    }
  }

  return (
    <>
      {showModal && (
        <div className="background" onClick={closeModal} ref={modalRef}>
          <div className="modal-wrapper">
            <div className="modal-content">
              <div className="name-container">
                <label htmlFor="name"> الاسم:</label>
                <input
                  type="text"
                  placeholder="ادخل الاسم"
                  onChange={onChange}
                  className={errorName === true ? "borderError" : ""}
                />
              </div>
              <h4 className="error">{errorName}</h4>

              <div className="phone-container">
                <label htmlFor="phone"> رقم الهاتف:</label>{" "}
                <div
                  className={
                    error === true ? "input-phone borderError" : "input-phone"
                  }
                >
                  <div className="logo-qatar">
                    <img
                      src="/images/Qatar.jpg"
                      width="15"
                      height="15"
                      alt=""
                    />
                  </div>
                  <h6>974</h6>
                  <input
                    name="phone"
                    className="phone-input"
                    type="tel"
                    maxLength="8"
                    onChange={(e) => setInput(e.target.value)}
                    required
                  />
                </div>
              </div>
              <h4 className="error">{error}</h4>

              {!loading && (
                <button
                  onClick={() => {
                    handleClick();
                    postData();
                    handleChange();
                  }}
                >
                  تأكيد
                </button>
              )}

              {loading && (
                <button
                  disabled
                  onClick={() => {
                    handleClick();
                    postData();
                    handleChange();
                  }}
                >
                  <FaSpinner icon="spinner" />
                  تأكيد
                </button>
              )}

              {message?.status === true && (
                <>
                  <h6>{message?.message}</h6>
                </>
              )}

              {message?.status === false && (
                <>
                  <h6>{message?.message}</h6>
                </>
              )}
            </div>
            <MdClose
              className="close-btn"
              aria-label="Close modal"
              onClick={() => {
                setShowModal((prev) => !prev);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
