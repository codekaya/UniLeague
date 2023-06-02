async function sendEmailCode() {
  
  var visibleAfterDiv = document.getElementById("visibleAfter");
  visibleAfterDiv.style.display = "block";

  var closeAfterDiv = document.getElementById("closeAfter");  
  closeAfterDiv.style.display = "none";

  var beforeText = document.getElementById("before_text");
  beforeText.style.display = "none";

  var afterText = document.getElementById("after_text");
  afterText.style.display = "block";
  
  const response = await fetch(`/user/getEmailCode`, {
    credentials:'include',
    method: 'GET'
    });
    response.json().then(data => {
      if(data.success){

      }
      else{
        alert(data.error.name)
      }
    });
}


async function checkVerifyCode() {

  const errorContainer = document.getElementById('error-container');
  errorContainer.innerHTML = '';

  var verification_code = document.getElementById("verificatin_code");
  verification_code= verification_code.value
  if (verification_code) {
    const response = await fetch(`/user/emailVerify`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie' : 'access-token='
      },
      body: JSON.stringify({
        accessCode: verification_code
        })
      }); 
      response.json().then(data => {
        if(data.success){
          window.location.href = 'user/profile';
        }
        else{
          const errorMessage = document.createElement('div');
          errorMessage.className = 'alert alert-danger';
          errorMessage.style.backgroundColor = 'white';
          errorMessage.style.color = 'red';
          errorMessage.style.fontWeight = 'bold';
          errorMessage.style.textAlign = 'center';
          errorMessage.textContent = data.error;
          const errorContainer = document.getElementById('error-container');
          errorContainer.appendChild(errorMessage);
        }
      });
  }

}




  