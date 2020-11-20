/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const loadTweets = () => {
  $
    .ajax(
      '/tweets', 
      { method: "GET" }
    )
    .then(tweets => {
      renderTweets(tweets);
    })
    .catch(error => console.log(error));
};

const createTweetElement = (tweetObj) => {
  const userObject = tweetObj.user;
  const contentObject = tweetObj.content;
  
  const tweet = $('<article class="tweet">');
  const tweetHeader = $('<header>');
  const tweetData = $('<div class="tweet-data">');
  const tweetFooter = $('<footer>');

  const avatar = $(`<img src="${userObject.avatars}">`);
  const nameAvatar = $('<span class="tweeter-name">');
  const name = $('<span>').text(userObject.name);
  nameAvatar.append(avatar);
  nameAvatar.append(name);

  const handle = $('<span class="tweeter-handle">').text(userObject.handle);

  tweetHeader.append(nameAvatar);
  tweetHeader.append(handle);

  const content = $('<p>').text(contentObject.text);

  tweetData.append(content);

  const created = $('<span>').text(tweetObj.created_at);
  const reactIcons = $('<span class="social-icons">');

  const flag = $('<i class="fas fa-flag">');
  const repost = $('<i class="fas fa-retweet">');
  const heart = $('<i class="fas fa-heart">');

  reactIcons.append(flag);
  reactIcons.append(repost);
  reactIcons.append(heart);

  tweetFooter.append(created);
  tweetFooter.append(reactIcons);

  tweet.append(tweetHeader);
  tweet.append(tweetData);
  tweet.append(tweetFooter);

  return tweet;
};

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
};

const hideValidation = (selector, duration) => {
  $(selector).fadeOut(duration, () => {
    $(selector).css('display', 'none');
  });
};

const validInput = (input) => {
  if (!input) {
    // create error msg based on input
    $('#error-msg').text('Invalid input, please do not leave your tweet blank.');
    
    // fade in, then fade out error message after 7 seconds
    $('.invalid').css('display', 'flex').hide().fadeIn(400, () => {
      setTimeout(() => {
        hideValidation('.invalid' ,400);
      }, 7000);
    });

    return false;
  } else if (input.length > 140) {
    // create error message based on input
    $('#error-msg').text('Invalid input, your tweet is too long!');

    $('.invalid').css('display', 'flex').hide().fadeIn(400, () => {
      setTimeout(() => {
        hideValidation('.invalid' ,400);
      }, 7000);
    });

    return false;
  }
  // create success message if input is valid
  $('#success-msg').text('Your tweet has been posted.');

  $('.success').css('display', 'flex').hide().fadeIn(400, () => {
    setTimeout(() => {
      hideValidation('.success',400);
    }, 1500);
  });

  return true;
};

$(document).ready(() => {

  loadTweets();

  $('form').submit(function(e) {
    e.preventDefault();

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
      .then(() => loadTweets())
      .catch(error => console.log(error));
    } else {
      console.log('Invalid input.')
    }

  });
  
});
