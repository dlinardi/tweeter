$(document).ready(() => {
  
  const maxChars = $('.counter').val();

  $('#tweet-text').on('input', function() {
    const inputLength = this.value.length;
    let difference = maxChars - inputLength;

    if (difference < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '#545149');
    }

    const dynamicCount = $('.counter').text(difference);
  });

});