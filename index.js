'use strict';

/**
 * Displays the image within the div
 */
function displayResults(responseJson, breed) {
  console.log(responseJson.message);
  if (responseJson.message === "Breed not found") {
    $('.results').append(`<h2>Breed not found - Please try again.`);
  } 
  else {
    $('.results').append (`<h2>Here is a ${breed}: </h2>
    <img src="${responseJson.message}" class=results-img>`);
  }
  $('.results').removeClass('hidden');
}

function getDogImage(breed) {
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
    //.then(response => response.json())
    //.then(responseJson => displayResults(responseJson, breed))
    //.catch(error => alert(`Something went wrong: ${err.message}`));
}

function watchForm() {
  $('form').on('submit', function() {
    event.preventDefault();
    const breed = $('.js-breed-input').val();
    $('.results').empty();
    getDogImage(breed);
  });
}

function main() {
  console.log('App loaded. Waiting for submit.');
  watchForm();
}

$(main);