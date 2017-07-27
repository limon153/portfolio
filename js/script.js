$(document).ready(function(){
  var mainHeader = $(".auto-hide-header"),
    headerHeight = mainHeader.height();

  var scrolling = false,
    previousTop = 0,
    currentTop = 0,
    scrollDelta = 10,
    scrollOffset = 150;

  mainHeader.on('click', '.nav-trigger', function(event){
    // open primary navigation on mobile
    event.preventDefault();
    mainHeader.toggleClass('nav-open');
  });

  $(window).on('scroll', function(){
    if (!scrolling) {
      scrolling = true;
      (!window.requestAnimationFrame)
      ? setTimeout(autoHideHeader, 250)
      : requestAnimationFrame(autoHideHeader);
    }
  });

  $(window).on('resize', function(){
    headerHeight = mainHeader.height();
  });

  function autoHideHeader() {
    currentTop = $(window).scrollTop();

    if (previousTop - currentTop > scrollDelta) {
      // If scrolling up...
      mainHeader.removeClass('is-hidden');
    } else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
      // If scrolling down...
      mainHeader.addClass('is-hidden');
    }

    previousTop = currentTop;
    scrolling = false;
  }

  function animateTo(element) {
    $("#" + element + "-btn").click(function() {
      $("html, body").animate(
        {scrollTop:$("#" + element).position().top - headerHeight - 10}, 1000);
        mainHeader.removeClass('nav-open');
    });
  }

  animateTo("about");
  animateTo("portfolio");
  animateTo("contacts");

  $('.input').on('input keyup', function(e) {
    $(this).parent().addClass('form-item-filled');
    if ($(this).val() == '') {
      $(this).parent().removeClass('form-item-filled');
    }
  });

});
