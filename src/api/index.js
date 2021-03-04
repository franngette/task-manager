import instance from "./axios";


export async function getServices() {
  let result = await instance.get("/task/services");
  return result.data;
}

export async function getTaskTypes() {
  const res = await instance.get("/task/type");
  const data = await res.data;
  return data;
}

export async function getSubAccountConnections(username, months) {
  let result = await instance.get(`clients/sub_clients/connections/${username}/${months}`);
  return result.data;
}

export async function getSubAccountData(id_service, id_sub_account) {
  let result = await instance.get(`/clients/sub_client/${id_service}/${id_sub_account}`);
  return result.data;
}

export async function getClientSubAccounts(id_service, id_account) {
  let result = await instance.get(`/clients/sub_clients/${id_service}/${id_account}`);
  return result.data;
}

export async function getClients(id_service, account_name, account_number, doc_number, phone_number) {
  var json_data = {
    id_service: id_service,
    account_name: account_name,
    account_number: account_number,
    doc_number: doc_number,
    phone_number: phone_number,
  };
  let result = await instance.post("clients", JSON.stringify(json_data));
  return result.data;
}

export async function getLoginUser(username, password) {
  const json_data = {
    username,
    password,
  };
  let result = await instance.post("/login", JSON.stringify(json_data));
  return result.data;
}

export async function getCalendar(id_service, from_date = "") {
  let url = `/task/calendar/${id_service}`;
  if (from_date.length > 0) {
    url = `/task/calendar/${id_service}/${from_date}`;
  }
  const res = await instance.get(url);
  const data = res.data;
  return data;
}

// DEJAR UNA DE LAS DOS
export async function getStates() {
  const res = await instance.get(`/task/status`);
  const data = await res.data;
  return data;
}

export async function getStatus() {
  const res = await instance.get(`/task/status`);
  const data = await res.data;
  return data;
}

export async function getTasks(
  id_service,
  task_number,
  account_number,
  doc_number,
  ids_task_type,
  ids_service_type,
  ids_state,
  ids_region
) {
  var json_data = {
    id_service: id_service,
    task_number: task_number,
    account_number: account_number,
    doc_number: doc_number,
    ids_task_type: ids_task_type,
    ids_service_type: ids_service_type,
    ids_state: ids_state,
    ids_region: ids_region,
  };
  const res = await instance.post("/tasks", JSON.stringify(json_data));
  const data = res.data;
  return data;
}

export async function getTask(id_service, id_task) {
  const res = await instance.get(`/task/${id_service}/${id_task}`);
  const data = await res.data;
  return data;
}

export async function getStatusTask(id_task) {
  const res = await instance.get(`/task/status/${id_task}`);
  const data = await res.data;
  return data;
}

export async function createStatusTask(id_calendar, id_status) {
  const json_data = {
    id_calendar,
    id_status,
  };
  const res = await instance.post(`/task/status`, JSON.stringify(json_data));
  const data = res.data;
  return data;
}

/* export async function getCalendar(id_service, from_date = '') {
  let url = `http://localhost:4000/task/calendar/${id_service}`
  if (from_date.length > 0) {
    url = `http://localhost:4000/task/calendar/${id_service}/${from_date}`
  }
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.data
  return data
} */

export async function getTeams(id_service) {
  const res = await instance.get(`/task/teams/${id_service}/false`);
  const data = await res.data;
  return data;
}

export async function createCalendar(id_task, date, id_team, priority) {
  var json_data = {
    id_task: id_task,
    date: date,
    id_team: id_team,
    priority: priority,
  };
  const res = await instance.get("/task/calendar", JSON.stringify(json_data));
  const data = res.data;
  return data;
}

export async function getOperators(id_service, id_team) {
  const res = await instance.get(`/task/operatorsAvailable/${id_service}/${id_team}`);
  const data = await res.data;
  return data;
}

export async function getVehicles(id_service, id_team) {
  const res = await instance.get(`/task/vehiclesAvailable/${id_service}/${id_team}`);
  const data = await res.data;
  return data;
}

export async function createTeam(id_service, id_vehicle, ids_operator) {
  let id_vehicle_send = id_vehicle.id;
  let ids_operators_send = "";
  ids_operator.forEach((element) => {
    ids_operators_send += element.id + ",";
  });
  ids_operators_send = ids_operators_send.slice(0, -1);
  var json_data = {
    id_service: id_service,
    id_vehicle: id_vehicle_send,
    ids_operator: ids_operators_send,
  };
  const res = await instance.post("/task/team", JSON.stringify(json_data));
  const data = res.data;
  return data;
}

export async function updateTeam(id_service, id_team, id_vehicle, ids_operator) {
  let id_vehicle_send = id_vehicle.id;
  let ids_operators_send = "";
  ids_operator.forEach((element) => {
    ids_operators_send += element.id + ",";
  });
  ids_operators_send = ids_operators_send.slice(0, -1);
  var json_data = {
    id_service: id_service,
    id_team: id_team,
    id_vehicle: id_vehicle_send,
    ids_operator: ids_operators_send,
  };
  const res = await instance.put("/task/team", JSON.stringify(json_data));
  const data = res.data;
  return data;
}

export async function updateCalendarTask(id_calendar, id_task, date, id_team, priority) {
  var json_data = {
    id_calendar: id_calendar,
    id_task: id_task,
    date: date,
    id_team: id_team,
    priority: priority,
  };
  let res = await instance.put("/task/calendar", JSON.stringify(json_data));
  const data = await res.data;
  return data;
}

/*
export async function getInconvenientes(service) {
  const res = await fetch(`http://181.41.240.18:4000/Inconvenientes/${service}`);
  const data = res.data;
  return data;
}

export async function getSoluciones(service) {
  const res = await fetch(`http://181.41.240.18:4000/soluciones/${service}`);
  const data = res.data;
  return data;
}

export async function getTipos() {
  const res = await fetch('http://181.41.240.18:4000/tipos');
  const data = res.data;
  return data;
}
*/
