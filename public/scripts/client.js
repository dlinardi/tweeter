/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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



  renderTweets(data);
  
});
