function likeComment(commentId) {
    const url = `/university/like_comment?id=${commentId}`;
    window.location.assign(url);
  }

function dislikeComment(commentId) {
    const url = `/university/dislike_comment?id=${commentId}`;
    window.location.assign(url);
  }

function deleteComment(commentId) {
    const url = `/university/delete_comment?id=${commentId}`;
    window.location.assign(url);
}


