const confirmButton = document.getElementById("confirm");
const rejectButton = document.getElementById("reject");

const serverAdress = "https://server.rezerwuj.co";

const { innerText: time } = document.getElementById("time");
const { innerText: people } = document.getElementById("people");
const { innerText: date } = document.getElementById("date");

const sendResponseToClient = (
    isConfirmed,
    date,
    time,
    people,
    clientNumber
) => {};
// fetch(
//     `https://server.rezerwuj.co/clientResponse?isConfirmed=${isConfirmed}&date=${date}&time=${time}&people=${people}&clientNumber=${clientNumber}`
// );

confirmButton.addEventListener("click", (event) => {
    console.log("Confirm");
    sendResponseToClient(true, date, time, people);
    location.href = "afterClick"
});

rejectButton.addEventListener("click", (event) => {
    console.log("Reject");
});