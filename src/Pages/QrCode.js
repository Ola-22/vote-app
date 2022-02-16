import { useState, useEffect } from "react";
import QRCode from "qrcode";

export default function QrCode({ text }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    QRCode.toDataURL(text).then((data) => {
      setSrc(data);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "375px",
        height: "813px",
      }}
    >
      <img src={src} alt="" width="193" height="193" />
    </div>
  );
}
