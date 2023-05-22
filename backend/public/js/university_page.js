async function likeComment(commentId) {
  const response = await fetch(`http://localhost:5000/university/like_comment?id=${commentId}`, {
    credentials:'include',
    method: 'GET'
    });
    response.json().then(data => {
      if(data.success){
        let element = document.getElementById('like'+commentId)
        element.innerText = parseInt(element.innerText) + 1
      }
      else{
        alert(data.error.name)
      }
    });
}

async function dislikeComment(commentId) {
  const response = await fetch(`http://localhost:5000/university/dislike_comment?id=${commentId}`, {
    credentials:'include',
    method: 'GET'
    });
    response.json().then(data => {
      if(data.success){
        let element = document.getElementById('dislike'+commentId)
        element.innerText = parseInt(element.innerText) + 1
      }
      else{
        alert(data.error.name)
      }
    });
}

async function deleteComment(commentId) {
    const response = await fetch(`http://localhost:5000/university/delete_comment?id=${commentId}`, {
    credentials:'include',
    method: 'GET'
    });
    response.json().then(data => {
      if(data.success){
        document.getElementById(commentId).remove()
      }
      else{
        alert(data.error.name)
      }
    });
}

async function addComment(uni_id){
  const response = await fetch(`http://localhost:5000/university/new_comment?id=${uni_id}`, {
    credentials:'include',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: `{
      "username":"${document.getElementById('username').value}",
      "content":"${document.getElementById('content').value}"}`,
    });
    response.json().then(data => {
      if(data.success){
        location.reload();
      }
      else{
        alert(data.error.name)
      }
    });
}

if(performance.navigation.type == 2){
  location.reload(true);
}


async function giveRating(uni_id){
  const response = await fetch(`http://localhost:5000/university/rate?id=${uni_id}`, {
    credentials:'include',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: `{
      "edu_point":"${document.getElementById('edu_point').value}",
      "dorm_point":"${document.getElementById('dorm_point').value}",
      "trans_point":"${document.getElementById('trans_point').value}",
      "campus_point":"${document.getElementById('campus_point').value}"}`,
      
    });
    response.json().then(data => {
      console.log(data)
      if(data.success){
        location.reload();
      }
      else{
        alert(data.error.name)
      }
    });
}

if(performance.navigation.type == 2){
  location.reload(true);
}