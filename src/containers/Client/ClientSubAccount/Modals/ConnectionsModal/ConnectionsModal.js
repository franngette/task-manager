import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import ConnectionsTable from "../../Tables/ConnectionsTable/ConnectionsTable";
import Spinner from "../../../../../components/Spinner/index";
import Button from "../../../../../components/Button/index";
import CalendarButton from "../../../../../components/Calendar/CalendarButton/index";
import { getSubAccountConnections } from "../../../../../api/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ConnectionsModal = ({ connectSubAcc, onClose, login }) => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [tableData, setTableData] = useState(connectSubAcc);

  const getConnections = () => {
    getSubAccountConnections(login, dateFrom, dateTo).then((res) => setTableData(res));
  };

  useEffect(() => {
    getSubAccountConnections(login, dateFrom, dateTo).then((res) => setTableData(res));
  }, []);

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <label htmlFor="dateFrom">
            <h4>
              <span className={styles.boldText}>Desde</span>
            </h4>
          </label>
          <CalendarButton
            type={"date"}
            id="dateFrom"
            value={dateFrom}
            name="cuadrillaDate"
            onChange={(event) => setDateFrom(event.target.value)}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="dateTo">
            <h4>
              <span className={styles.boldText}>Hasta</span>
            </h4>
          </label>
          <CalendarButton
            type={"date"}
            id="dateTo"
            value={dateTo}
            name="cuadrillaDate"
            onChange={(event) => setDateTo(event.target.value)}
          />
        </div>
        <Button variant="dark" onClick={() => getConnections()}>
          <FontAwesomeIcon icon={faSearch} color={"white"} />
        </Button>
      </div>
      <div className={styles.content}>
        {tableData?.length > 0 ? (
          <ConnectionsTable headers={["Tiempo de sesion", "IP", "Ancho de banda"]} data={tableData} />
        ) : (
          <div className={styles.contentCentered}>
            <Spinner color="#4299e1" size="2rem" />
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <Button type="button" variant="outline" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </div>
  );
};

export default ConnectionsModal;
