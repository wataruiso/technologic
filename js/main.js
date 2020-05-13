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










$(document).ready(function () {
    
    Splitting();
    setOpening();
    arrangeFrag();

})


//screen-change
let currentScreenIsTop = true;
$('.fix').on('click', function() {
    const screen = $('#main_container .screen');
    screen.toggleClass('screen_hidden');
    if(currentScreenIsTop) setSections();
    currentScreenIsTop = !currentScreenIsTop;
})
//screen-change




pages.on('scroll', function () {

    let scroll = $(this).scrollTop();
    let pageIndex = $(this).index();
    let section_title = $('.section_title', this);
    
    // console.log(scroll);
    // console.log($(window).height());
    
    if(scroll > 9000) {
        $(this).click();

        setTimeout(() => {
            $(this).click();
            // console.log(pageIndex);
            
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
            section_title.removeClass('title_color');
        } else {
            canvas2.addClass('hide');
            section_title.addClass('title_color');
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



