const api= axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    Headers:{
    'Content-Type':'application/json;charset=utf-8',
    },
    params:{
    'api_key':API_KEY,
    }
})
// utils
const lazyLoader = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          const url = entry.target.getAttribute('data-img')
          entry.target.setAttribute('src', url)
        }
      })
    })
function creatMovies(movies, container,
  {  lazyLoad = false, 
    clean=true
  }= {},
  ){
  if (clean){
    container.innerHTML='';
  }
 
  movies.forEach(movie => {
       
    const movieContainer= document.createElement('div')
     const movieImg= document.createElement('img')
     movieImg.classList.add('img_container')
     movieImg.classList.add('movie-img')
     movieImg.setAttribute('alt', movie.title)
     movieImg.setAttribute(
      lazyLoad? 'data-img': 'src',
       'https://image.tmdb.org/t/p/w300' + movie.poster_path)
     movieContainer.addEventListener('click', ()=>{
       location.hash = '#movie=' + movie.id;
     })
     if(lazyLoad){
      lazyLoader.observe(movieImg)
     }
     movieImg.addEventListener('error', ()=>{
       movieImg.setAttribute(
         'src',
         'https://cdn.dribbble.com/users/3167939/screenshots/10422336/media/b618a0e73996c3b24b58b2db1c881ee3.png?compress=1&resize=768x576&vertical=top'
       )
     })
     
     
     movieContainer.appendChild(movieImg)
     container.appendChild(movieContainer)

 });
}
function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach(category => {  
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('categories_li2');

    const categoryTitle = document.createElement('span');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}
  
// llamados a la api



async function getTrendingMoviesPreview() {
    const {data} = await api('/trending/movie/day?');
    const movies = data.results;
    console.log({movies})
    creatMovies(movies,trendingPreviewMoviesContainer, {lazyLoad:true});

  }
async function getCategoriesPreview() {
    const {data} = await api('genre/movie/list?');

    
    const categories = data.genres;
    const categoriesPreviewContainer= document.querySelector('#categoriesPreview .categories_ul')
    categoriesPreviewContainer.innerHTML = "";
   categories.forEach(categorie => {
    
       
      const categoriesContainer= document.createElement('div')
       categoriesContainer.classList.add('categories_li')
     const categoriesTitle= document.createElement('span')
       categoriesTitle.setAttribute('id', categorie.id)
       categoriesTitle.addEventListener('click', ()=>{
         location.hash=`#category=${categorie.id}-${categorie.name}`;
       })
    const categoriesTitleText= document.createTextNode(categorie.name) 
       
     categoriesTitle.appendChild(categoriesTitleText)
     categoriesContainer.appendChild(categoriesTitle)
     categoriesPreviewContainer.appendChild(categoriesContainer)
   });

  }
  

  async function getMoviesByCategorie(id) {
    const {data} = await api('discover/movie',{
      params:{
        with_genres:id,
      }
    });
   
    const movies = data.results;
    console.log({movies})
    creatMovies(movies,genericList, true)

  }
  async function getMoviesBySearch(query){
    const {data} = await api('search/movie',{
      params:{
        query,
      }
    });
    const movies = data.results;
    console.log({movies})
    creatMovies(movies,genericList)

  }
  async function getTrendingMovies() {
    const {data} = await api('/trending/movie/day?');
    const movies = data.results;
    maxPage= data.total_pages
    console.log({movies})
    creatMovies(movies,genericList,  
      {
        lazyLoad:true, 
        clean:true
      });
     
    // const btnLoadMore = document.createElement('button')
    // btnLoadMore.innerText='cargar mas'
    // genericList.appendChild(btnLoadMore);
    // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);

  }

  async function getPaginatedTrendingMovies() {
    const {scrollHeight, scrollTop, clientHeight}= document.documentElement;
   const scrollIsBottom =(scrollTop + clientHeight )>=(scrollHeight -15);
    const pageIsNotMax= page < maxPage;

   if(scrollIsBottom && pageIsNotMax){
    page ++;
    const {data} = await api('/trending/movie/day?',{
      params:{
        page,
      }
    });
    const movies = data.results;
    console.log({movies})
    creatMovies(movies,genericList,
      {
        lazyLoad:true, 
        clean:false
      });
   }
   

  }
  async function getMovieById(id){
    const {data:movie} = await api('movie/'+ id);
    title_movie_details.textContent= movie.title;
    sipnosis_movie.textContent= movie.overview;
    reputation.textContent= movie.vote_average;
    img_movie_details.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + movie.poster_path)
    img_movie_details.style.background=`linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%)`
    createCategories(movie.genres, movieDetailCategoryList)
    getSimilarMovies(id)
  
    

  }
 
  async function getSimilarMovies (id){
    const {data} = await api(`/movie/${id}/similar`);
    const similarMovies= data.results;
    
    creatMovies(similarMovies, movies_recomend, true)
  }