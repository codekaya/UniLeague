

async function register(event){

  
  const errorContainer = document.getElementById('error-container');
  errorContainer.innerHTML = '';
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
  if(requestBody.isUniStudent && requestBody.uni_id==="0"){
    const errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-danger';
            errorMessage.style.backgroundColor = 'white';
            errorMessage.style.color = 'red';
            errorMessage.style.fontWeight = 'bold';
            errorMessage.style.textAlign = 'center';
            errorMessage.textContent = 'Bir üniversite seçmelisiniz!';
    
            // Hata mesajını görüntülemek için bir yer seçin (örneğin, bir <div> elementi)
            const errorContainer = document.getElementById('error-container');
    
            // Hata mesajını ekleyin
            errorContainer.appendChild(errorMessage);
    return
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
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-danger';
        errorMessage.style.backgroundColor = 'white';
        errorMessage.style.color = 'red';
        errorMessage.style.fontWeight = 'bold';
        errorMessage.style.textAlign = 'center';
        errorMessage.textContent = data.error.name;

        // Hata mesajını görüntülemek için bir yer seçin (örneğin, bir <div> elementi)
        const errorContainer = document.getElementById('error-container');

        // Hata mesajını ekleyin
        errorContainer.appendChild(errorMessage);
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

