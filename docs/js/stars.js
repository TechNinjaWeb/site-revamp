// $.fn.extend({
//   tnAnimate: {
//     animate: function() {
//       console.log("Starting Animation on", this.element);
//       return this;
//     }
//   }
// })


// // Size is 4400 x 2933
// $(document).ready(function($) {

//     console.log('Ready', $('#slide').tnAnimate.animate())
//     var animate = $('#slide');
//         animate.css('background-repeat', 'repeat')

//     function loopbackground() {
//         animate.css('background-position', '0px 0px');
//         $({ position_x: -5000, position_y: -2933 }).animate({ position_x: 4400, position_y: 2933 }, {
//             duration: 120000,
//             easing: 'linear',
//             step: function() {
//                 animate.css('background-position', this.position_x /5 + 'px ' + this.position_y/5 + 'px');
//             },
//             complete: function() {
//                 loopbackground();
//                 // setTimeout(function(){
//                 //     loopbackground();
//                 //     console.log("waiting 1 second");
//                 // }, 1000)
//             }
//         });
//     }
//     loopbackground();


// });