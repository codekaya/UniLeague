async function login(event){
    event.preventDefault();
    const formData = new FormData(document.getElementById('form'))
    const response = await fetch(`/user/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cookie' : 'access-token='
        },
        body: `{
            "email":"${formData.get('email')}",
            "password":"${formData.get('psw')}"}`,
        });
        
    response.json().then(data => {
        const errorContainer = document.getElementById('error-container');
        errorContainer.innerHTML = '';

        if(data.success){
            window.location.href = '/'
        }
        else{
            const errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-danger';
            errorMessage.style.backgroundColor = 'white';
            errorMessage.style.color = 'red';
            errorMessage.style.fontWeight = 'bold';
            errorMessage.style.textAlign = 'center';
            errorMessage.textContent = 'Hatalı Kullanıcı Adı veya Parola!';
    
            // Hata mesajını görüntülemek için bir yer seçin (örneğin, bir <div> elementi)
            const errorContainer = document.getElementById('error-container');
    
            // Hata mesajını ekleyin
            errorContainer.appendChild(errorMessage);
        }
    });
}

const form = document.getElementById("form");
form.addEventListener("submit", login);