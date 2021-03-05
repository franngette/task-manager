import React, { useRef, useEffect } from "react";
import styles from "./style.module.scss";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
const TableSubAcc = ({ headers, data, style }) => {
  const divRef = useRef(null);

  const scrollToBottom = () => {
    divRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
  };

  const formatSeconds = (seconds) => {
    if (!seconds) {
      return "Active";
    }
    var days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    var hrs = Math.floor(seconds / 3600);
    seconds -= hrs * 3600;
    var mnts = Math.floor(seconds / 60);
    seconds -= mnts * 60;
    return days + " days, " + hrs + " Hrs, " + mnts + " Minutes, " + seconds + " Seconds";
  };

  const renderTh = () => {
    return headers.map((e, i) => {
      return <th key={i}>{e}</th>;
    });
  };
  const renderData = () => {
    return data.map((e, i) => {
      return (
        <tr key={i} className={styles.tableRow} style={style} ref={divRef}>
          <td className={styles.tableData}>
            <div style={{ marginBottom: "0.25rem" }}>
              <p>
                <span className={styles.boldText}> Desde:</span> {moment(e.time_start).format("DD/MM/YYYY HH:mm:ss")}
              </p>
              <p>
                <span className={styles.boldText}> Hasta:</span>{" "}
                {e.time_stop ? moment(e.time_stop).format("DD/MM/YYYY HH:mm:ss") : "Activo"}{" "}
              </p>
            </div>
            {e.seconds && (
              <p>
                <span className={styles.boldText}> Total: </span>
                {formatSeconds(e.seconds)}
              </p>
            )}
          </td>
          <td className={styles.tableData}>
            <div style={{ marginBottom: "0.25rem" }}>
              <p>
                <span className={styles.boldText}>IP: </span>
                <a href={`http://${e.login_ip}`} target="_blank" rel="noreferrer">
                  {e.login_ip}
                </a>{" "}
              </p>
              <p>
                {" "}
                <span className={styles.boldText}>MAC: </span>
                {e.mac}
              </p>
            </div>
            <p>
              NAS:{" "}
              <a href={`http://${e.nas_ip}`} target="_blank" rel="noreferrer">
                {" "}
                {e.nas_ip}
              </a>
            </p>
          </td>
          <td className={styles.tableData}>
            <div className={styles.transfer}>
              <FontAwesomeIcon icon={faArrowCircleDown} size="1x" color="green" />
              <p>{formatBytes(e.bytes_down)}</p>
              <FontAwesomeIcon icon={faArrowCircleUp} size="1x" color="blue" />
              <p>{formatBytes(e.bytes_up)}</p>
            </div>
            <p></p>
          </td>
        </tr>
      );
    });
  };

  return (
    <table className={styles.tableWrapper}>
      <thead>
        <tr className={styles.tableHeader}>{renderTh()}</tr>
      </thead>
      <tbody className={styles.tbody}>{renderData()}</tbody>
    </table>
  );
};

export default TableSubAcc;
