
let page= 1;
let infiniteScroll;
let maxPage;
window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)
window.addEventListener('scroll', infiniteScroll, false)


trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
  });
  search_button.addEventListener('click', () => {
   
    location.hash = '#search='+  searchFormInput.value;
  });
arrow.addEventListener('click', () => {
    // location.hash = '#home';
    history.back();
    
  });

function navigator (){
    if(infiniteScroll){
        window.addEventListener('scroll', infiniteScroll, {passive: false})
        infiniteScroll= undefined;
    }
    console.log({location})
if (location.hash.startsWith('#trends')){
   trendsPage()
} else if (location.hash.startsWith('#search=')){
   searchPage()
} else if (location.hash.startsWith('#category=')){
   categoriesPage()
} else if (location.hash.startsWith('#movie=')){
    movieDetailsPage()
} else {
    homePage()
}
document.body.scrollTop=0;
document.documentElement.scrollTop= 0;
if(infiniteScroll){
    window.addEventListener('scroll', infiniteScroll, {passive: false})
}

}
const $liked_section2 = document.querySelector("#liked_section2");
const $liked_section = document.querySelector("#liked_section");

function homePage (){
    console.log('HOME')
    headerUserInfo.classList.remove('inactive')
    searchForm.classList.remove('inactive')
    trendinTitle.classList.remove('inactive')
    trendingPreviewMoviesContainer.classList.remove('inactive')
    sectionMovieDetails.classList.add('inactive')
    genericList.classList.add('inactive')
    categoriesPreviewContainer.classList.remove('inactive')
    arrow.classList.add('inactive')
    title_genericList.classList.add('inactive')
$liked_section.style.display = "flex";
$liked_section2.style.display = "n";
    

    
   
  
    


    getTrendingMoviesPreview();
    getCategoriesPreview();
}
function trendsPage (){
    console.log('TRENDS!!')
    headerUserInfo.classList.add('inactive')
    searchForm.classList.add('inactive')
    trendinTitle.classList.add('inactive')
    trendingPreviewMoviesContainer.classList.add('inactive')
    sectionMovieDetails.classList.add('inactive')
    genericList.classList.remove('inactive')
    categoriesPreviewContainer.classList.add('inactive')
    arrow.classList.remove('inactive')
    title_genericList.classList.remove('inactive')
    title_genericList.innerHTML= 'Tendencias';
 


    getTrendingMovies()
    infiniteScroll= getPaginatedTrendingMovies;

}
function searchPage (){
    console.log('SEARCH!!')
    headerUserInfo.classList.add('inactive')
    searchForm.classList.remove('inactive')
    trendinTitle.classList.add('inactive')
    trendingPreviewMoviesContainer.classList.add('inactive')
    sectionMovieDetails.classList.add('inactive')
    genericList.classList.remove('inactive')
    categoriesPreviewContainer.classList.add('inactive')
    arrow.classList.remove('inactive')
    title_genericList.classList.add('inactive')
    

     
    //   ['#search', 'buscador']
    const [_, query]= location.hash.split('=');
    getMoviesBySearch(query);
    infiniteScroll= getPaginatedMoviesBySearch(query);
    
}
function categoriesPage (){
    console.log('CATEGORIES!!')
    headerUserInfo.classList.add('inactive')
    searchForm.classList.add('inactive')
    trendinTitle.classList.add('inactive')
    trendingPreviewMoviesContainer.classList.add('inactive')
    sectionMovieDetails.classList.add('inactive')
    genericList.classList.remove('inactive')
    categoriesPreviewContainer.classList.add('inactive')
    arrow.classList.remove('inactive')
    title_genericList.classList.remove('inactive')
$liked_section.style.display = "none";
$liked_section2.style.display='none'

   
    
    //   ['#category', 'id-name']
    const [_, categoryData]= location.hash.split('=');
    const [categoryId, categoryName]= categoryData.split('-')
    title_genericList.innerHTML= categoryName;


    getMoviesByCategorie(categoryId);
    infiniteScroll= getPaginatedMoviesByCategory(categoryId);
    

}
function movieDetailsPage (){
    console.log('MOVIE!!')
    headerUserInfo.classList.add('inactive')
    searchForm.classList.add('inactive')
    trendinTitle.classList.add('inactive')
    trendingPreviewMoviesContainer.classList.add('inactive')
    sectionMovieDetails.classList.remove('inactive')
    genericList.classList.add('inactive')
    categoriesPreviewContainer.classList.add('inactive')
    arrow.classList.remove('inactive')
    title_genericList.classList.add('inactive')
    liked_section.classList.add('inactive')
    const $liked_section = document.querySelector("#liked_section");
$liked_section.style.display = "none";
    const $liked_section2 = document.querySelector("#liked_section2");
$liked_section2.style.display = "none";
 

     //   ['#movie', 'id']
     const [_, movieId]= location.hash.split('=');
     getMovieById(movieId);
    
}
