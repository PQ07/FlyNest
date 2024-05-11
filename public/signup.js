var pass = document.getElementById("pass")
  , confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(pass.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

pass.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;