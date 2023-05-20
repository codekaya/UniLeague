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


