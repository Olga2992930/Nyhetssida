document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("articleForm");
    const main = document.querySelector("main");

    const savedArticles = JSON.parse(localStorage.getItem("articles")) || [];
    savedArticles.forEach(articleData => {
        const article = createArticleElement(articleData);
        main.insertBefore(article, form.parentElement); 
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const imageUrl = document.getElementById("imageUrl").value.trim();
        const content = document.getElementById("content").value.trim();

        if (!title || !content) {
            showToast("Titel och innehåll krävs", "error");
            return;
        }

        const date = new Date().toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        const articleData = { title, imageUrl, content, date };
        savedArticles.unshift(articleData);
        localStorage.setItem("articles", JSON.stringify(savedArticles));

        const article = createArticleElement(articleData);
        main.insertBefore(article, form.parentElement);
        showToast('Artikeln skapades!');
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

            showToast("Artikeln raderades.");
        });

        article.appendChild(h3);
        article.appendChild(dateParagraph);

        if (data.imageUrl) {
            const img = document.createElement("img");
            img.src = data.imageUrl;
            img.style.maxWidth = "100%";
            img.style.margin = "10px 0";
            article.appendChild(img);
        }

        const p = document.createElement("p");
        p.textContent = data.content;

        article.appendChild(p);
        article.appendChild(deleteBtn);

        return article;
    }

    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;

        if (type === 'success') {
            toast.style.backgroundColor = '#6b7280'; 
        } else if (type === 'error') {
            toast.style.backgroundColor = '#4b5563'; 
        } else {
            toast.style.backgroundColor = '#4b5563'; 
        }

        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});

