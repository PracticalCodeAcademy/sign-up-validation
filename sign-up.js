const fName = document.getElementById("fName");
const lName = document.getElementById("lName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const msgDisplay = document.getElementById("msg");

const form = {};

const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", checkForm);

function checkForm(e) {
  e.preventDefault();
  let error = false;
  let regex = new RegExp("[A-Za-z ]$");
  error |= check(fName, regex, "First Name");
  error |= check(lName, regex, "Last Name");
  regex = new RegExp("[0-9]{7,12}$");
  error |= error + check(phone, regex, "Phone Number");
  regex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
  );
  error |= check(email, regex, "Email");
  regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
  );
  error |= check(password, regex, "Password");
  error |= check(password2, regex, "Confirmed Password");
  if (password2.value !=="" && password.value !== password2.value) {
    errorMsg(password2, `Your passwords don't match`);
  }else{
    error |= check(password2, regex, "Confirmed Password");
  }

  if(error > 0){
      console.log('form error');
     diplayMsg('error', 'Fill the form correctly', 1500);
    
  }else{
    signupForm.reset();
    diplayMsg('success', 'Form submittest successfully', 1500);
      console.log('form submitted');
      console.log(form);
  }

}

function check(el, regex, name) {
  if (el.value == "") {
    errorMsg(el, `Please Enter your ${name}`);
    return true;
  } else {
    if (!regex.test(el.value)) {
      errorMsg(el, `Please Enter a valid ${name}`);
      return true;
    } else {
      errorMsg(el, "");
      form[el.id] = el.value;
      return false;
    }
  }
}

function errorMsg(el, msg) {
  let error = el.nextElementSibling;
  error.firstChild.textContent = msg;
}


function diplayMsg(type, msg, time){
    msgDisplay.classList.add("msg-display");
    if (type =="error"){
        msgDisplay.classList.add("error-msg");
    }else if(type =="success"){
        msgDisplay.classList.add("success-msg");
    }
    msgDisplay.innerHTML = msg; 
    setTimeout(()=>{msgDisplay.className = ''}, time);
}