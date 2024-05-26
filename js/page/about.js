// FIRST BUILD UP
/*
$(document).ready(function(){
    var abpic = $('.about-container spline-viewer');
    var abtitle = $('.about-title .word');
    var abdesc = $('.about-intro .word');
    var abbg = $('.about-container');

    TweenMax.from(abpic, 1, {y:100,scaleY:1.3,autoAlpha:0,ease:Power4.easeOut});
    TweenMax.staggerFrom(abtitle, 1, {y:10,autoAlpha:0,ease:Power4.easeOut,delay:.5},.02);
    TweenMax.staggerFrom(abdesc, 1, {y:10,autoAlpha:0,ease:Power4.easeOut,delay:1},.02);
});
*/

//VALUES ON ABOUT PAGE
gsap.set($(".value-title .char, .value-description .word"), {
    y: 60,
    opacity: 0
});

gsap.to($(".value-title .char, .value-description .word"), {
    immediateRender: false,
    y: 0,
    opacity: 1,
    stagger: 0.008,
    scrollTrigger: {
      trigger: ".values",
      start: "top bottom-=100px",
      end: "bottom top",
      toggleActions: "restart none none reverse"
    },
});


//DOWNLOAD CV BUTTON
gsap.set('.resume-container p .word', {y: 10, autoAlpha: 0})
gsap.set('.resume', {y: 10, autoAlpha: 0})

gsap.timeline({
    scrollTrigger:{
      trigger:'.resume-container',
      start: "top bottom-=100px",
      toggleActions: "restart none none reverse",
      ease: Power4.easeOut
    }
})

.staggerTo('.resume-container p .word', 0.5, {y: 0, autoAlpha:1},0.05)
.to('.resume', 1, {y: 0, autoAlpha:1, delay: .2})