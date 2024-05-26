// FIRST BUILD UP
$(document).ready(function(){

    gsap.to(".works-page-container", {
        "background": "radial-gradient(40% 20% at 50% 20%, rgba(44, 88, 241, 1) 0%, rgba(44, 88, 241, 0.00) 100%)",
        delay: 1
    });
});


gsap.set('.article-img img, .article-date .word, .article-title .word, .article-desc .word', {y: 10, autoAlpha:0})
gsap.set('.article-img .border', {"background": "linear-gradient(to bottom, #fff 0%, #000 0%, #000 100%, #5177FF 100%)", autoAlpha:0})


ScrollTrigger.batch('.each-article', {
    start: 'top bottom',
    onEnter: batch => {
      batch.forEach((card, index) => {

        let border = card.querySelectorAll('.article-img .border');
        let content = card.querySelectorAll('.article-img img, .article-date .word, .article-title .word, .article-desc .word, .article-img img');
        let chart_tl = gsap.timeline();

        chart_tl.to( content, 0.6, {
            y: 0,
            autoAlpha: 1,
            stagger: 0.03,
            delay: index * 0.2,
            marker: true,
            ease: Power3.easeOut
        }, .8 );
        chart_tl.to( border, 1.2, {
            "background": "linear-gradient(to bottom, #fff 0%, #000 50%, #000 50%, #5177FF 100%)",
            autoAlpha: 1,
            stagger: 0.03,
            delay: index * 0.2,
            ease: Power3.easeOut
        }, 1 );
  
      })
    },
    once: true
  });