import React, { useRef } from "react";
import "./style.css";
import { MdClose } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Modal({
  postData,
  showModal,
  setShowModal,
  message,
  className,
  setInput,
  Input,
  isLoading,
  handleClick,
}) {
  const navigate = useNavigate();

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
                  {setTimeout(() => {
                    <h6>{message?.message}</h6>;
                  }, 1500)}
                  {navigate("/confirm-code")}
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
