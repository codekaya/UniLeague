async function login(event){
    event.preventDefault();
    const formData = new FormData(document.getElementById('form'))
    const response = await fetch("http://localhost:5000/user/login", {
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
        if(data.success){
            window.location.href = '/'
        }
        else{
            document.getElementById('errorMessage').style.display = "block"
        }
    });
}

const form = document.getElementById("form");
form.addEventListener("submit", login);