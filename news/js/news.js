// реалізувати наступне завдання використовуючи NEWS API (http://newsapi.org/)
// створити форму пошуку статтей по ключовому слову
// додати мінімальні стилі для більш привабливого вигляду сторінки
// створити файл article.hbs зі шаблоном однієї статті

/* створити клас NewsApiService в якому буде реалізована вся логіка роботи з публічним API: зберігання параметрів запиту (query, page), методи отримання статтей fetchArticles, incrementPage, resetPage, геттери та сеттери запиту. */

import tmpl from "../templ/news.hbs";
const ul = document.getElementById("articles");
const newsDiv = document.querySelector(".news");
const loadMoreBtn = document.querySelector(".loadMore");
class NewsApiService {
  constructor() {
    this.q = "";
    this.page = 1;
  }

  async getNews() {
    const param = new URLSearchParams({
      q: this.q,
      page: this.page,
      apiKey: "ff0e248d387243c7ad1307cb57e658ca",
      pageSize: 15,
    });

    return fetch(`https://newsapi.org/v2/everything?${param}`);
  }

  newPage() {
    this.page += 1;
    console.log("new page", this.page);
  }

  set queryValue(newVal) {
    this.q = newVal;
  }
}
const newsTest = new NewsApiService();
newsDiv.addEventListener("click", (e) => {
  if (e.target.id === "loadMore") {
    newsTest.newPage();
  }
});

const input = document.getElementById("search");
const btn = document.getElementById("btn");

const renderarticles = (articles) => {
  const markUp = articles.map((article, i) => {
    const params = {
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.urlToImage,
      id: i,
    };
    return tmpl(params);
  });
  ul.insertAdjacentHTML("beforeend", markUp.join(""));
};

// btn.addEventListener("click", () => {

//   ul.innerHTML = "";
//   loadMoreBtn.style.display = 'block'
//   newsTest.queryValue = input.value;
//   const articles = newsTest.getNews();
//   articles
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.articles);
//       renderarticles(data.articles);
//     })
//     .catch((error) => console.error("Error:", error));
// });

input.addEventListener("keydown", (event) => {
 
  if (event.key === "Enter") {
    if (input.value === '') {
      alert('Please enter something')
    } else {
      info()
    }
  }
 
   
});

const info = () => {
  ul.innerHTML = "";
  loadMoreBtn.style.display = 'block'
  newsTest.queryValue = input.value;
  const articles = newsTest.getNews();
  articles
    .then((response) => response.json())
    .then((data) => {
      console.log(data.articles);
      renderarticles(data.articles);
    })
    .catch((error) => console.error("Error:", error));
}

btn.addEventListener("click", () => {
  if (input.value === '') {
    alert('Please enter something')
  } else {
    info()
  }
  
});

const loadMore = () => {
  const articles = newsTest.getNews();
  articles
  .then((response) => response.json())
  .then((data) => {
    console.log(data.articles);
    renderarticles(data.articles);
  })
  .catch((error) => console.log("Error:", error));
  

}

newsDiv.addEventListener("click", (e) => {
  if(e.target.id === "loadMore") {
    newsTest.newPage()
    loadMore()
  }
})