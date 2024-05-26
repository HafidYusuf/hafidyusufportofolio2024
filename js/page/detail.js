// FIRST BUILD UP
$(document).ready(function(){
    var link = $('.client-link .char');
    var title = $('.title .word');
    var icon = $('.client-link svg');
    var detail = $('.detail-right p');

    TweenMax.staggerFrom(link, 1, {y:10,autoAlpha:0,ease:Power4.easeOut,delay:2},.02);
    TweenMax.from(icon, 1, {y:10,autoAlpha:0,ease:Power4.easeOut,delay:3});
    TweenMax.staggerFrom(title, 1, {y:10,autoAlpha:0,ease:Power4.easeOut,delay:3.5},.08);
    TweenMax.staggerFrom(detail, 1, {y:10,autoAlpha:0,ease:Power4.easeOut,delay:5},.08);
});


//ADD PARALLAX TO DETAIL CONTENT
gsap.utils.toArray(".parallax-window .parallax-content").forEach((section, i) => {
    const heightDiff = section.offsetHeight - section.parentElement.offsetHeight;

    gsap.fromTo(section,{y: -heightDiff}, {
        scrollTrigger: {
            trigger: section.parentElement,
            scrub: true
        },
        y: 100,
        ease: "none"
    });
});


//ADD A RADIAL BACKGROUND TO PARTICULAR SECTION IN DETAIL PAGE
gsap.to(".content-full", 2, {
    "background": "radial-gradient(50% 50% at 50% 50%, #2C58F1 0%, rgba(44, 88, 241, 0.00) 100%)",
    immediateRender: false,
    ease: Power4.easeOut,
    scrollTrigger: {
      trigger: ".content-full",
      start: "top center",
      endTrigger: ".content-full",
      end: "bottom centar",
      toggleActions: "restart reverse restart reverse"
    },
});