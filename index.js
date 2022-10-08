/**
 *
 * @param {string} movieSection Check the movie by section
 * @returns {object} Object containing the movie list that was requested
 */
function fetchMovies(movieSection) {
  try {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movieSection}?api_key=58a6af7c57bd237d8c8b737a26bdd1ce&language=pt-BR&page=1`,
      { mode: "cors" }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        return json;
      });
  } catch (error) {
    console.log("ERROR", error);
  }
}

/**
 * Get Cast from the api
 * @param {Number} movieId Movie Id number
 * @returns Results bringing the movie detailed cast
 */
function fetchCast(movieId) {
  try {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=58a6af7c57bd237d8c8b737a26bdd1ce&language=pt-BR`,
      { mode: "cors" }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        return json;
      });
  } catch (error) {
    console.log("ERROR", error);
  }
}

/**
 * Calling api with reviews
 * @param {Number} movieId Movie Id number
 * @returns {JSON} Results bringing the movie detailed reviews
 */
function fetchReview(movieId) {
  try {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=58a6af7c57bd237d8c8b737a26bdd1ce&language=pt-BR&language=pt-BR&page=1`,
      { mode: "cors" }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        return json;
      });
  } catch (error) {
    console.log("ERROR", error);
  }
}

/**
 *
 * @param {string} movieId Id from movieDB Database used for fetching the video
 * @returns
 */
function fetchMovieVideo(movieId) {
  try {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=58a6af7c57bd237d8c8b737a26bdd1ce&language=pt-BR`,
      { mode: "cors" }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        return json;
      });
  } catch {
    console.log("ERROR", error);
  }
}

/**
 * Move the DOM carousel container
 * @param {string} id
 */
function carouselMove(id) {
  const dotChange = document.getElementById(`dot${id}`);
  const container = document.querySelector("#movie__placeholder");
  const matches = container.querySelectorAll("iframe");
  for (let i = 0; i < matches.length; ++i) {
    matches[i].classList.remove("component__show");
    matches[i].classList.add("component__hide");
  }
  //const moviePlaceholder = document.getElementById("movie__placeholder");
  //moviePlaceholder.firstElementChild.classList.add("component__hide");
  const showElement = document.getElementById(`movie${id}`);
  showElement.classList.add("component__show");
  showElement.classList.remove("component__hide");

  const carousel = document.querySelector("#carousel");
  const carouselDots = carousel.querySelectorAll("i");
  for (let i = 0; i < carouselDots.length; ++i) {
    carouselDots[i].classList.remove("fa-solid");
  }
  dotChange.classList.add("fa-solid");

  const allMovieInfo = document.querySelectorAll(".movie__info__container");
  for (let i = 0; i < allMovieInfo?.length; ++i) {
    allMovieInfo[i].classList.remove("component__show__movie");
    allMovieInfo[i].classList.add("component__hide__movie");
  }

  const showElementInfo = document.getElementById(`info${id}`);
  showElementInfo.classList.add("component__show__movie");
  showElementInfo.classList.remove("component__hide__movie");
}

function hideOnFirstRender() {
  const allMovieInfo = document.querySelectorAll(".movie__info__container");
  for (let i = 0; i < allMovieInfo?.length; ++i) {
    if (i > 0) {
      allMovieInfo[i].classList.remove("component__show__movie");
      allMovieInfo[i].classList.add("component__hide__movie");
    }
  }
  allMovieInfo[0].classList.add("component__show__movie");
}

/**
 * Function for rendering movie name and description
 * @param {JSON} movieResult The movies fetched from the api
 * @param {Element} movieInfoHeader The div that the information is going to be inserted
 * @param {Number} i iterator to get the movie
 * @returns {Element} Dom Element
 */
function renderMovieNameAndDescription(movieResult, movieInfoHeader, i) {
  const movieInfoNameAndYear = document.createElement("div");
  const movieInfoName = document.createElement("h2");
  movieInfoName.classList.add("movie__info__header__primary");
  movieInfoName.innerHTML = movieResult?.results[i]?.title;
  const movieInfoYear = document.createElement("span");
  movieInfoYear.classList.add("movie__info__header__secundary");
  movieInfoYear.innerHTML = ` ${new Date(
    movieResult?.results[i]?.release_date
  ).getFullYear()}`;
  movieInfoNameAndYear.append(movieInfoName, movieInfoYear);
  movieInfoHeader.append(movieInfoNameAndYear);
}

