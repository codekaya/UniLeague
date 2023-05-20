async function login(){
    const response = await fetch("http://localhost:5000/user/login", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cookie' : 'access-token='
        },
        body: `{
            "username":"${document.getElementsByName('email')[0].value}",
            "content":"${document.getElementsByName('psw')[0].value}"}`,
        });
        
    response.json().then(data => {
        if(data.success){
            window.location.href = '/'
        }
    });
}