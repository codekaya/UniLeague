async function changePassword(){

    const requestBody = {
      oldPassword: document.getElementById('currentPassword').value,
      newPassword: document.getElementById('newPassword').value,
    };
  
    const response = await fetch(`http://localhost:5000/user/changePassword`, {
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
              window.location.href = 'profile';
          }
          else{
            alert(data.error)
          }
        });
    }