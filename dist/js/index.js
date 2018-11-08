$(function() {
    // banner
    var swiper = new Swiper('.banner', {
      effect: 'coverflow',
      loop: true,
      autoplay: true,
      delay: 5000,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 45,
        stretch: 26,
        depth: 100,
        modifier: 1,
        slideShadows : false,
      }
    });





});
