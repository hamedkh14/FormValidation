let progressRange = 0;
const steps = document.querySelectorAll(".step");
const stepsProgress = document.getElementsByClassName("stepsProgress");
const buttons = document.querySelectorAll(".btn");

let name = document.querySelector("[name=name]");
let email = document.querySelector("[name=email]");
let phone = document.querySelector("[name=phone]");
let address = document.querySelector("[name=address]");
let message = document.querySelector("[name=message]");

buttons.forEach((btn) => {
  if (btn.classList.contains("btnSend"))
    btn.addEventListener("click", authenticationHandle);
  else btn.addEventListener("click", backHandle);
});

function authenticationHandle(e) {
  e.preventDefault();

  let btnAct = $(this).attr("data-act");

  progressRange = (100 / 2) * (btnAct - 1);

  if (btnAct - 1 == 1) {
    if (name.value == "" || name.length > 50 || containsNumbers(name.value)) {
      alert("field Your name not invalid");
      name.focus();
    } else if (
      phone.value == "" ||
      typeof (phone.value * 1) != "number" ||
      phone.value.length != 11
    ) {
      alert("field Your phone not invalid");
      phone.focus();
    } else if (email.value == "" || !containsEmail(email.value)) {
      alert("field your email not invalid");
      email.focus();
    } else {
      stepsProgress[0].children[1].classList.add("active");
      nextHandle(this);
    }
  } else if (btnAct - 1 == 2) {
    if (address.value == "") {
      alert("field Your address not invalid");
      address.focus();
    } else {
      stepsProgress[0].children[2].classList.add("active");
      nextHandle(this);
    }
  } else {
    if (message.value == "") {
      alert("field Your message not invalid");
      message.focus();
    } else {
      $("#form").submit();
    }
  }
}

function nextHandle(e) {
  let btnAct = $(e).attr("data-act");

  progressRange = (100 / 2) * (btnAct - 1);

  $(".range div").animate({ width: progressRange + "%" }, 1000);
  $(".step").hide();
  $("#step" + btnAct).fadeIn();
}

function backHandle(e) {
  e.preventDefault();

  let btnAct = $(this).attr("data-act");

  progressRange = (100 / 2) * (btnAct - 1);

  stepsProgress[0].children[btnAct].classList.remove("active");
  $(".range div").animate({ width: progressRange + "%" }, 1000);
  $(".step").hide();
  $("#step" + btnAct).fadeIn();
}

function containsNumbers(str) {
  return /\d/.test(str);
}
function containsEmail(str) {
  return /^[a-zA-Z]+([\.]?[a-zA-Z0-9]+)*@[a-zA-Z]+([\.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,3})+$/.test(
    str
  );
}
