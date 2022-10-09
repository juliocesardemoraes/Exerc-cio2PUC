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
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=58a6af7c57bd237d8c8b737a26bdd1ce&language=pt-BR&language=en-us&page=1`,
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

const castRendered = {};
const reviewsRendered = {};

/**
 * Function to render all reviews about a singular movie
 * @returns {DOM Element} Element containing all reviews
 */
const renderReviews = () => {
  const movieId = document.querySelector(".component__show__movie");

  movieIdNumber = movieId.getAttribute("movieId");
  iteratorNumber = movieId.getAttribute("counterId");

  if (reviewsRendered[movieIdNumber]) {
    return;
  }
  reviewsRendered[movieIdNumber] = true;

  const reviewContainer = document.createElement("div");
  reviewContainer.setAttribute("id", "review__container");

  const reviewTitle = document.createElement("h2");
  reviewTitle.classList.add("review__title");
  reviewTitle.innerHTML = "Avaliações";

  const reviewMainContent = document.createElement("div");
  reviewMainContent.setAttribute("id", `review${iteratorNumber}`);

  fetchReview(movieIdNumber).then((review) => {
    for (let i = 0; i < review.results.length; i++) {
      const reviewFlex = document.createElement("div");
      reviewFlex.classList.add("flex");
      reviewFlex.classList.add("review__container");
      const reviewContentPlaceholder = document.createElement("div");
      reviewContentPlaceholder.classList.add("profilePictureHolder");

      const imageElement = document.createElement("img");
      imageElement.classList.add("profilePicture");

      if (review.results[i]?.author_details?.avatar_path) {
        imageElement.setAttribute(
          "src",
          `https://image.tmdb.org/t/p/w500/${review.results[i]?.author_details?.avatar_path}`
        );
      } else {
        imageElement.classList.add("remove__height");
      }

      reviewContentPlaceholder.append(imageElement);
      reviewFlex.append(reviewContentPlaceholder);

      const divName = document.createElement("div");
      const divHeaderName = document.createElement("h3");
      const spanReview = document.createElement("span");

      divHeaderName.innerHTML =
        review.results[i]?.author_details?.name || review.results[i]?.author;
      spanReview.innerHTML = review.results[i]?.content;

      divName.append(divHeaderName);
      divName.append(spanReview);
      reviewFlex.append(divName);
      reviewMainContent.append(reviewFlex);
    }
  });

  reviewContainer.append(reviewTitle);
  reviewContainer.append(reviewMainContent);

  // Had to select again because it has lost its reference
  const movieIdNew = document.querySelector(".component__show__movie");
  movieIdNew.append(reviewContainer);
};

/**
 * This Function Loads the first user iteration returning all necessary
 * values about one movie
 * @returns {DOM Element}
 */
const renderFirstCast = () => {
  const movieId = document.querySelector(".component__show__movie");
  movieIdNumber = movieId.getAttribute("movieId");
  iteratorNumber = movieId.getAttribute("id__counter");

  if (castRendered[movieIdNumber]) {
    return;
  }
  castRendered[movieIdNumber] = true;

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
};

/**
 * Move the DOM carousel container
 * @param {Number} id
 */
function carouselMove(id) {
  const dotChange = document.getElementById(`dot${id}`);
  const container = document.querySelector("#movie__placeholder");
  const matches = container.querySelectorAll("iframe");
  for (let i = 0; i < matches.length; i++) {
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
  for (let i = 0; i < carouselDots.length; i++) {
    carouselDots[i].classList.remove("fa-solid");
  }
  dotChange.classList.add("fa-solid");

  const allMovieInfo = document.querySelectorAll(".movie__info__container");
  for (let i = 0; i < allMovieInfo?.length; i++) {
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
    if (i == 0) {
      allMovieInfo?.[0].classList.add("component__show__movie");
    }
  }
}

/**
 * Function for rendering movie name and description
 * @param {JSON} movieResult The movies fetched from the api
 * @param {DOM Element} movieInfoHeader The div that the information is going to be inserted
 * @param {Number} i iterator to get the movie
 * @returns {DOM Element} Dom Element
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
 * @param {DOM Element} movieInfoHeader
 * @param {DOM Element} movieInfo
 * @param {Number} i
 * @returns {DOM Element} Dom Element
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

/**
 *
 * @param {string} movieSection the section of the movie
 * @param {string} listId that it's going to be inserted to
 */
function loadMovieList(movieSection) {
  document.getElementById("page__loaded").classList.add("component__hide");
  fetchMovies(movieSection)
    .then(function (movieResult) {
      if (movieResult) {
        for (let i = 0; i < movieResult?.results?.length; i++) {
          //  Because there's a then the function doesn't work syncronous
          //  Have to rework it for it to work one by one
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
                if (i === 0) {
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
                movieContainer.setAttribute("counterId", `${i}`);

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
              }
            })
            .catch(function (error) {
              console.log("ERROR FETCHING MOVIES", error);
            })
            .finally(function () {
              hideOnFirstRender();
            });

          fetchReview(movieResult?.results[i]).then(function (movieReview) {});
        }

        document
          .getElementById("page__loader")
          .classList.add("component__hide");
        document
          .getElementById("page__loaded")
          .classList.remove("component__hide");
      }
    })
    .catch((error) => {
      console.log("ERROR", error);
    })
    .finally(() => {});
}

$(window).scroll(function () {
  if ($(window).scrollTop() + $(window).height() > $(document).height() / 2) {
    renderFirstCast();
    renderReviews();
  }
});
