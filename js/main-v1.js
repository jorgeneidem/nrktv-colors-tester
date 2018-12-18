var playPause = anime({
  targets: '#functionBasedPropParam-test .animate-me',
  translateY: [
    { value: 200 },
    { value: 0 }
  ],
  rotate: {
    value: '1turn',
    easing: 'easeInOutSine'
  },
  duration: function(target) {
    return target.getAttribute('data-duration');
  },
  delay: function(target, index){
    return index * 1000
  },
  elasticity: function(target, index, totalTargets) {
    return 150 + ((totalTargets - index) * 150);
  },
  loop: true,
  autoplay: false
});

document.querySelector('.playbutton').onclick = playPause.play;
document.querySelector('.pausebutton').onclick = playPause.pause;



/* anime({
  targets: 'div.box.red',
  translateY: [
    { value: 200, duration: 500 },
    { value: 0, duration: 800 }
  ],
  rotate: {
    value: '1turn',
    easing: 'easeInOutSine'
  },
  loop: false
});

anime({
  targets: 'div.box.blue',
  translateY: [
    { value: 200, duration: 500, delay: 1000 },
    { value: 0, duration: 800 }
  ],
  rotate: {
    value: '1turn',
    easing: 'easeInOutSine',
    delay: 1000
  },
  loop: false
});

anime({
  targets: 'div.box.green',
  translateY: [
    { value: 200, duration: 500, delay: 2000 },
    { value: 0, duration: 800 }
  ],
  rotate: {
    value: '1turn',
    easing: 'easeInOutSine',
    delay: 2000
  },
  loop: false
});

anime({
  targets: 'div.box.yellow',
  translateY: [
    { value: 200, duration: 500, delay: 3000 },
    { value: 0, duration: 800 }
  ],
  rotate: {
    value: '1turn',
    easing: 'easeInOutSine',
    delay: 3000
  },
  loop: false
}); */