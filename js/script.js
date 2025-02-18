import templatePost from '../tempates/post.hbs'

const btnGetPosts = document.querySelector('.btn-get');
const postsList = document.querySelector('.posts');
let page = 1
let limit = 15
btnGetPosts.addEventListener('click', () => {


    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
    .then(response => response.json())
    .then(posts => {
        console.log(posts);
        const markup = posts.map((post) => {
              return templatePost(post)
        })
        postsList.insertAdjacentHTML('beforeend', markup.join(''));
      
    })
    .catch(error => console.error('Error:', error));
    // fetch(`https://newsapi.org/v2/everything?q=tesla&apiKey=c6acdfb593fa40b4a2dc2491b8b085de&pageSize=${limit}&page=${page}`)
    //     .then(response => response.json())
    //     .then(posts => {
    //         console.log(posts);
    //     })
    //     .catch(err => console.log(err))
    page++
    if(page > 1) {
        btnGetPosts.textContent = 'Load More'
    }
   
});





