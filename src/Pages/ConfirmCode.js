import Header from "../Components/Header";
import { MdClose } from "react-icons/md";
import "./style.css";
import { useState } from "react";

export default function ConfirmCode({
  code,
  confirmCode,
  messageConfirm,
  setCode,
  phone,
  showModal,
  setShowModal,
  sendCode,
  resendCode,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="confirm-code">
      <Header />

      <div className="code-container">
        <h2>التأكد من رقم هاتفك المحمول </h2>
        <p>
          أدخل كود التحقق الذي تم ارساله عبر الرسائل القصيرة على رقم الهاتف
          {phone}
        </p>
        <input
          type="text"
          onChange={(e) => setCode(e.target.value)}
          placeholder="أدخل كود التحقق"
        />

        <button
          onClick={() => {
            confirmCode();
            setModalOpen(true);
          }}
        >
          ارسال
        </button>
        <button
          className="send-again"
          onClick={() => {
            sendCode();
            setModalOpen(true);
          }}
        >
          اعادة ارسال الكود
        </button>

        {modalOpen && (
          <div className="background">
            <div className="modal-wrapper">
              <div className="modal-content">
                <h6>{messageConfirm?.message}</h6>

                <MdClose
                  className="close-btn"
                  aria-label="Close modal"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {/* {resendCode?.status === false && <h6>{resendCode?.message}</h6>}
        {resendCode?.status === true && <h6>{resendCode?.message}</h6>} */}

        {modalOpen && (
          <div className="background">
            <div className="modal-wrapper">
              <div className="modal-content">
                <h6>{resendCode?.message}</h6>

                <MdClose
                  className="close-btn"
                  aria-label="Close modal"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
