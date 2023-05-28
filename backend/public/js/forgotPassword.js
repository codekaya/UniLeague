
let password
let confirm_password

async function sendVerificationCode(event){
    event.preventDefault()
    const emailTag = document.getElementById('form2Example17');
    const response = await fetch("http://localhost:5000/user/getEmailCode", {
        method: 'POST',
        credentials: "include",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: `{
            "email":"${emailTag.value}"}`,
        });
    response.json().then(data => {
            const errorContainer = document.getElementById('error-container');
            errorContainer.innerHTML = '';
    
            if(data.success){
                document.getElementById("verificationCodeInput").innerHTML = `<input name="verificationCode"class="form-control form-control-lg" placeholder="Doğrulama kodunu giriniz" required/>`
                document.getElementById("password").innerHTML =  `<input name="newPassword" type="password" class="form-control form-control-lg" placeholder="Yeni şifre" required/>`
                document.getElementById("confirmPassword").innerHTML =  `<input name="confirmNewPassword" type="password" class="form-control form-control-lg" placeholder="Yeni şifreyi onaylayın" required/>`
                document.getElementById("submitBtn").innerText = "Gönder"
                emailTag.setAttribute("readonly","readonly")
                const form = document.getElementById("form")
                form.addEventListener("submit",changePassword)
                form.removeEventListener("submit",sendVerificationCode)
                password = document.getElementsByName("newPassword")[0]
                confirm_password = document.getElementsByName("confirmNewPassword")[0];
                password.onchange = validatePassword;
                confirm_password.onkeyup = validatePassword;
            }
            else{
                const errorMessage = document.createElement('div');
                errorMessage.className = 'alert alert-danger';
                errorMessage.style.backgroundColor = 'white';
                errorMessage.style.color = 'red';
                errorMessage.style.fontWeight = 'bold';
                errorMessage.style.textAlign = 'center';
                errorMessage.textContent = data.error.name;
                const errorContainer = document.getElementById('error-container');
                errorContainer.appendChild(errorMessage);
            }
    });
}



document.getElementById('form').addEventListener('submit',sendVerificationCode)

async function changePassword(event){
    event.preventDefault();
    const formData = new FormData(document.getElementById('form'))
    const response = await fetch("http://localhost:5000/user/resetPassword", {
        method: 'POST',
        credentials: "include",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: `{
            "email":"${formData.get('email')}",
            "emailCode" : "${formData.get('verificationCode')}",
            "newPassword" : "${formData.get('newPassword')}"
        }`,
        });
    response.json().then(data => {
        const errorContainer = document.getElementById('error-container');
        errorContainer.innerHTML = '';

        if(data.success){
            window.location.href = '/login'
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
            console.log("asd")
        }
});
}

function validatePassword(){
    if(password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
      confirm_password.setCustomValidity('');
    }
  }

  