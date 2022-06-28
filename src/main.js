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
function creatMovies(movies, container){
  container.innerHTML='';
  movies.forEach(movie => {
       
    const movieContainer= document.createElement('div')
     const movieImg= document.createElement('img')
     movieImg.classList.add('img_container')
     movieImg.classList.add('movie-img')
     movieImg.setAttribute('alt', movie.title)
     movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path)
     
     movieContainer.appendChild(movieImg)
     container.appendChild(movieContainer)

 });
}
  
// llamados a la api



async function getTrendingMoviesPreview() {
    const {data} = await api('/trending/movie/day?');
    const movies = data.results;
    console.log({movies})
    creatMovies(movies,trendingPreviewMoviesContainer);

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
    creatMovies(movies,genericList)

  }