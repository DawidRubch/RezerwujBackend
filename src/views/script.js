const confirmButton = document.getElementById("confirm");
const rejectButton = document.getElementById("reject");

const serverAdress = "https://localhost:5000";

const { innerText: time } = document.getElementById("time");
const { innerText: people } = document.getElementById("people");
const { innerText: date } = document.getElementById("date");

const sendResponseToClient = (isConfirmed, date, time, people, clientNumber) =>
    fetch(
        `${serverAdress}/client-response?isConfirmed=${
      isConfirmed ? "true" : "false"
    }&date=${date}&time=${time}&people=${people}&clientNumber=${clientNumber}`
    );

confirmButton.addEventListener("click", () => {
    sendResponseToClient(true, date, time, people);
    location.href = "afterClick";
});

rejectButton.addEventListener("click", () => {
    sendResponseToClient(false, date, time, people);
    location.href = "afterClick";
});