window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
  });
arrow.addEventListener('click', () => {
    location.hash = '#home';
  });

function navigator (){
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
}

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
    
    //   ['#category', 'id-name']
    const [_, categoryData]= location.hash.split('=');
    const [categoryId, categoryName]= categoryData.split('-')
    title_genericList.innerHTML= categoryName;


    getMoviesByCategorie(categoryId)
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
    
}
