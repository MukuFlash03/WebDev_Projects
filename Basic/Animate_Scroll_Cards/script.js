// https://webdesign.tutsplus.com/courses/3-javascript-projects-for-beginners/lessons/animate-on-scroll

function animateItems(items) {
    items.each(function(i) {
      var $this = $(this);
      setTimeout(function() {
        $this.addClass('animate');
      }, 100 * i);
    });
  }
  
  animateItems($('.services .card'));
  
  function isFullyVisible(element) {
    var bottomOfElement = element.offset().top + element.height();
    var isVisible = bottomOfElement <= ($(window).scrollTop() + $(window).height());
    return isVisible;
  }
  
  $(window).scroll(function() {
    if (isFullyVisible($('.feature').first())) {
      animateItems($('.feature'));
    }
  });