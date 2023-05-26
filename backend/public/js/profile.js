async function editPhone(id) {

    var nameParagraph = document.getElementById("phone");
    var newPhone = prompt("Yeni telefon numarası", nameParagraph.innerText);

    if (newPhone) {
      nameParagraph.innerText = newPhone;
      const response = await fetch("http://localhost:5000/user/changePhoneNumber", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cookie' : 'access-token='
        },
        body: JSON.stringify({
            email: newPhone
          })
        });
    }
}

async function editFaculty() {

  var nameParagraph = document.getElementById("faculty");
  var newFaculty = prompt("Lütfen okuduğunuz bölümü giriniz.", nameParagraph.innerText);

  if (newFaculty) {
    nameParagraph.innerText = newFaculty;
    const response = await fetch("http://localhost:5000/user/changeFaculty", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie' : 'access-token='
      },
      body: JSON.stringify({
          faculty: newFaculty
        })
      });
  }
}

async function editAddress() {

  var nameParagraph = document.getElementById("address");
  var newAddress = prompt("Lütfen adresinizi giriniz.", nameParagraph.innerText);

  if (newAddress) {
    nameParagraph.innerText = newAddress;
    const response = await fetch("http://localhost:5000/user/changeAddress", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie' : 'access-token='
      },
      body: JSON.stringify({
          address: newAddress
        })
      });
  }
}

document.getElementById("smForm").addEventListener("submit", submitSmForm);
document.getElementById("abForm").addEventListener("submit", submitAbForm);

function enableSocialMediaForm(){
  document.getElementsByClassName("sm-hide")[0].classList.remove("sm-hide")
  document.getElementById("smEditBtn").classList.add(("sm-hide"))
  let inputTags = document.getElementsByClassName("sm-form")
  for(let i = 0;i<5;i++){
    let element = inputTags[i]
    element.removeAttribute("readonly")
    element.classList.remove("sm-disable")
  }
}

function enableAbForm(){
  let aboutInput = document.getElementById("about_text")
  aboutInput.removeAttribute("readonly")
  aboutInput.classList.remove("ab-disable")
  document.getElementById("abEditBtn").classList.add("ab-hide")
  document.getElementById("abSubmitBtn").classList.remove("ab-hide")
}

function disableSocialMediaForm(){
  document.getElementById("smFormSubmitBtn").classList.add("sm-hide")
  document.getElementById("smEditBtn").classList.remove(("sm-hide"))
  let inputTags = document.getElementsByClassName("sm-form")
  for(let i = 0;i<5;i++){
    let element = inputTags[i]
    element.setAttribute("readonly","readonly")
    element.classList.add("sm-disable")
  }
}

function disableAbForm(){
  let aboutInput = document.getElementById("about_text")
  aboutInput.setAttribute("readonly","readonly")
  aboutInput.classList.add("ab-disable")
  document.getElementById("abEditBtn").classList.remove("ab-hide")
  document.getElementById("abSubmitBtn").classList.add("ab-hide")
}

async function submitSmForm(event){
  event.preventDefault()
  let inputTags = document.getElementsByClassName("sm-form")
  const reqBody = {
    web:inputTags[0].value,
    github: inputTags[1].value,
    twitter: inputTags[2].value,
    instagram: inputTags[3].value,
    face:inputTags[4].value
  }
  const response = await fetch("http://localhost:5000/user/updateSocialMedia", {
      method: 'POST',
      credentials:'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
      });
  disableSocialMediaForm()
}

async function submitAbForm(event){
  event.preventDefault();
  const response = await fetch("http://localhost:5000/user/changeAbout", {
      method: 'POST',
      credentials:'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          about: document.getElementById('about_text').value
        })
    });
    disableAbForm()
}

async function logout(){
  const response = await fetch("http://localhost:5000/user/logout", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials:"include"
    });
    response.json().then(data => {
      window.location.href = '/'
    });
}
