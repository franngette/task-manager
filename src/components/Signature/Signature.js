import React, { useRef } from "react";
import Button from "../Button/index";
import SignatureCanvas from "react-signature-canvas";
import styles from "./style.module.scss";
const Signature = () => {
  const signatureRef = useRef(null);

  const handleClear = () => {
    signatureRef.current.clear();
  };
  const handleConfirm = () => {
    console.log(signatureRef.current.toDataURL().length);
  };

  return (
    <div>
      <div className={styles.container}>
        {" "}
        <SignatureCanvas
          ref={signatureRef}
          penColor="green"
          canvasProps={{ width: 300, height: 200, className: "sigCanvas" }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button type="button" variant="outline" onClick={() => handleClear()}>
          Borrar
        </Button>
        <Button type="button" variant="outline" onClick={() => handleConfirm()}>
          Confirmar
        </Button>
      </div>
    </div>
  );
};

export default Signature;
