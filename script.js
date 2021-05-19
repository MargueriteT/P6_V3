$(document).ready(function(){
    console.log('Ready')
    getAllContentHomePage();
});



// Collect all movies for home page
function getAllContentHomePage(){
    getBestMovie();
    getAllMovies();
    getZombieMovies();
    getActionMovies();
    getRomanceMovies();
}

// Collect data about the best movie
function getBestMovie () {
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score').then(async(responseData) => {
        const response = await responseData.json();
        var bestMovie = response.results[0].url;
        fetch(bestMovie).then(async(respData) => {
            const resp = await respData.json();
            let output = `
               <div class="best_film" >
                    <a> The best of the best </a>
                    <h1 > "${resp.title}"</h1>
                    <p > "${resp.long_description}"</p>
                    <button id="bestMovie" class="btn" onclick="movieSelected('${resp.url}')">More info</button>
               </div>
               <div class="best_film_image">
                    <img src="${resp.image_url}">
               </div>
            `;
            $("#bestMovie").html(output);
        })
        })

}

// Collect data about best movies
function getAllMovies (){
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score').then(async(responseData) => {
        const response = await responseData.json();
        var fiveMovies = response.results;
          if (fiveMovies.length < 7){
             const pageTwo= "&page=2";
             fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score'+pageTwo).then(async(responseDataTwo) => {
             const responseTwo = await responseDataTwo.json();

             var oneOtherMovies = responseTwo.results[0];
             var secondOtherMovies = responseTwo.results[1];
             var sixMovies = fiveMovies.concat(oneOtherMovies);
             var allMovies = sixMovies.concat(secondOtherMovies);
             let output = "";
             $.each(allMovies, (index, movie) => {
                output += `

                        <li class="slider-item" onclick="movieSelected('${movie
                        .url}')" >
                            <h3 class='slider-item'>"${movie.title}" </h3>
                            <img src="${movie.image_url}">
                        </li>

                `;
            });
            $("#allMovies").html(output);

   })}
})}

// Collect data about best zombie movies
function getZombieMovies (){
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&title_contains=zombie').then(async(responseData) => {
        const response = await responseData.json();
        var fiveMovies = response.results;
          if (fiveMovies.length < 7){
             const pageTwo= "&page=2";
             fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&title_contains=zombie'+pageTwo).then(async(responseDataTwo) => {
             const responseTwo = await responseDataTwo.json();

             var oneOtherMovies = responseTwo.results[0];
             var secondOtherMovies = responseTwo.results[1];
             var sixMovies = fiveMovies.concat(oneOtherMovies);
             var allMovies = sixMovies.concat(secondOtherMovies);
             let output = "";
             $.each(allMovies, (index, movie) => {
                output += `

                        <li class="slider-item" onclick="movieSelected('${movie.url}')">
                            <h3 class="slider-item" >"${movie.title}" </h3>

                            <img src="${movie.image_url}">
                        </li>

                `;
            });
            $("#zombieMovies").html(output);

   })}
})}

// Collect data about best action movies
function getActionMovies (){
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=action').then(async(responseData) => {
        const response = await responseData.json();
        var fiveMovies = response.results;
          if (fiveMovies.length < 7){
             const pageTwo= "&page=2";
             fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=action'+pageTwo).then(async(responseDataTwo) => {
             const responseTwo = await responseDataTwo.json();

             var oneOtherMovies = responseTwo.results[0];
             var secondOtherMovies = responseTwo.results[1];
             var sixMovies = fiveMovies.concat(oneOtherMovies);
             var allMovies = sixMovies.concat(secondOtherMovies);
             let output = "";
             $.each(allMovies, (index, movie) => {
                output += `

                        <li class="slider-item" onclick="movieSelected('${movie.url}')">
                            <h3 class="slider-item">"${movie.title}" </h3>
                            <img src="${movie.image_url}">
                        </li>

                `;
            });
            $("#actionMovies").html(output);

   })}
})}

// Collect data about best romance movies
function getRomanceMovies (){
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=romance').then(async(responseData) => {
        const response = await responseData.json();
        var fiveMovies = response.results;
          if (fiveMovies.length < 7){
             const pageTwo= "&page=2";
             fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=romance'+pageTwo).then(async(responseDataTwo) => {
             const responseTwo = await responseDataTwo.json();

             var oneOtherMovies = responseTwo.results[0];
             var secondOtherMovies = responseTwo.results[1];
             var sixMovies = fiveMovies.concat(oneOtherMovies);
             var allMovies = sixMovies.concat(secondOtherMovies);
             let output = "";
             $.each(allMovies, (index, movie) => {
                output += `

                        <li class="slider-item" onclick="movieSelected('${movie.url}')">
                            <h3 class="slider-item">"${movie.title}" </h3>
                            <img src="${movie.image_url}">
                        </li>

                `;
            });
            $("#romanceMovies").html(output);

   })}
})}

