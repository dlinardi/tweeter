/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {

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

  $('form').submit(function(e) {
    e.preventDefault();

    $
      .ajax({
        url: "/tweets",
        method: "POST",
        data: $('form').serialize()
      })
      .then(res => console.log(res))
      .catch(error => console.log(error));

  });

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

  loadTweets();
  
});
