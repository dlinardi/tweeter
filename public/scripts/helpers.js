// create tweet element from JSON object
const createTweetElement = (tweetObj) => {
  const userObject = tweetObj.user;
  const contentObject = tweetObj.content;
  
  // creating structure of tweet container
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

  const momentCreated = moment(tweetObj.created_at).fromNow();

  const created = $('<span>').text(momentCreated);
  const reactIcons = $('<span class="social-icons">');

  const flag = $('<i class="fas fa-flag">');
  const repost = $('<i class="fas fa-retweet">');
  const heart = $('<i class="fas fa-heart">');

  // append all social icons to reactIcons span container
  reactIcons.append(flag);
  reactIcons.append(repost);
  reactIcons.append(heart);

  // append all footer content to footer
  tweetFooter.append(created);
  tweetFooter.append(reactIcons);

  // append all tweet content to tweet container
  tweet.append(tweetHeader);
  tweet.append(tweetData);
  tweet.append(tweetFooter);

  return tweet;
};

// for each tweet in the array of tweet objects, prepend each tweet
const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
};

// ajax get request to GET tweets and render them using renderTweets
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

// validate user input and structure validation feedback messages
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

// hide validation error/success messages
const hideValidation = (selector, duration) => {
  $(selector).fadeOut(duration, () => {
    $(selector).css('display', 'none');
  });
};

// on hover, animate nav arrow
const animateNavArrow = () => {
  let bounce;
  
  $('#compose').hover(function() {
    // set cursor to mimic an link
    $('#compose').css('cursor', 'pointer');

    // when hovering, bounce up and down 
    bounce = setInterval(() => {
      $('#nav-arrow').animate({ 'margin-top':'10px' }, 200);
      $('#nav-arrow').animate({ 'margin-top':'5px' }, 200);
    }, 500);
  },
  // move back to original position once not hovering
  function() {
    clearInterval(bounce);
    $('#nav-arrow').css('margin-top', '0px');
  });
};

// scroll check for nav/back-to-top animations/functionality.
const scrollCheck = () => {
  $(window).scroll(function () {
    if ($(this).scrollTop() - 200 > 0) {
      $('.top-container').stop().fadeIn(250);
      $('nav').stop().css('background-color', 'transparent').css("transition","0.5s ease-in-out ");
      $('nav #logo').stop().css('color', '#4056A1').css("transition","0.5s ease-in-out ");
      $('#compose').fadeOut(500).hide();
    } else {
      $('.top-container').stop().fadeOut(250);
      $('nav').css('background-color', '#4056A1').css("transition","0.2s ease-in-out ");
      $('nav #logo').css('color', '#fff').css("transition","0.5s ease-in-out ");
      $('#compose').fadeIn(500).show();
    }
  });
};