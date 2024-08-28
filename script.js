// validate input
// input can't be only number
const inputBill = document.getElementById("input-bill");
const customTipInput = document.getElementById("custom-tip");
const numPeopleInput = document.getElementById("num-people");
const buttonTip = document.querySelectorAll("#button-tip div .radio");
const tipPerson = document.getElementById("tip-person");
const totalTip = document.getElementById("total-tip");
const resetButton = document.getElementById("reset");

const billLabel = inputBill.parentElement.querySelector("#bill-label span");
const peopleLabel = document.querySelector("#people-label span");

const isZero = (inputNumber) => {
  return inputNumber > 0;
};

inputBill.addEventListener("input", (e) => {
  if (isZero(parseInt(e.target.value))) {
    inputBill.classList = "";
    billLabel.classList = "";
  } else {
    inputBill.classList.add("incorrect-value");
    billLabel.classList.add("incorrect-label");
  }
});

numPeopleInput.addEventListener("input", (e) => {
  // console.log(parseInt(e.target.value));
  if (isZero(parseInt(e.target.value))) {
    numPeopleInput.classList = "";
    peopleLabel.classList = "";
  } else {
    numPeopleInput.classList.add("incorrect-value");
    peopleLabel.classList.add("incorrect-label");
  }
});
customTipInput.addEventListener("input", (e) => {
  if (isZero(parseInt(e.target.value))) {
    customTipInput.classList = "";
  } else {
    customTipInput.classList.add("incorrect-value");
  }
});
const inputs = [inputBill, customTipInput, numPeopleInput];

inputs.forEach((input) => {
  input.addEventListener("input", updateValues);
});
buttonTip.forEach((btn) => {
  btn.addEventListener("click", updateValues);
});

resetButton.addEventListener("click", () => {
  customTipInput.value = 0;
  inputBill.value = 0;
  numPeopleInput.value = 1;
  buttonTip.forEach((btn) => {
    btn.checked = false;
  });
  document.getElementById("p-5").checked = true;
  updateValues();
});

customTipInput.addEventListener("click", () => {
  buttonTip.forEach((btn) => {
    btn.checked = false;
  });
  updateValues();
});

function updateValues() {
  // declare variables to calculate the tip
  let customTip = customTipInput.value / 100;
  let bill = parseFloat(inputBill.value);
  let numPeople = parseFloat(numPeopleInput.value);
  let tip;
  // check which button is checked to get its value
  buttonTip.forEach((btn) => {
    if (btn.checked) {
      tip = parseFloat(btn.value);
    }
  });
  // if button value is undefined, get the custom tip value
  tip = tip === undefined ? customTip : tip;

  // declare amount of tip and total of tip
  let tipAmount = 0.0;
  let total = 0.0;
  // calculate the tip and the total tip
  tipAmount =
    numPeople <= 0 ? (tipAmount = 0.0) : ((bill * tip) / numPeople).toFixed(2);
  total =
    numPeople <= 0
      ? (total = 0.0)
      : ((bill * tip + bill) / numPeople).toFixed(2);

  // put total tip and tip amount in HTML
  tipPerson.innerHTML = tipAmount;
  totalTip.innerHTML = total;

  // if amount of tip and total tip is 0, disable the reset button. Otherwise, false.
  if (tipAmount == 0 && total == 0) {
    resetButton.disabled = true;
  } else {
    resetButton.disabled = false;
  }
}
window.onload = updateValues();
