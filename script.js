let slider = document.getElementById("passLength");
let sliderValue = document.querySelector(".slider-value");
const boxes = document.querySelectorAll(".lvl-boxes .box");
const strengthTxt = document.querySelector(".strength-txt");
const checkboxes = document.querySelectorAll(
  '.checkbox input[type="checkbox"]'
);
let password = document.querySelector(".password");
let generate = document.querySelector(".generate");
/////ფერი რო დასედევდეს
slider.addEventListener("input", function () {
  const value = (this.value - this.min) / (this.max - this.min);
  const trackColor = `linear-gradient(90deg, #A4FFAF ${value * 100}%, #ffffff ${
    value * 100
  }%)`;
  this.style.background = trackColor;
});
/////რანდომ
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()-_=+";

function generatePassword() {
  let passLength = parseInt(slider.value);
  let includeUppercase = document.querySelector(
    '.checkbox input[type="checkbox"].uppercase'
  ).checked;
  let includeLowercase = document.querySelector(
    '.checkbox input[type="checkbox"].lowercase'
  ).checked;
  let includeNumbers = document.querySelector(
    '.checkbox input[type="checkbox"].numbers'
  ).checked;
  let includeSymbols = document.querySelector(
    '.checkbox input[type="checkbox"].symbols'
  ).checked;

  let result = "";
  if (includeUppercase) result += uppercaseChars;
  if (includeLowercase) result += lowercaseChars;
  if (includeNumbers) result += numberChars;
  if (includeSymbols) result += symbolChars;

  let pass = "";
  for (let i = 0; i < passLength; i++) {
    const randomIndex = Math.floor(Math.random() * result.length);
    pass += result[randomIndex];
  }

  return pass;
}

slider.addEventListener("input", function () {
  sliderValue.textContent = this.value;
});

generate.addEventListener("click", function () {
  let generatedPassword = generatePassword();
  password.textContent = generatedPassword;
});

sliderValue.textContent = slider.value;

function copied() {
  navigator.clipboard
    .writeText(password)
    .then(() => {
      // Show "COPIED" message
      let copiedMessage = document.querySelector(".copied");
      copiedMessage.style.display = "inline-block";
      setTimeout(() => {
        copiedMessage.style.display = "none";
      }, 2000); // Hide "COPIED" message after 2 seconds
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

// sliderValue.textContent = slider.value;
// slider.oninput = function () {
//   sliderValue.textContent = this.value;
// };
// oninput-მეთოდი

/// ეს ჩვეულებრივ-რიცხვის დაწერა
sliderValue.textContent = slider.value;

slider.addEventListener("input", function () {
  sliderValue.textContent = this.value;
});
/////////////

const colors = ["#FF5733", "#FF5733", "#FFFF33", "#77FF33"];

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", updateStrength);
});

function updateStrength() {
  const checkedCheckboxes = document.querySelectorAll(
    '.checkbox input[type="checkbox"]:checked'
  );
  const strengthLevel = checkedCheckboxes.length;

  boxes.forEach((box, index) => {
    box.style.backgroundColor =
      index < strengthLevel ? colors[strengthLevel - 1] : "#fff";
  });

  // Update the strength text
  switch (strengthLevel) {
    case 0:
      strengthTxt.textContent = "";
      break;
    case 1:
      strengthTxt.textContent = "TOO WEAK!";
      break;
    case 2:
      strengthTxt.textContent = "WEAK!";
      break;
    case 3:
      strengthTxt.textContent = "MEDIUM";
      break;
    default:
      strengthTxt.textContent = "STRONG";
      break;
  }
}
