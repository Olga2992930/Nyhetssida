document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("articleForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const imageUrl = document.getElementById("imageUrl").value;
        const content = document.getElementById("content").value;

        const article = document.createElement("article");
        article.className = "pt-4 pb-4"; 

        const h3 = document.createElement("h3");
        h3.textContent = title;

        if (imageUrl.trim() !== "") {
            const img = document.createElement("img");
            img.src = imageUrl;
            img.style.maxWidth = "100%";
            article.appendChild(img);
        }

        const p = document.createElement("p");
        p.textContent = content;

        article.appendChild(h3);
        article.appendChild(p);

        document.querySelector("main").appendChild(article);

        form.reset();
    });
});