/**
 * Function for rendering movie review rating and count
 * @param {JSON} movieResult
 * @param {Element} movieInfoHeader
 * @param {Element} movieInfo
 * @param {Number} i
 * @returns {Element} Dom Element
 */
function renderMovieRatingAndCount(
  movieResult,
  movieInfoHeader,
  movieInfo,
  i,
  movieContainer
) {
  const movieRatingAndCount = document.createElement("div");
  movieRatingAndCount.classList.add("align__right");
  const movieRating = document.createElement("h2");
  movieRating.classList.add("movie__info__header__primary");
  movieRating.innerHTML = movieResult?.results[i]?.vote_average;

  const movieCountVotes = document.createElement("span");
  movieCountVotes.classList.add("movie__info__header__secundary");
  movieCountVotes.innerHTML = `Votos: ${movieResult?.results[i]?.vote_count}`;

  movieRatingAndCount.append(movieRating, movieCountVotes);

  movieInfoHeader.append(movieRatingAndCount);
  movieInfoHeader.classList.add("movie__info__header");
  movieContainer.append(movieInfoHeader);
  movieInfo.append(movieContainer);
}

function renderMovieCast(movieResult, movieInfo, role, i) {
  /*
  const container = document.createElement("div");
  container.classList.add("movie__info__casting");
  const containerRole = document.createElement("h3");
  containerRole.innerHTML = `${role}`;
  container.append(containerRole);
  const containerRoleValue = document.createElement("span");

  fetchCast(movieResult?.results[i].id).then(function (movieCast) {
    console.log(movieCast);
    for (let x = 0; x < movieCast?.cast?.length; i++) {
      console.log("movieCast", movieCast?.cast[x]);
      if (movieCast?.cast[x].know_for_department === "Directing") {
        containerRoleValue.innerHTML = movieCast?.cast[x].name;
        break;
      }
    }
  });
  container.append(containerRoleValue);

  movieInfo.append(container);
  */
}

/**
 *
 * @param {string} movieSection the section of the movie
 * @param {string} listId that it's going to be inserted to
 */
function loadMovieList(movieSection) {
  document.getElementById("page__loaded").classList.add("component__hide");
  fetchMovies(movieSection).then(function (movieResult) {
    if (movieResult) {
      for (let i = 0; i < movieResult?.results?.length; i++) {
        fetchMovieVideo(movieResult?.results[i].id)
          .then(function (movieUrl) {
            if (movieUrl?.results?.length > 0) {
              //Render the movie video
              const moviePlaceholder =
                document.getElementById("movie__placeholder");
              const iframe = document.createElement("iframe");
              iframe.src = `https://www.youtube.com/embed/${movieUrl?.results[0]?.key}`;
              iframe.setAttribute("id", `movie${i}`);
              if (i > 0) {
                iframe.classList.add("component__hide");
              }
              moviePlaceholder.appendChild(iframe);

              //Render the carousel that contains all videos
              const carousel = document.getElementById("carousel");
              const carouselDot = document.createElement("i");
              if (i == 0) {
                carouselDot.classList.add(
                  "fa-solid",
                  "fa-regular",
                  "fa-circle"
                );
              } else {
                carouselDot.classList.add("fa-regular", "fa-circle");
              }
              carouselDot.setAttribute("id", `dot${i}`);
              carouselDot.setAttribute("onclick", `carouselMove(${i})`);
              carousel.appendChild(carouselDot);

              // Add the movie info to the DOM
              const movieInfo = document.getElementById("movie__info");
              const movieContainer = document.createElement("div");
              movieContainer.setAttribute("id", `info${i}`);
              movieContainer.classList.add("movie__info__container");
              movieContainer.setAttribute(
                "movieId",
                `${movieResult?.results[i].id}`
              );

              const movieInfoHeader = document.createElement("div");

              renderMovieNameAndDescription(movieResult, movieInfoHeader, i);

              renderMovieRatingAndCount(
                movieResult,
                movieInfoHeader,
                movieInfo,
                i,
                movieContainer
              );

              const movieDescription = document.createElement("p");
              movieDescription.innerHTML = movieResult?.results[i]?.overview;
              movieDescription.classList.add("movie__info__description");
              movieContainer.appendChild(movieDescription);

              // renderMovieCast(movieResult, movieInfo, "Diretor", i);
            }
          })
          .catch(function (error) {
            console.log("ERROR FETCHING MOVIES", error);
          })
          .finally(function () {
            hideOnFirstRender();
          });

        fetchReview(movieResult?.results[i]).then(function (movieReview) {});
        /*
        const li = document.createElement("li");
        const image = document.createElement("img");
        const text = document.createElement("p");
        text.innerText = movieResult?.results[i]?.original_title;
        text.innerText += ` ${new Date(
          movieResult?.results[i]?.release_date
        ).getFullYear()}`;
        image.src = `https://image.tmdb.org/t/p/original/${movieResult?.results[i]?.poster_path}`;

          for (let x = 0; x < movieCast.cast.length; x++) {
            if (movieCast?.cast[x]?.known_for_department === "director") {
              console.log("AQUI", movieCast?.cast[x]);
              const movieCastingDirectorName = document.createElement("span");
              movieCastingDirectorName.innerHTML = movieCast?.cast[x]?.name;
              movieCasting.append(movieCastingDirectorName);
            }
          }
        */
      }

      document.getElementById("page__loader").classList.add("component__hide");
      document
        .getElementById("page__loaded")
        .classList.remove("component__hide");
    }
  });
}

