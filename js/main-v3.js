// Wrap every letter in a span
$('.ml10 .letters').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w|\S)/g, "<span class='letter'>$&</span>"));
});

var animateHeroHeadline = anime({
  targets: '.ml10 .letter',
  rotateY: [-90, 0],
  duration: 1050, //Speed of Y-flip
  elasticity: 450,
  delay: function(el, i) {
    return 25 * i;
  },
  autoplay: true
}); //Legg til flere .add for å spille de i en timeline

$(function() {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      document.body.style.backgroundColor = '#E7E7E7';
      $('.section__popular').css('opacity', '1');  
      $(':root').css('--global--text--Color', 'var(--global--hero-image--AverageColor)');  
      $('.hero__image__container__grid').css('opacity','0.25');
      
      }
  if ($(this).scrollTop() < 200) {
    document.body.style.backgroundColor = '#353236';
    $('.section__popular').css('opacity', '0.6');
    $(':root').css('--global--text--Color', '#f9f9f9');  
    $('.hero__image__container__grid').css('opacity','1');
    }
  if ($(this).scrollTop() === 0) {
    animateHeroHeadline.restart();
    }
  });
});


