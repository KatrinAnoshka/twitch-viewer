$(document).ready(function() {

  var streamers = ["freecodecamp", "inskoi", "Matrixis", "Button", "DeadPine", "fake_ded", "bllonde", "malekir", "Knisproslide", "OfficialFrasse"];
  var placeholder = 'img/placeholder.png';

  streamers.forEach(function(streamer) {
    
    $.getJSON("https://wind-bow.gomix.me/twitch-api/users/" + streamer +'?callback=?',
      function(result) {
        $('.streamers').append('<li id="' + streamer + '">');
        $('li:last').append('<img src="' + (result.logo ===
            null ? placeholder : result.logo) + '">' +
          '<span class="name">' + result.display_name);
          
      $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" +
          streamer + '?callback=?',
          function(result) {
            if (result.stream === null) {
              $('#' + streamer).append('<p><i class="fa fa-times-circle"></i> Offline</p>').addClass('offline');
            } else {
              $('#' + streamer).append('<p><i class="fa fa-twitch"></i> ' + result.stream.channel.status +
                '</p>').addClass('online');
            }
            $('#' + streamer).wrapInner(
              '<a href="https://www.twitch.tv/' +
              streamer + '/" target="_blank">');
          });
      
        if ($('.streamers li').length === streamers.length) {
          setEventHandlers();
        }
      });
  });

  function setEventHandlers() {
    $('li:contains(All)').click(function() {
      $('li').removeClass('hidden selected');
      $(this).addClass('selected');
    });
    
    $('li:contains(Offline)').click(function() {
      $('li').removeClass('selected');
      $('li').filter('.online').addClass('hidden');
      $(this).addClass('selected');
      $('li').filter('.offline').removeClass('hidden');
    });
    
    $('li:contains(Online)').click(function() {
      $('li').removeClass('selected');
      $('li').filter('.online').removeClass('hidden');
      $(this).addClass('selected');
      $('li').filter('.offline').addClass('hidden');
    });
    
    $('input').keyup(search);
  }

  function search() {
    var searchQuery = $('input').val().toLowerCase();
    $('.streamers li').each(function() {
      var name = $(this).find('.name').text().toLowerCase();
      if (name.indexOf(searchQuery) === -1) {
        $(this).addClass('filtered');
      } else {
        $(this).removeClass('filtered');
      }
    });
  }

});