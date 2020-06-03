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

    if ($(this).hasClass('active')) {
        $(this).removeClass('active')
        $(this).stop().animate({scrollTop: 0}, 1000);
        setTimeout(() => {
            $(this).removeClass('z100');
            $('.dammy_height', this).removeClass('scrollable');
            $(this).getNiceScroll().resize();
            opening = false;
        }, 1000);

    } else {
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

//set-hue
let hueNum;
function setHue() {
    const root = $(':root');
    const hue = [
        ['89, 57, 233', '22, 3, 109', '6, 1, 31'],
        ['57, 233, 166', '3, 109, 74', '1, 31, 20'],
        ['233, 57, 180', '109, 3, 95', '31, 1, 26'],
    ];
    hueNum = Math.floor(Math.random() * 3);
    
    root.css('--main', `rgb(${hue[hueNum][0]})`);
    root.css('--main-dark', `rgb(${hue[hueNum][1]})`);
    root.css('--main-black', `rgb(${hue[hueNum][2]})`);

}

//set-hue








$(document).ready(function () {
    setHue();
    Splitting();
    setOpening();
    arrangeFrag();

})



//jiguzagu

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


const jiguzagu_box = $('#main_container #eyecatch .jiguzagu_box');
anime({
    targets: '#eyecatch .jiguzagu',
    strokeDashoffset: [anime.setDashoffset, -2200],
    easing: 'easeInOutSine',
    duration: 2000,
    loop: true,
    delay: function(el, i, l) {
        return 1000 + i * 100;
    },
    endDelay: function(el, i, l) {
    return i * 100;
    },
    keyframes: [
        {opacity: 1},{opacity: 1},{opacity: 1},{opacity: 1},{opacity: 1},
        {opacity: 1},{opacity: 1},{opacity: 1},{opacity: 1},{opacity: 0},
    ],
});

//jiguzagu

//hexagon

setTimeout(() => {
    $('#eyecatch .hexagon_box').show();
    anime({
        targets: '#eyecatch .hexagon_box_top .hexagon',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'linear',
        duration: 5000,
        loop: true,
        direction: 'normal',
        delay: function(el, i, l) {
            return i * 600;
        },
        keyframes: [
            {opacity: 1},{opacity: 0},{opacity: 1},{opacity: 0},
        ],
    });
    anime({
        targets: '#eyecatch .hexagon_box_bottom .hexagon',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'linear',
        duration: 5000,
        loop: true,
        direction: 'normal',
        delay: function(el, i, l) {
            return i * 600;
        },
        keyframes: [
            {opacity: 1},{opacity: 0},{opacity: 1},{opacity: 0},
        ],
    });
    
}, 3000);



//hexagon


//circle
const circle_box = $('#main_container #eyecatch .circle_box');
anime({
    targets: '#eyecatch .circle',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 500,
    loop: false,
    delay: function(el, i, l) {
        return 3000 + i * 200;
    },
});

//circle

//title
const title_box = $('#main_container #eyecatch .title_box');

//title



//screen-change
let currentScreenIsTop = true;
const circle_hide_time = 500;
circle_box.on('click', function() {
    anime({
        targets: '#eyecatch .circle',
        strokeDashoffset: [0, anime.setDashoffset],
        easing: 'easeInOutSine',
        duration: circle_hide_time,
        direction: 'normal',
        loop: false,
    });
    setTimeout(() => {
        circle_box.hide();
    }, circle_hide_time);
    jiguzagu_box.addClass('hide');
    title_box.addClass('hide');
    $('#main_container .screen_hidden').removeClass('screen_hidden');
    setSections();
    setTimeout(() => {
        $('#main_container #eyecatch').remove();
    }, 2000);
})
//screen-change





pages.on('scroll', function () {

    let scroll = $(this).scrollTop();
    let pageIndex = $(this).index();
    
    if(scroll > 9000) $(this).click();



    //concept
    if (pageIndex === 0) {
        const frag_fire_point = 5000;
        let frag_scroll = scroll - frag_fire_point;
        let frag_value = frag_scroll < 0 ? 0 : frag_scroll / 20;
        const canvas2 = $('.canvas2');


        if (frag_scroll < 0) {
            $('.concept .frag_wrapper').css({
                'bottom': scroll / 60,
            });
            canvas2.removeClass('hide');
        } else {
            canvas2.addClass('hide');
        }

        for (let i = 1; i < frags.length + 1; i++) {
            let rotateZ_memory = rotateZ_memories[i - 1];
            let index = fragArray[i - 1];
            let frag_memory = frag_value * rotateZ_memory / (i * 2);
            let color_prop;
            if(frag_value == 0) color_prop = 'transparent';
            else {                
                switch (hueNum) {
                    case 1:
                        color_prop = `rgba(${57 / (frag_memory / 15)}, ${233 / (frag_memory / 15)}, ${166 / (frag_memory / 15)}, .6)`
                        break;
                    case 2:
                        color_prop = `rgba(${233 / (frag_memory / 15)}, ${57 / (frag_memory / 15)}, ${180 / (frag_memory / 15)}, .6)`
                        break;
                    default:
                        color_prop = `rgba(${89 / (frag_memory / 15)}, ${57 / (frag_memory / 15)}, ${233 / (frag_memory / 15)}, .6)`
                        break;
                }
            }

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



