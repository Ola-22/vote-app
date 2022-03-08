import React, { useRef } from "react";
import "./style.css";
import { MdClose } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";

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

  return (
    <>
      {showModal && (
        <div className="background" onClick={closeModal} ref={modalRef}>
          <div className="modal-wrapper">
            <div className="modal-content">
              <div className="input-phone">
                <PhoneInput country={"ps"} value={Input} onChange={setInput} />
              </div>
              {!loading && (
                <button
                  onClick={() => {
                    handleClick();
                    postData();
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

              {message?.status === false && <h6>{message?.message}</h6>}
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
