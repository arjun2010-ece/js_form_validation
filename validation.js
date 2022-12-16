const form = document.getElementById("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cnfpassword = document.getElementById("cnfpassword");
const dateOfBirth = document.getElementById("date1");
const image = document.getElementById("image");
const skillOneEl = document.getElementById("skill1");
const skillTwoEl = document.getElementById("skill2");
const skillThreeEl = document.getElementById("skill3");
const skillFourEl = document.getElementById("skill4");
const skillFiveEl = document.getElementById("skill5");
const skillSixEl = document.getElementById("skill6");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const cnfpasswordValue = cnfpassword.value.trim();
  const dateOfBirthValue = dateOfBirth.value.trim();
  const imageValue = image.value.trim();

  if (firstNameValue === "") {
    setErrorFor(firstName, "Firstname cannot be blank");
  } else {
    setSuccessFor(firstName);
  }

  if (imageValue === "") {
    setErrorFor(image, "Please select an image");
  } else {
    setSuccessFor(image);
  }

  if (dateOfBirthValue === "") {
    setErrorFor(dateOfBirth, "Please enter your Date Of Birth");
  } else {
    setSuccessFor(dateOfBirth);
  }

  if (lastNameValue === "") {
    setErrorFor(lastName, "Lastname cannot be blank");
  } else {
    setSuccessFor(lastName);
  }

  if (emailValue === "") {
    setErrorFor(email, "Email cannot be blank");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Not a valid email");
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "Password cannot be blank");
  } else {
    setSuccessFor(password);
  }

  if (cnfpasswordValue === "") {
    setErrorFor(cnfpassword, "Confirm Password cannot be blank");
  } else if (passwordValue !== cnfpasswordValue) {
    setErrorFor(cnfpassword, "Passwords does not match");
  } else {
    setSuccessFor(cnfpassword);
  }

  // For checkbox validation
  if (
    !skillOneEl.checked &&
    !skillTwoEl.checked &&
    !skillThreeEl.checked &&
    !skillFourEl.checked &&
    !skillFiveEl.checked &&
    !skillSixEl.checked
  ) {
    setErrorFor(skillOneEl, "Please select atleast one skills", "checkbox");
  } else {
    setSuccessFor(skillOneEl, "checkbox", "skills-list");
  }

  // For Radio box validation
  let valid = false;
  const radioGroups = document.infoForm.gender;
  const maleRadioEl = document.getElementById("male");
  for (let i = 0; i < radioGroups.length; i++) {
    if (radioGroups[i].checked) {
      valid = true;
      break;
    }
  }

  if (!valid) {
    setErrorFor(maleRadioEl, "Please select one gender", "radio");
  } else {
    setSuccessFor(maleRadioEl, "radio", "genders");
  }

  // Collecting all the forms elements value

  // for checkboxes values
  const skills = [];
  if (skillOneEl.checked) {
    skills.push(skillOneEl.value);
  }
  if (skillTwoEl.checked) {
    skills.push(skillTwoEl.value);
  }

  if (skillThreeEl.checked) {
    skills.push(skillThreeEl.value);
  }
  if (skillFourEl.checked) {
    skills.push(skillFourEl.value);
  }

  if (skillFiveEl.checked) {
    skills.push(skillFiveEl.value);
  }

  if (skillSixEl.checked) {
    skills.push(skillSixEl.value);
  }

  // for radiobox values
  const gender = document.querySelector('input[name="gender"]:checked').value;

  const formValues = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    email: emailValue,
    password: passwordValue,
    confirmPassword: cnfpasswordValue,
    dateOfBirth: dateOfBirthValue,
    image: image.files[0],
    skills,
    gender,
  };

  console.log(formValues);
}

function setErrorFor(input, message, type = "input") {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  if (type === "input") {
    formControl.className = "form-control error";
  } else if (type === "checkbox") {
    formControl.className = "skills-list error";
  } else if (type === "radio") {
    formControl.className = "genders error";
  } else {
    formControl.className = "error";
  }
  small.innerText = message;
}

function setSuccessFor(input, type = "input", className = "") {
  const formControl = input.parentElement;
  if (type === "input") {
    formControl.className = "form-control success";
  } else {
    formControl.className = className;
  }
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
