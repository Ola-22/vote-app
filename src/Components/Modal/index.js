import React, { useRef } from "react";
import "./style.css";
import { MdClose } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Modal({
  postData,
  showModal,
  setShowModal,
  message,
  setInput,
  isLoading,
  handleClick,
}) {
  const navigate = useNavigate();

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

  return (
    <>
      {showModal && (
        <div className="background" onClick={closeModal} ref={modalRef}>
          <div className="modal-wrapper">
            <div className="modal-content">
              <input
                type="tel"
                placeholder="Enter your phone"
                onChange={(e) => setInput(e.target.value)}
              />
              {!isLoading && (
                <button
                  onClick={() => {
                    handleClick();
                    postData();
                  }}
                  style={{ backgroundColor: "#2e558d" }}
                >
                  تأكيد
                </button>
              )}

              {isLoading && (
                <button
                  disabled
                  onClick={() => {
                    handleClick();
                    postData();
                  }}
                  style={{ backgroundColor: "#2e558d" }}
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
