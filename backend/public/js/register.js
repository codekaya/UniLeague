async function createRegForm(){

  const requestBody = {
    name: document.getElementById('name').value,
    last_name: document.getElementById('last_name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    isUniStudent: document.querySelector('input[name="ogrenci"]:checked').value === 'evet',
    uni_id: document.getElementById('uni').value
    
  };

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