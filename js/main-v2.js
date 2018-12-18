// Wrap every letter in a span
$('.ml10 .letters').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w|\S)/g, "<span class='letter'>$&</span>"));
});

anime.timeline({loop: true})
  .add({
    targets: '.ml10 .letter',
    rotateY: [-90, 0],
    duration: 1050, //Speed of Y-flip
    elasticity: 450,
    delay: function(el, i) {
      return 25 * i;
    }
  }).add({
    targets: '.ml10',
    opacity: 0,
    duration: 600, //How long is the fadeout
    easing: "easeOutExpo",
    loop: true, 
    delay: 2000 //Wait for next loop
  });