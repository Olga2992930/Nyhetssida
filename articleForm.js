document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("articleForm");
    const main = document.querySelector("main");

    const savedArticles = JSON.parse(localStorage.getItem("articles")) || [];
    savedArticles.forEach(articleData => {
        const article = createArticleElement(articleData);
        main.insertBefore(article, main.firstChild);
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const imageUrl = document.getElementById("imageUrl").value;
        const content = document.getElementById("content").value;

        const date = new Date();
        const formattedDate = date.toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        const articleData = { title, imageUrl, content, date: formattedDate };

        savedArticles.unshift(articleData);
        localStorage.setItem("articles", JSON.stringify(savedArticles));

        const article = createArticleElement(articleData);
        main.insertBefore(article, main.firstChild);

        form.reset();
    });

    function createArticleElement(data) {
    const article = document.createElement("article");
    article.className = "pt-4 pb-4";

    const h3 = document.createElement("h3");
    h3.textContent = data.title;

    const dateParagraph = document.createElement("p");
    dateParagraph.className = "article-date";
    dateParagraph.textContent = `Publicerad: ${data.date}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Radera";
    deleteBtn.className = "delete-button"; 
    deleteBtn.addEventListener("click", () => {
        article.remove(); 

                let articles = JSON.parse(localStorage.getItem("articles")) || [];

                articles = articles.filter(a =>
            !(a.title === data.title && a.date === data.date && a.content === data.content)
        );

        localStorage.setItem("articles", JSON.stringify(articles));
    });

    article.appendChild(h3);
    article.appendChild(dateParagraph);

    if (data.imageUrl.trim() !== "") {
        const img = document.createElement("img");
        img.src = data.imageUrl;
        img.style.maxWidth = "100%";
        article.appendChild(img);
    }

    const p = document.createElement("p");
    p.textContent = data.content;

    article.appendChild(p);
    article.appendChild(deleteBtn);

    return article;
}

});

