async function register(event){
  event.preventDefault()
  const formData = new FormData(document.getElementById('registerForm'))
  const requestBody = {
    name: formData.get('Name'),
    last_name: formData.get('Surname'),
    email: formData.get('Email'),
    password: formData.get('Password'),
    isUniStudent: document.querySelector('input[name="student"]:checked').value === 'yes',
    uni_id: formData.get('uni_name')
  }
  const response = await fetch(`http://localhost:5000/user/register`, {
    credentials:'include',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(requestBody)  
    });
    response.json().then(data => {
      if(data.success){
          window.location.href = '/login';
      }
      else{
          alert(data.error.name)
      }
    });
  }

document.getElementById('registerForm').addEventListener("submit",register)

function validatePassword(){
  if(password.value != confirm_password.value) {
      confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

let password = document.getElementsByName("Password")[0]
let confirm_password = document.getElementsByName("ConfirmPassword")[0];

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

let radioButton = document.getElementsByName("student")[0]
let radioButton2 = document.getElementsByName("student")[1]
radioButton.addEventListener('change', function (e) {
  if (this.checked) {
    document.getElementById('uni').style.display = "block"
  }
});

radioButton2.addEventListener('change', function (e) {
  if (this.checked) {
    document.getElementById('uni').style.display = "none"
  }
});

