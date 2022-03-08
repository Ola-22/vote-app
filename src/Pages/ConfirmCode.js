import Header from "../Components/Header";
import { MdClose } from "react-icons/md";
import "./style.css";
import { useState } from "react";
import InputCode from "../Components/InputCode";

export default function ConfirmCode({
  confirmCode,
  messageConfirm,
  sendCode,
  resendCode,
  Input,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSend, setModalSend] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="confirm-code">
      <Header />

      <div className="code-container">
        <h2>التأكد من رقم هاتفك المحمول </h2>
        <p>
          أدخل كود التحقق الذي تم ارساله عبر الرسائل القصيرة على رقم الهاتف
          {Input}
        </p>
        <div className="code-box">
          <InputCode
            loading={loading}
            onComplete={(code) => {
              setLoading(true);
              setTimeout(() => setLoading(false), 10000);
            }}
          />
        </div>
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
            setModalSend(true);
          }}
        >
          اعادة ارسال الكود
        </button>

        {messageConfirm?.status === true && (
          <>
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
          </>
        )}

        {messageConfirm?.status === false && (
          <>
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
          </>
        )}

        {resendCode?.status === false && (
          <>
            {modalSend && (
              <div className="background">
                <div className="modal-wrapper">
                  <div className="modal-content">
                    <h6>{resendCode?.message}</h6>

                    <MdClose
                      className="close-btn"
                      aria-label="Close modal"
                      onClick={() => {
                        setModalSend(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {resendCode?.status === true && (
          <>
            {modalSend && (
              <div className="background">
                <div className="modal-wrapper">
                  <div className="modal-content">
                    <h6>{resendCode?.message}</h6>

                    <MdClose
                      className="close-btn"
                      aria-label="Close modal"
                      onClick={() => {
                        setModalSend(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
