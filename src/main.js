async function getTrendingMoviesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();
  
    const movies = data.results;
 
   movies.forEach(movie => {
       const trendingPreviewMoviesContainer= document.querySelector('#trendingPreview .tendencias_movies')
      const movieContainer= document.createElement('div')
       const movieImg= document.createElement('img')
       movieImg.classList.add('img_container')
       movieImg.classList.add('movie-img')
       movieImg.setAttribute('alt', movie.title)
       movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path)
       
       movieContainer.appendChild(movieImg)
       trendingPreviewMoviesContainer.appendChild(movieContainer)

   });

  }
async function getCategoriesPreview() {
    const res = await fetch('https://api.themoviedb.org/3//genre/movie/list?api_key=' + API_KEY);
    const data = await res.json();
  
    const categories = data.genres;
 
   categories.forEach(categorie => {
       const categoriesPreviewContainer= document.querySelector('#categoriesPreview .categories_ul')
      const categoriesContainer= document.createElement('div')
       categoriesContainer.classList.add('categories_li')
     const categoriesTitle= document.createElement('span')
       categoriesTitle.setAttribute('id', categorie.id)
    const categoriesTitleText= document.createTextNode(categorie.name) 
       
     categoriesTitle.appendChild(categoriesTitleText)
     categoriesContainer.appendChild(categoriesTitle)
     categoriesPreviewContainer.appendChild(categoriesContainer)
   });

  }
  
  getTrendingMoviesPreview();
  getCategoriesPreview();