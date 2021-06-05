const confirmButton = document.getElementById("confirm");
const rejectButton = document.getElementById("reject");

//!!!!!This is a really important variable
//Better to be put elsewhere or inside process.ENV
const serverAdress = "https://server.rezerwuj.site";

const { innerText: time } = document.getElementById("time");
const { innerText: people } = document.getElementById("people");
const { innerText: date } = document.getElementById("date");
const { innerText: clientNumber } = document.getElementById("clientNumber");

const sendResponseToClient = (isConfirmed, date, time, people, clientNumber) =>
    fetch(
        `${serverAdress}/client-response?isConfirmed=${
      isConfirmed ? "true" : "false"
    }&date=${date}&time=${time}&people=${people}&clientNumber=${clientNumber}`
    );

confirmButton.addEventListener("click", () => {
    sendResponseToClient(true, date, time, people, clientNumber);
    location.href = "afterClick";
});

rejectButton.addEventListener("click", () => {
    sendResponseToClient(false, date, time, people, clientNumber);
    location.href = "afterClick";
});