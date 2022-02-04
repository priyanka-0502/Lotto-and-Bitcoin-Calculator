
function getNextLottoDraw() {
  var bitcoinOutput = function () {
    return (getBitcoinValue());
  }
  var output = function () {
    const inputDate = document.getElementById("dateTimeInput").value;
    const dateObj = new Date(inputDate);
    const firstDate = new Date('1988-04-16');
    const changeDate = new Date('1990-05-30');
    const day = dateObj.getDay();
    if ((dateObj < firstDate)) {
      return ("16/04/1988 20:00");
    } else if (day > 3 || dateObj <= changeDate) {
      var n = 6 - day;
    } else if (day <= 3 && dateObj > changeDate) {
      var n = 3 - day;
    }
    if (dateObj.getHours() >= 20 && n == 0 && day == 3) {
      n = 3;
    } else if (dateObj.getHours() >= 20 && n == 0 && day == 6) {
      n = 4;
    }
    const NextDateTime = dateObj.setDate(dateObj.getDate() + n);
    const nextDate = new Date(NextDateTime);
    return ((nextDate.toLocaleDateString()) + " " + "20:00");

  }
  document.getElementById("displayDate").innerHTML = output();
  bitcoinOutput();
}

window.addEventListener('load', () => {
  const todayDate = new Date();
  const inputElement = document.getElementById("dateTimeInput");
  inputElement.value = todayDate.toISOString().slice(0, 16);
});







