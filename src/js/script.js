function movieSelected(id) {
    sessionStorage.setItem('movieID', id);
    window.location = 'moviePage.html';
    return false;
}     

function getMovies(searchText) {
    //use axios http client to request from the movie api
    axios.get('https://www.omdbapi.com/?apikey=751d2db1&s='+searchText)
    .then((response) => {
        let movies = response.data.Search;
        console.log(response);
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
            <div class="col-md-3">
                <div class="well text-center">
                    <img src="${movie.Poster}">
                    <h5>${movie.Title}</h5>
                    <button class="btn btn-primary" type="button"  onclick="movieSelected('${movie.imdbID}');">Movie Info</button>
                </div>
            </div>
            `;
        });

        $('#movies').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}

// retreive the movie ID form the browser storage session
function getMovie() {
    let movieID = sessionStorage.getItem('movieID');

    // request the movie from the api by the ID number so we can get all the movie details
    axios.get('http://www.omdbapi.com/?apikey=751d2db1&i='+movieID)
    .then((response) => {
    console.log(response);
    let movie = response.data;

    console.log(movie);
    let output = `

    <div class="row">
         <div class="col-md-4"> 
            <img src="${movie.Poster}" class="thumbnail">
        </div>
        <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-groups">
                <li class="item"><strong>Released: </strong>${movie.Released}</li>
                <li class="item"><strong>Genre: </strong>${movie.Genre}</li>
                <li class="item"><strong>Rating: </strong>${movie.Rated}</li>
                <li class="item"><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
                <li class="item"><strong>Director: </strong>${movie.Director}</li>
                <li class="item"><strong>Writer: </strong>${movie.Writer}</li>
                <li class="item"><strong>Actors: </strong>${movie.Actors}</li>

            </ul>
        </div>
    </div>


    <div class="row">
        <div class="col-sm-12">
            <div class="well">
                <h3>Plot</h3>
                    <p class="plot">${movie.Plot}</p>
                <hr>
                    <a class="btn btn-primary"href="http://imdb.com/title/${movie.imdbID}" target="_blank">Veiw on IMDB</a>
                    <a class="btn btn-secondary" href="index.html">Back to Search</a>            
                </hr>
            </div>
        </div>
    </div>
    `; 

    $('#movie').html(output);
    })
    .catch((err) => {
        console.log(err);
    });

}

$(document).ready(() =>{
    
   
    
    //retreive the title or name fo movie that was entered into the search bar
    $('.searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
        

    });

   
   

    getMovies(searchText); 
    movieSelected(id); 
    getMovie(); 


    
});