import React, { useRef } from "react";
import "./style.css";
import { MdClose } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Modal({
  postData,
  showModal,
  setShowModal,
  message,
  setInput,
  Input,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    message?.status === true &&
      setTimeout(() => {
        setShowModal(false);
        navigate("/confirm-code");
      }, 1000);
  });

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
      setError(true);
    } else {
      setError(false);
    }
  }
  return (
    <>
      {showModal && (
        <div className="background" onClick={closeModal} ref={modalRef}>
          <div className="modal-wrapper">
            <div className="modal-content">
              <div className="input-phone">
                <div className="logo-qatar">
                  <img src="/images/Qatar.jpg" width="15" height="15" alt="" />
                </div>
                <h6>974</h6>
                <input
                  className="phone-input"
                  type="tel"
                  maxLength="8"
                  onChange={(e) => setInput(e.target.value)}
                  required
                  pattern=""
                />
              </div>
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
              {error && <div className="error">رقم الهاتف غير صحيح</div>}

              {message?.status === true && (
                <>
                  <h6>{message?.message}</h6>
                </>
              )}

              {Input.length === 8 && <h6>{message?.message}</h6>}
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
