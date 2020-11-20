$(document).ready(() => {

  // animate navigation arrow and call scrollCheck function
  animateNavArrow();
  scrollCheck();

  // count variable for flipping arrow in #compose
  let composeClickCount = 0; 

  // when back to top button is clicked scroll back to top 
  // trigger #compose click event
  $('#top').click(() => {
    $('html, body').animate({
      scrollTop: 0
    }, 200);

    if (composeClickCount % 2 === 0) {
      $('#compose').trigger('click');
    } else {
      $('#tweet-text').focus();
    }
  });

  // click handler for toggling new-tweet
  $('#compose').click(function() {

    // if composeClickCount is even, arrow is up, 
    // if composeClickCount is odd, arrow is down
    if (composeClickCount % 2 === 0) {
      $('#nav-arrow i').removeClass('fa-angle-double-down');
      $('#nav-arrow i').addClass('fa-angle-double-up');
    } else {
      $('#nav-arrow i').removeClass('fa-angle-double-up');
      $('#nav-arrow i').addClass('fa-angle-double-down');
    }
    
    $('.new-tweet').fadeToggle();
    $('#tweet-text').focus();

    composeClickCount++;
  });

  // load default tweets
  loadTweets();

});