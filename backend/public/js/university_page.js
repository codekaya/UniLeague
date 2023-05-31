
async function likeComment(commentId) {
  const response = await fetch(`http://localhost:5000/university/like_comment?id=${commentId}`, {
    credentials:'include',
    method: 'GET'
    });
    response.json().then(data => {
      if(data.success){
        let element = document.getElementById('like'+commentId)
        let element2 = document.getElementById('dislike'+commentId)
        element.innerHTML = `<i class="far fa-thumbs-up me-2"></i>&nbsp;${data.likeCount}`;
        element2.innerHTML = `<i class="far fa-thumbs-down me-2"></i>&nbsp;${data.dislikeCount}`;
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
        let element = document.getElementById('like'+commentId)
        let element2 = document.getElementById('dislike'+commentId)
        element.innerHTML = `<i class="far fa-thumbs-up me-2"></i>&nbsp;${data.likeCount}`;
        element2.innerHTML = `<i class="far fa-thumbs-down me-2"></i>&nbsp;${data.dislikeCount}`;
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

async function addComment(uni_id,conversation_id,content_section){
  console.log(conversation_id)
  const conversation_id_json = JSON.stringify(conversation_id);
 
  const response = await fetch(`http://localhost:5000/university/new_comment?id=${uni_id}`, {
    
    credentials:'include',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',

    body: `{
      "content":"${document.getElementById(content_section).value}",
      "conversation_id":${conversation_id_json}
    }`,
    });
    response.json().then(data => {

      if(data.success){

        location.reload();

        /*
        if (content_section.includes('comment_reply_text')){

          console.log('rply')
          var comment_id = content_section.split("_")[0];
          console.log(comment_id)
          replySection(comment_id)
        }
        */
      }
      else{
        alert(data.error.name)
      }
    });
    
}


async function giveRating(uni_id){
  if(edu_point <= 0 || dorm_point <= 0 || trans_point <= 0 || campus_point <= 0 || 
    edu_point > 10 || dorm_point > 10 || trans_point > 10 || campus_point > 10 ){
        return alert('Rates should be between 0 and 1')
    }
  const response = await fetch(`http://localhost:5000/university/rate?id=${uni_id}`, {
    credentials:'include',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: `{
      "edu_point":"${edu_point}",
      "dorm_point":"${dorm_point}",
      "trans_point":"${trans_point}",
      "campus_point":"${campus_point}"}`,
      
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



function replySection(comment_id) {
  
  comment_div = comment_id + '_comment'
  var replySection = document.getElementById(comment_div);
  if (replySection.style.display == "block"){
    replySection.style.display = "none";
  }else {
    replySection.style.display = "block";
  }

}

function closeReplySection(comment_id) {
  comment_div = comment_id + '_comment'
  var replySection = document.getElementById(comment_div);
  replySection.style.display = "none";
}


function type0comment() {

  comment_div = 'type0comment'
  var replySection = document.getElementById(comment_div);
  replySection.style.display = "block";

}

function closetype0comment(){
  comment_div = 'type0comment'
  var replySection = document.getElementById(comment_div);
  replySection.style.display = "none";
}


function updatePagination() {
  var comments = $("#commentSection .card");
  var pagination = $(".pagination");

  var numPages = Math.ceil(comments.length / commentsPerPage);

  // Önceki ve sonraki düğmelerinin görünürlüğünü güncelle
  if (currentPage === 1) {
    pagination.find("li.page-item:first-child").addClass("disabled");
  } else {
    pagination.find("li.page-item:first-child").removeClass("disabled");
  }

  if (currentPage === numPages) {
    pagination.find("li.page-item:last-child").addClass("disabled");
  } else {
    pagination.find("li.page-item:last-child").removeClass("disabled");
  }

  // Sayfa numaralarını oluştur
  var pageLinks = "";
  for (var i = 1; i <= numPages; i++) {
    if (i === currentPage) {
      pageLinks += '<li class="page-item active"><a class="page-link">' + i + "</a></li>";
    } else {
      pageLinks += '<li class="page-item" onclick="goToPage(' + i + ')"><a class="page-link">' + i + "</a></li>";
    }
  }

  pagination.find("li.page-item:not(:first-child):not(:last-child)").remove();
  pagination.find("li.page-item:last-child").before(pageLinks);
}

function updateComments() {
  var comments = $("#commentSection .card");

  var startIndex = (currentPage - 1) * commentsPerPage;
  var endIndex = startIndex + commentsPerPage;

  comments.each(function (index) {
    if (index >= startIndex && index < endIndex) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });

  updatePagination();
}

function goToPage(page) {
  currentPage = page;
  updateComments();
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    updateComments();
  }
}

function nextPage() {
  var comments = $("#commentSection .card");
  var numPages = Math.ceil(comments.length / commentsPerPage);
  if (currentPage < numPages) {
    currentPage++;
    updateComments();
  }
}

var currentPage = 1;
var commentsPerPage = 4;

$(document).ready(function() {
  updateComments();
});

let edu_point = 0;
let dorm_point = 0;
let trans_point = 0;
let campus_point = 0;

function addStarRatingEvent() {

  const ratingSections = document.querySelectorAll('.star-rating');
  
  ratingSections.forEach((section) => {
    const ratingButtons = section.querySelectorAll('.star-btn');
    
    ratingButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const selectedRating = button.dataset.value;

        ratingButtons.forEach((btn) => {
          const ratingValue = btn.dataset.value-1;
          const starIcon = btn.querySelector('i');

          if (ratingValue <= selectedRating-1) {
            btn.classList.add('selected');
            starIcon.classList.remove('bi-star');
            starIcon.classList.add('bi-star-fill');
          } else {
            btn.classList.remove('selected');
            starIcon.classList.remove('bi-star-fill');
            starIcon.classList.add('bi-star');
          }
          
        }); 
        switch(button.getAttribute("value")){
          case "edu":
            edu_point = selectedRating;
            break;
          case "dorm": 
            dorm_point = selectedRating;
            break;
          case "campus":
            campus_point = selectedRating
            break;
          case "transportation":
            trans_point = selectedRating
            break;
        }
      });
    });
  });
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





