async function editPhone() {

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

