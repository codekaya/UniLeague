var likeCount = 0;
var dislikeCount = 0;

function like() {
  likeCount++;
  renderComments();
}

function dislike() {
  dislikeCount++;
  renderComments();
}

var comments = [
  { name: "Ahmet", message: "Bu bir yorum örneği 1", likes: 0, dislikes: 0 },
  { name: "Mehmet", message: "Bu bir yorum örneği 2", likes: 0, dislikes: 0 },
  { name: "Ayşe", message: "Bu bir yorum örneği 3", likes: 0, dislikes: 0 },
  { name: "Ahmet", message: "Bu bir yorum örneği 1", likes: 0, dislikes: 0 },
  { name: "Mehmet", message: "Bu bir yorum örneği 2", likes: 0, dislikes: 0 },
  { name: "Ayşe", message: "Bu bir yorum örneği 3", likes: 0, dislikes: 0 },
  { name: "Ahmet", message: "Bu bir yorum örneği 1", likes: 0, dislikes: 0 },
  { name: "Mehmet", message: "Bu bir yorum örneği 2", likes: 0, dislikes: 0 },
  { name: "Ayşe", message: "Bu bir yorum örneği 3", likes: 0, dislikes: 0 },
  // Daha fazla yorum ekleyebilirsiniz
];

var commentsContainer = document.getElementById("comments");
var commentsPerPage = 5;
var currentPage = 1;

function displayComments(page) {
  commentsContainer.innerHTML = "";

  var startIndex = (page - 1) * commentsPerPage;
  var endIndex = startIndex + commentsPerPage;

  var commentsToShow = comments.slice(startIndex, endIndex);

  commentsToShow.forEach(function(comment) {
    var commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    var nameElement = document.createElement("h3");
    nameElement.textContent = comment.name;

    var messageElement = document.createElement("p");
    messageElement.textContent = comment.message;
    messageElement.classList.add("comment-body");

    var likeButton = document.createElement("button");
    likeButton.innerHTML = '<i class="fas fa-thumbs-up"></i>';
    likeButton.addEventListener("click", function() {
      comment.likes++;
      renderComments();
    });
    var likesCount = document.createElement("span");  
    likesCount.textContent = " " + comment.likes;


    var dislikeButton = document.createElement("button");
    dislikeButton.innerHTML = '<i class="fas fa-thumbs-down"></i>';
    dislikeButton.addEventListener("click", function() {
      comment.dislikes++;
      renderComments();
    });

 
    var dislikesCount = document.createElement("span");
    dislikesCount.textContent = " " + comment.dislikes;

    

    

 


    commentElement.appendChild(nameElement);
    commentElement.appendChild(messageElement);
    commentElement.appendChild(likeButton);
    commentElement.appendChild(likesCount);
    commentElement.appendChild(dislikeButton);
    commentElement.appendChild(dislikesCount);

    commentsContainer.appendChild(commentElement);
  });
}

function renderComments() {
  displayComments(currentPage);
}

displayComments(currentPage);

var totalComments = comments.length;
var totalPages = Math.ceil(totalComments / commentsPerPage);

var paginationContainer = document.querySelector(".pagination");

for (var i = 1; i <= totalPages; i++) {
  var pageLink = document.createElement("a");
  pageLink.href = "#";
  pageLink.textContent = i;

  if (i === currentPage) {
    pageLink.classList.add("active");
  }

  pageLink.addEventListener("click", function(e) {
    e.preventDefault();

    var clickedPage = parseInt(this.textContent);

    currentPage = clickedPage;
    displayComments(currentPage);

    var activeLink = document.querySelector(".pagination a.active");
    activeLink.classList.remove("active");

    this.classList.add("active");
  });

  paginationContainer.appendChild(pageLink);
}
