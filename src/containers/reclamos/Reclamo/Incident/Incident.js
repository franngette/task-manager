import React from "react";
import Card from "../../../../components/Card/index";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarMinus } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const Incident = ({ incident }) => {
  return (
    <div style={{ margin: "0.5rem" }}>
      <Card>
        <div className={styles.card_content}>
          <div className={styles.card_item}>
            <div style={{ display: "flex" }}>
              <div className={styles.mh}>
                <FontAwesomeIcon className={styles.icon} icon={faCalendarMinus} size="1x" />
              </div>
              <p>{moment(incident.date_incident).format("DD-MM-YYYY")}</p>
            </div>
          </div>
          <div className={styles.card_item}>
            <p>{incident.description}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Incident;
