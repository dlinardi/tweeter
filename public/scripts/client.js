/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
  $('form').submit(function(e) {
    e.preventDefault();

    // hide any validation feedback whenever form is resubmitted
    hideValidation('.invalid', 200);
    hideValidation('.success', 200);

    const userInput = $('form textarea').val();

    if (validInput(userInput)) {
      $
      .ajax({
        url: "/tweets",
        method: "POST",
        data: $('form').serialize()
      })
      .then(() => {
        $('#tweet-text').val('');
        $('.counter').val(140);
        loadTweets();
      })
      .catch(error => console.log(error));
    } else {
      console.log('Invalid input.')
    }

  });
  
});
