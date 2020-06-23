$(document).ready(function(){
  // MOBILE NAV!
  $('#mobileNav').on('click', () => {
    $('ul.nav__list').addClass('nav__list-mobile').toggleClass('show');
  })

  $('.testimonial-carousel').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });

  // $("button").click(function(){
  //   $("form").slideToggle();
  // });

  // $("#loreal").hover(function() {
  //   $("#loreal_partnerName").slideToggle();
  // });

  //   $("#baie").hover(function() {
  //   $("#baie_partnerName").slideToggle();
  // });

  //   $("#lyft").hover(function() {
  //   $("#lyft_partnerName").slideToggle();
  // });

  // $(".button").click(function(){
  //   $(".volunteers-form").slideToggle();
  // });

      // $(window).scroll(function(){                          
      //       if ($(this).scrollTop() > 190) {
      //           $("nav").show();

      //       } else {
      //         ("nav").hide();
      //       }
      //   });

  // $(window).scroll(function(){                          
  //           if ($(this).scrollTop() > 660) {
  //               $(".item_paragraph").fadeIn();

  //           } else {
  //             (".item_paragraph").hidden();
  //           }
  //       });

//   const typed = new Typed('.typed', {
//     strings: 
//     [
//     "Venture Kids",
//     ],
//     typeSpeed: 50,
//     backSpeed: 30,
//     loop: true,
//     showCursor: true,
//     loopCount: 1,
// });
const instance = new TypeIt(".typed", {
  // strings: "VentureKids Canada",
  speed: 75,
  loop: false,
  afterComplete: () => {
    console.log('done?');
    instance.freeze();
  }
}).go();

// const isDone = instance.is('completed');
// if (isDone) {
//   console.log('done');
//   instance.freeze();
// }


    $(window).scroll(function(){                          
            if ($(this).scrollTop() > 660) {
                $(".box_paragraph").fadeIn();

            } else {
              (".boxparagraph").hidden();
            }
        });

    // $(window).scroll(function(){                          
    //         if ($(this).scrollTop() > 640) {
    //             $("..menu__link svg").fadeIn();

    //         } else {
    //           ("..menu__link svg").hidden();
    //         }
    //     });

    // $(window).scroll(function(){                          
    //         if ($(this).scrollTop() > 600) {
    //             $(".hl1").transition({scaleY(1);})
    //         } else {
    //           (".hl1").hidden();
    //         }
    //     });




});