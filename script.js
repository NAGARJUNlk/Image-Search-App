const Container = document.getElementById("searchres");
const searchInput = document.querySelector(".search-input");
const languageFilter = document.querySelector("#languageFilter");

const languages = ['English', 'Kannada', 'Hindi', 'Telugu', 'Tamil', 'Malayalam'];

async function fetchRandomPic() {

    const response = await fetch('https://jsonplaceholder.typicode.com/photos')
    const data = await response.json()
    displayBlogs(data);
}
function displayBlogs(data) {
    Container.innerHTML = ""
    data.forEach((article) => {
        const card = document.createElement("div")
        card.classList.add("res")

        const img = document.createElement("img");
        img.src = article.thumbnailUrl;
        img.alt = article.title;
        const title = document.createElement("h2")
        title.textContent = article.title

        const likes = document.createElement('p');
        likes.classList.add('likes');
        likes.textContent = 'likes: ' + Math.floor(Math.random() * 100) + 1;

        const language = document.createElement('p');
        language.classList.add('language');
        language.textContent = 'languages: ' + languages[Math.floor(Math.random() * languages.length)];

        const btn = document.createElement('button');
        btn.textContent = 'Delete';


        btn.onclick = function (button) {
            card.remove();
        };

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(likes);
        card.appendChild(language);
        card.appendChild(btn);
        Container.appendChild(card);
    });
}


searchInput.addEventListener('input', (e) => {

    const query = e.target.value.toLowerCase();
    const cards = Container.children;
    Array.from(cards).forEach(Container => {
        const title = Container.querySelector('h2').textContent.toLowerCase();
        Container.style.display = title.includes(query) ? 'block' : 'none';
    });
});

languageFilter.addEventListener('change', (e) => {
    const selectedLanguage = e.target.value;
    const cards = Container.children;
    Array.from(cards).forEach(card => {
        const language = card.querySelector('p:nth-child(4)').textContent.split(': ')[1];
        card.style.display = selectedLanguage === '' || language === selectedLanguage ? 'block' : 'none';
    });
});

fetchRandomPic();