function movieSelected (url) {
    sessionStorage.setItem('movieUrl', url);
    window.location = 'movie.html';
    return false;

}

function getMovieDetails (){
    let movieUrl = sessionStorage.getItem('movieUrl');
    movieDetailsHeader(movieUrl);
    movieDetailsGeneralInfo(movieUrl);
    movieDetailsDescription(movieUrl);
    getActors(movieUrl);
    movieDetailsOtherInfo(movieUrl);
}

function movieDetailsHeader (movieUrl) {
    fetch(movieUrl).then(async(responseData) => {
        const response = await responseData.json();
        let output = `
            "${response.title}"  `;
            $("#movieDetailsHeader").html(output);})

}

function movieDetailsGeneralInfo(movieUrl){
    fetch(movieUrl).then(async(responseData) => {
        const response = await responseData.json();
        let output = `
            <li class="movieDetailsGenre"> Genres : "${response.genres}"</li>
            <li class="movieDetailsDate"> Released : "${response.date_published}"</li>
            <li class="movieDetailsDuration"> Duration : "${response.duration}" min</li>
            <li class="movieDetailsImdb_score"> imdb Score : "${response.imdb_score}"</li>
            <li class="movieDetailsRated"> Rating : "${response.rated}"</li>
             `;
            $("#movieDetailsGeneralInfo").html(output);})

}

function movieDetailsDescription(movieUrl){
    fetch(movieUrl).then(async(responseData) => {
        const response = await responseData.json();
        let output = `
            <p class="movieDetailsDescription">"${response.long_description}"</p>
            <div class="movieDetailsImage">
             <img class="movieDetailsImage" src="${response.image_url}">
             </div>
             `;
            $("#movieDetailsDescription").html(output);})
}

function getActors (movieUrl) {
    fetch(movieUrl).then(async(responseData) => {
        const response = await responseData.json();
        let listOfActors = response.actors
        let output = "";
        $.each(listOfActors, (index, actor) => {
            output += ` <li> "${actor}" </li> `;
        });
        console.log(output)
        $('#movieDetailsActors').html(output);})
}

function movieDetailsOtherInfo (movieUrl) {
    fetch(movieUrl).then(async(responseData) => {
        const response = await responseData.json();
        let listOfGenres = response.genres
        let output = `
        <li> Directors : "${response.directors}" </li>
        <li> Countries : "${response.countries}" </li>
        <li> Box Office : "${response.worldwide_gross_income}" </li>

        `;

        console.log(output)
        $('#movieDetailsOtherInfo').html(output);})
}

counterAll=0;
counterZombie=0;
counterRomance=0;
counterAction=0;
function nextAll(id){
    const content = document.querySelector(id);
    const allItems = Array.from(content.children);
    if(id=='#allMovies'){
        counterAll++;
        if(counterAll==4){
            counterAll=0; }
        var translation = -450 * counterAll ;
        content.style.transform = `translateX(${translation}px)`;
    } else if(id=='#zombieMovies'){
        counterZombie++;
        if(counterZombie==4){
            counterZombie=0; }
        var translation = -450 * counterZombie ;
        content.style.transform = `translateX(${translation}px)`;
    } else if(id=='#romanceMovies'){
        counterRomance++;
        if(counterRomance==4){
            counterRomance=0; }
        var translation = -450 * counterRomance ;
        content.style.transform = `translateX(${translation}px)`;

    } else if(id=='#actionMovies'){
        counterAction++;
        if(counterAction==4){
            counterAction=0; }
        var translation = -450 * counterAction ;
        content.style.transform = `translateX(${translation}px)`;
    }


}

function previousAll(id){
    const content = document.querySelector(id);
    const allItems = Array.from(content.children);
    if(id=='#allMovies'){
        counterAll--;
        if(counterAll<0){
            counterAll=4; }
        var translation = -450 * counterAll ;
        content.style.transform = `translateX(${translation}px)`;
    } else if(id=='#zombieMovies'){
        counterZombie--;
        if(counterZombie<0){
            counterZombie=4; }
        var translation = -450 * counterZombie ;
        content.style.transform = `translateX(${translation}px)`;
    } else if(id=='#romanceMovies'){
        counterRomance--;
        if(counterRomance<0){
            counterRomance=4; }
        var translation = -450 * counterRomance ;
        content.style.transform = `translateX(${translation}px)`;

    } else if(id=='#actionMovies'){
        counterAction--;
        if(counterAction<0){
            counterAction=4; }
        var translation = -450 * counterAction ;
        content.style.transform = `translateX(${translation}px)`;
    }


}