const castRendered = {};

$(window).scroll(function () {
  if ($(window).scrollTop() + $(window).height() > $(document).height() - 300) {
    const movieId = document.querySelector(".component__show__movie");
    movieIdNumber = movieId.getAttribute("movieId");

    if (castRendered[movieIdNumber]) {
      return;
    }
    castRendered[movieIdNumber] = true;

    console.log(movieIdNumber);
    console.log(castRendered);

    const castContainer = document.createElement("div");
    const castContainerScreenwriter = document.createElement("div");
    const castContainerActors = document.createElement("div");
    castContainer.classList.add("movie__info__casting");
    castContainerScreenwriter.classList.add("movie__info__casting");
    castContainerActors.classList.add("movie__info__actors");

    fetchCast(movieIdNumber).then((cast) => {
      const castContainerRole = document.createElement("h3");
      castContainerRole.innerHTML = "Diretor";
      castContainer.append(castContainerRole);

      const castContainerRoleScreenplay = document.createElement("h3");
      castContainerRoleScreenplay.innerHTML = "Roteirista";
      castContainerScreenwriter.append(castContainerRoleScreenplay);

      const castContainerRoleActors = document.createElement("h3");
      castContainerRoleActors.innerHTML = "Elenco";
      castContainerActors.append(castContainerRoleActors);

      const castContainerRoleValue = document.createElement("span");
      const castContainerRoleValueScreenplay = document.createElement("span");

      const containerActors = document.createElement("div");

      for (let x = 0; x < cast.crew.length; x++) {
        if (cast.crew[x].job === "Director") {
          console.log("cast", cast.crew[x].name);
          castContainerRoleValue.innerHTML = cast.crew[x].name;
        }
        if (cast.crew[x].job === "Screenplay") {
          castContainerRoleValueScreenplay.innerHTML = cast.crew[x].name;
        }
      }

      for (let x = 0; x < cast.cast.length; x++) {
        if (cast.cast[x].known_for_department === "Acting") {
          const actorName = document.createElement("span");
          actorName.innerHTML = cast.cast[x].name;
          containerActors.append(actorName);
        }
      }

      castContainerActors.append(containerActors);
      castContainer.append(castContainerRoleValue);
      castContainerScreenwriter.append(castContainerRoleValueScreenplay);
    });

    movieId.append(castContainer);
    movieId.append(castContainerScreenwriter);
    movieId.append(castContainerActors);
  }
});
