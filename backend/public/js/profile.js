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

async function editWeb() {

  var nameParagraph = document.getElementById("web-text");
  var newWeb = prompt("Lütfen url'i giriniz.", nameParagraph.innerText);

  if (newWeb) {
    nameParagraph.innerText = newWeb;
    const response = await fetch("http://localhost:5000/user/changeWeb", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie' : 'access-token='
      },
      body: JSON.stringify({
          web: newWeb
        })
      });
  }
}

async function editGithub() {

  var nameParagraph = document.getElementById("github-text");
  var newGithub = prompt("Lütfen url'i giriniz.", nameParagraph.innerText);

  if (newGithub) {
    nameParagraph.innerText = newGithub;
    const response = await fetch("http://localhost:5000/user/changeGithub", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie' : 'access-token='
      },
      body: JSON.stringify({
          github: newGithub
        })
      });
  }
}

async function editTwitter() {

  var nameParagraph = document.getElementById("twitter-text");
  var newTwitter = prompt("Lütfen url'i giriniz.", nameParagraph.innerText);

  if (newTwitter) {
    nameParagraph.innerText = newTwitter;
    const response = await fetch("http://localhost:5000/user/changeTwitter", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie' : 'access-token='
      },
      body: JSON.stringify({
          twitter: newTwitter
        })
      });
  }
}


async function editInstagram() {

  var nameParagraph = document.getElementById("instagram-text");
  var newInstagram = prompt("Lütfen url'i giriniz.", nameParagraph.innerText);

  if (newInstagram) {
    nameParagraph.innerText = newInstagram;
    const response = await fetch("http://localhost:5000/user/changeInstagram", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie' : 'access-token='
      },
      body: JSON.stringify({
          instagram: newInstagram
        })
      });
  }
}



async function editFacebook() {

  var nameParagraph = document.getElementById("face-text");
  var newFacebook = prompt("Lütfen url'i giriniz.", nameParagraph.innerText);

  if (newFacebook) {
    nameParagraph.innerText = newFacebook;
    const response = await fetch("http://localhost:5000/user/changeFacebook", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie' : 'access-token='
      },
      body: JSON.stringify({
          facebook: newFacebook
        })
      });

  }
}


async function editAbout() {

  var nameParagraph = document.getElementById("about_text");
  var newAbout = prompt("Lütfen burayı doldurunuz.", nameParagraph.innerText);

  if (newAbout) {
    nameParagraph.innerText = newAbout;
    const response = await fetch("http://localhost:5000/user/changeAbout", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie' : 'access-token='
      },
      body: JSON.stringify({
          about: newAbout
        })
      });
  
  }
}


