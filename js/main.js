'use strict';

const persp = 'perspective(500px)';
const pages = $('.section');

//fragment anime
const rotateZ_memories = [];
const fragArray = [];
const frags = document.querySelectorAll('.frag');

function arrangeFrag() {
    const frag_size_range = 120;
    const min_frag_size = 40;
    for(let i = 0; i < frags.length; i++) {
        let random = Math.floor(Math.random() * frag_size_range + min_frag_size);
        rotateZ_memories.push(random);
        fragArray.push(i + 1);
    }
    shuffleFrag(fragArray);
}

function shuffleFrag(fragArray) {
    for (let i = fragArray.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1));
        let tmp = fragArray[i];
        fragArray[i] = fragArray[r];
        fragArray[r] = tmp;
    }
}
//fragment anime




//opening-section
let opening;
pages.on('click', function () {
    if (opening) return;
    opening = true;
    let section_title = $('.section_title', this);

    if ($(this).hasClass('active')) {
        section_title.removeClass('title_effect')
        $(this).removeClass('active')
        $(this).stop().animate({scrollTop: 0}, 1000);
        setTimeout(() => {
            $(this).removeClass('z100');
            $('.dammy_height', this).removeClass('scrollable');
            $(this).getNiceScroll().resize();
            opening = false;
        }, 1000);

    } else {
        section_title.addClass('title_effect');
        $(this).addClass('active z100');
        $('.dammy_height', this).addClass('scrollable');
        $(this).niceScroll('.dammy_height', {
            scrollspeed: 50,
            mousescrollstep: 30,
            // autohidemode: 'hidden',
            touchbehavior: true,
        });
        $(this).getNiceScroll().resize();
        opening = false;
    }
})
//opening-section


//setting-section
function setSections() {
    pages.each(function(index) {
        setTimeout(() => {
            $(this).addClass('reveal');
        }, 1000 + 100 * index);
    })
}   
//setting-section



//set-opening 
function setOpening() {

}
//set-opening 










$(document).ready(function () {
    
    Splitting();
    setOpening();
    arrangeFrag();

})


//grid
const grid_row = 8;
const grid_column = 14;
const grid_num = grid_row * grid_column;
for (let i = 0; i < grid_num; i++) {
    const grid = document.getElementById('grid');
    const el = document.createElement('li');
    grid.appendChild(el);
}

setTimeout(() => {
    anime({
        targets: '.grid li',
        scale: [
          {value: 0, easing: 'easeOutSine', duration: 500},
        //   {value: 1, easing: 'easeInOutQuad', duration: 1200}
        ],
        delay: anime.stagger(200, {grid: [grid_column, grid_row], from: 'center'})
      });
    
}, 1000);

setTimeout(() => {
    $('#grid').remove();
}, 3000);
//grid



//jiguzagu



anime({
    targets: '#eyecatch .jiguzagu',
    strokeDashoffset: [anime.setDashoffset, -2600],
    easing: 'easeInOutSine',
    duration: 2000,
    loop: true,
    delay: function(el, i, l) {
        return i * 100;
    },
    endDelay: function(el, i, l) {
    return i * 100;
    },
    keyframes: [
        {opacity: 1},{opacity: 1},{opacity: 1},{opacity: 1},{opacity: 1},
        {opacity: 1},{opacity: 1},{opacity: 1},{opacity: 1},{opacity: 0},
    ],
});



var polys = document.querySelectorAll('polygon,polyline');
[].forEach.call(polys,convertPolyToPath);

function convertPolyToPath(poly){
  var svgNS = poly.ownerSVGElement.namespaceURI;
  var path = document.createElementNS(svgNS,'path');
  var pathdata = 'M '+poly.getAttribute('points');
  if (poly.tagName=='polygon') pathdata+='z';
  path.setAttribute('d',pathdata);
  poly.parentNode.replaceChild(path,poly);
}





//jiguzagu

//screen-change
let currentScreenIsTop = true;
$('#main_container #eyecatch').on('click', function() {
    $('#main_container .screen').toggleClass('screen_hidden');
    setSections();
    setTimeout(() => {
        $(this).remove();
    }, 1000);
})
//screen-change





pages.on('scroll', function () {

    let scroll = $(this).scrollTop();
    let pageIndex = $(this).index();
    
    if(scroll > 9000) {
        $(this).click();
        setTimeout(() => {
            $(this).click();
            
        }, 5000);

    }



    //concept
    if (pageIndex === 0) {
        const frag_fire_point = 5000;
        let frag_scroll = scroll - frag_fire_point;
        let frag_value = frag_scroll < 0 ? 0 : frag_scroll / 20;
        const canvas2 = $('.canvas2');


        if (frag_scroll < 0) {
            $('.concept .frag_wrapper').css({
                'bottom': scroll / 60,
                'transform': `rotateX(${-50 + scroll / 150}deg) rotateY(${-50 + scroll / 80}deg)`,
            });
            canvas2.removeClass('hide');
        } else {
            canvas2.addClass('hide');
        }

        for (let i = 1; i < frags.length + 1; i++) {
            let rotateZ_memory = rotateZ_memories[i - 1];
            let index = fragArray[i - 1];
            let frag_memory = frag_value * rotateZ_memory / (i * 2);
            let color_prop = frag_value == 0 ? 'transparent' : `rgba(${255 - frag_memory / 3}, ${255 - frag_memory / 3}, 255, .6)`;
            if (i % 2 === 0) $(`.concept .frag_wrapper .frag${index}`).css({
                'transform': `${persp} 
                          translate(-${frag_memory}%, ${frag_memory}%)  
                          rotateX(-${frag_memory}deg) rotateY(-${frag_memory}deg)`,
                'border-bottom-color': color_prop

            });
            else $(`.concept .frag_wrapper .frag${index}`).css({
                'transform': `${persp} 
                          translate(${frag_memory}%, ${frag_memory}%) 
                          rotateX(${frag_memory}deg) rotateY(${frag_memory}deg)`,
                'border-bottom-color': color_prop
            });
        }
    }
    //concept  





})



