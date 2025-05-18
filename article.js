document.addEventListener("DOMContentLoaded", () => {
  const articleContainer = document.getElementById("article-container");
  const selectedArticle = JSON.parse(localStorage.getItem("selectedArticle"));

  if (!selectedArticle) {
    articleContainer.innerHTML = "<p>Ingen artikel hittades.</p>";
    return;
  }

  // Visa artikel
  const article = document.createElement("article");

  const title = document.createElement("h2");
  title.textContent = selectedArticle.title;

  const date = document.createElement("p");
  date.className = "article-date";
  date.textContent = `Publicerad: ${selectedArticle.date}`;

  article.appendChild(title);
  article.appendChild(date);

  if (selectedArticle.imageUrl) {
    const img = document.createElement("img");
    img.src = selectedArticle.imageUrl;
    img.style.maxWidth = "100%";
    img.style.margin = "10px 0";
    article.appendChild(img);
  }

  const content = document.createElement("p");
  content.textContent = selectedArticle.content;
  article.appendChild(content);

  articleContainer.appendChild(article);

  // kommentarer
  const commentForm = document.getElementById("commentForm");
  const commentInput = document.getElementById("commentInput");
  const commentList = document.getElementById("commentList");

  const commentKey = `comments-${selectedArticle.title}-${selectedArticle.date}`;
  let comments = JSON.parse(localStorage.getItem(commentKey)) || [];

  function renderComments() {
    commentList.innerHTML = "";
    comments.forEach(comment => {
      const li = document.createElement("li");
      li.textContent = comment;
      commentList.appendChild(li);
    });
  }

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const commentText = commentInput.value.trim();
    if (commentText === "") return;

    comments.push(commentText);
    localStorage.setItem(commentKey, JSON.stringify(comments));
    renderComments();
    commentInput.value = "";
  });
  renderComments();

 // gilla/ogilla
  const likeBtn = document.getElementById("likeBtn");
  const dislikeBtn = document.getElementById("dislikeBtn");
  const likeCountSpan = document.getElementById("likeCount");
  const dislikeCountSpan = document.getElementById("dislikeCount");

  const voteKey = `votes-${selectedArticle.title}-${selectedArticle.date}`;
  let voteData = JSON.parse(localStorage.getItem(voteKey)) || { likes: 0, dislikes: 0 };

  function renderVotes() {
    likeCountSpan.textContent = voteData.likes;
    dislikeCountSpan.textContent = voteData.dislikes;
  }

  likeBtn.addEventListener("click", () => {
    voteData.likes++;
    localStorage.setItem(voteKey, JSON.stringify(voteData));
    renderVotes();
  });

  dislikeBtn.addEventListener("click", () => {
    voteData.dislikes++;
    localStorage.setItem(voteKey, JSON.stringify(voteData));
    renderVotes();
  });
  renderVotes();

});
