'use strict';

// var polys = document.querySelectorAll('polygon,polyline');
// [].forEach.call(polys,convertPolyToPath);

// function convertPolyToPath(poly){
//   var svgNS = poly.ownerSVGElement.namespaceURI;
//   var path = document.createElementNS(svgNS,'path');
//   var pathdata = 'M '+poly.getAttribute('points');
//   if (poly.tagName=='polygon') pathdata+='z';
//   path.setAttribute('d',pathdata);
//   poly.parentNode.replaceChild(path,poly);
// }
let windowHeight;
let windowWidth;
let is_sp;
let is_tab;

$(document).ready(function () {
    setDeviceScale();
    const hueArray = getHue();
    const pages = $('.section');
    setHue(hueArray);
    if(is_sp) setHeight(pages);
    Splitting();
    const hexagon_box = $('#eyecatch .hexagon_box');
    setEyecatch(hexagon_box);
    mouseStalk();
    screenChange(hexagon_box, pages);
    openSection(pages);
    stopOpen();
    preventLink();

})

function setDeviceScale() {
    windowHeight = $(window).height();
    windowWidth = $(window).width();
    is_sp = windowWidth < 896;
    is_tab = windowWidth >= 768 && is_sp;
}

function setHeight(pages) {
    setDeviceScale();
    var section_height = windowHeight / 4;
    pages.width(section_height); 
    
    $(window).resize(function(){
        setDeviceScale();
        var section_height = windowHeight / 4;
        pages.width(section_height);  
    })
}

function stopOpen() {
    const el = $('.stop');
    el.on('click', function(event) {
        event.stopPropagation();
    })
}

function preventLink() {
    const el = $('.prevent');
    el.on('click', function(event) {
        event.preventDefault();
    })
}

function openSection(pages) {
    let opening;

    pages.on('click', function () {
        
        if (opening) return;
        opening = true;

        const others = pages.not(this).children();
        const clicked_page = $(this);
        const back_to_menu = $('.back_to_menu');
        const title_effect = $('.section_title.title_effect', this);
        let pageIndex = clicked_page.index();        

        if (clicked_page.hasClass('active')) {

            closeSection(pages, pageIndex, clicked_page, back_to_menu, others, title_effect);

        } else {    
            $(document).off("click", others);
            others.addClass('hide');
            openAnime(pageIndex, title_effect);
            
            setTimeout(() => {

                clicked_page.addClass('active z100 w-100-important');
                setScroll(clicked_page, 1);

                if(pageIndex === 1) setImgBox(clicked_page, 1);
                else if(pageIndex === 2) setWorkBox(clicked_page, 1);
                else if(pageIndex === 3) setContactIcon(clicked_page, 1);
                
            }, 1000);
            
            backToMenuClick(pages, pageIndex, clicked_page, back_to_menu, others, title_effect);
            animeOnScroll(pageIndex, clicked_page, back_to_menu);
        }
        setTimeout(() => { opening = false; }, 1000); 
    })
}

function closeSection(pages, pageIndex, clicked_page, back_to_menu, others, title_effect) {
    setScroll(clicked_page, 0);
    title_effect.animate({left: '0'});    
    setTimeout(() => {title_effect.attr('style', '--word-total:1; --char-total:7');}, 1000); 
    if(pageIndex === 0) resetCharClass(clicked_page);
    else if(pageIndex === 1) setImgBox(clicked_page, 0);
    else if(pageIndex === 2) setWorkBox(clicked_page, 0);
    else if(pageIndex === 3) setContactIcon(clicked_page, 0);

    back_to_menu.removeClass('z100 back_to_menu_active');
    clicked_page.removeClass('active w-100-important w-90-important');
    if(is_sp) setHeight(pages);

    setTimeout(() => {
        closeAnime(pageIndex);

        clicked_page.removeClass('z100');
        
        others.removeClass('hide');

    }, 1000);
}

function backToMenuClick(pages, pageIndex, clicked_page, back_to_menu, others, title_effect) {
    back_to_menu.on('click', function(e) {
        closeSection(pages, pageIndex, clicked_page, back_to_menu, others, title_effect);
    })
}

function resetCharClass(clicked_page) {
    const content_inner = clicked_page.find('.content_inner');
    const chars = content_inner.find('.char');
    chars.removeClass('show');
    content_inner.find('.txt-sm').addClass('txt-transparent');
}

function setContactIcon(clicked_page, isEnter) {
    const icons = clicked_page.find('.content_inner .icon');
    if(isEnter) {
        setTimeout(() => {
            icons.addClass('tran-04 delay_none');
        }, 1000); 
    } 
    else {
        icons.removeClass('tran-04 delay_none');  
    }
    
}

function animeFromRect() {
    anime({
        targets: '.section_num .rect polygon',
        points: "34.2,48.4 30,50.6 25,51 12,51 6.6,50.4 3,48 1,45 0,39 0,12 0.8,7 3,3 7,0.6 12,0 26,0 31,0.8 34.6,3 36.6,7 37,12 37,39 36.4,44.8 ",
        easing: 'easeOutQuad',
        duration: 1000,
        loop: false
    });
}

function animeToRect() {
    anime({
        targets: '.section_num .rect polygon',
        points: "42,87.3 34.9,87.2 28.4,87.1 13.6,87 6.6,86.9 0,86.8 2.1,76.4 4.2,66.4 13.5,20.4 16,8.6 17.7,0 24.5,0.1 32.1,0.2 47.3,0.3 53.4,0.4 59.7,0.5 57.9,9.3 55.6,20.9 46.5,65.6 44.5,75.4 ",
        easing: 'easeOutQuad',
        duration: 1000,
        loop: false
    });
    anime({
        targets: '.section_num .rect polygon',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'linear',
        duration: 1000,
        delay: function (el, i, l) {
            return i * 200;
        },
        loop: true
    });
}

function animeFromTriangle() {
    anime({
        targets: '.section_num .work_triangle polygon',
        points: "36.8,39 36.8,12 35.8,6 33.8,3 30.2,0.6 24.8,0 11.8,0 6.8,0.4 2.8,2.5 0.4,6.1 0,12 0,39 0.2,44 2.2,48 5.8,50.2 10.8,51 24.8,51 29.8,50.4 33.8,48 36,44 ",
        easing: 'easeOutQuad',
        duration: 1000,
        loop: false
    });
}

function animeToTriangle() {
    anime({
        targets: '.section_num .work_triangle polygon',
        points: "53.7,31 47,27.1 40.5,23.4 32.7,18.9 26.5,15.3 20,11.6 12.9,7.4 6.8,3.9 0,0 0,11.6 0,17.5 0,44.5 0,50 0,62 6,58.6 10.9,55.7 18.3,51.4 26.4,46.8 34.1,42.3 43.5,36.9 ",
        easing: 'easeOutQuad',
        duration: 1000,
        loop: false
    });
}

function setWorkBox(clicked_page, isEnter) {
    const section_num = clicked_page.find('.section_num');
    const up_distance = is_sp ? windowHeight * 2 / 3 : windowHeight * 3 / 4 - 60;
    let workPosX;
    if(is_sp) workPosX = 12;
    else workPosX = 5;

    const content_tri = $('.works .section_num .content_tri');
    const work_img = $('.work_img');
    const work_img_after = $('.work_img_after');
    if(isEnter) {
        section_num.css('transform', `translate(${workPosX}%, -${up_distance}px)`);
        work_img.removeClass('dn').addClass('db');
        setTimeout(() => { work_img.addClass('show') }, 1000);
    } 
    else {
        section_num.removeAttr('style');
        if(is_sp) section_num.css('transform', `translateX(100%) rotateZ(-90deg)`);
        
        content_tri.attr('style', 'overflow:visible;enable-background:new 0 0 36.8 51;');
        work_img.removeClass('show');
        work_img_after.addClass('op0');
        setTimeout(() => {
            work_img.removeClass('db').addClass('dn');
            work_img_after.addClass('dn');
        }, 1000);
    }

    const work_triangle = $('.works .section_num .work_triangle');
    const li = $('.works .content_inner li');
    work_triangle.hover(function() {        
        let index = $(this).index();
        li.eq(index).find('h3').addClass('show');
    }, function() {
        let index = $(this).index();
        li.eq(index).find('h3').removeClass('show');
    })
}

function setSections(pages) {
    if(is_sp) {
        pages.each(function (index) {
            setTimeout(() => {
                $(this).addClass('reveal');
            }, 1000 + 100 * index);
        })
    } else {
        setTimeout(() => { pages.addClass('reveal');}, 1000);
    }
}

function getHue() {
    const hues = [
        ['89, 57, 233', '22, 3, 109', '6, 1, 31', '9, 2, 48'],
        ['57, 233, 166', '3, 109, 74', '1, 31, 20', '2, 48, 33'],
        ['233, 57, 180', '109, 3, 95', '31, 1, 26', '48, 2, 40'],
    ];
    const hue = hues[Math.floor(Math.random() * 3)];
    return hue;
}

function setHue(hueArray) {
    const root = $(':root');
    root.css('--main', `rgb(${hueArray[0]})`);
    root.css('--main-dark', `rgb(${hueArray[1]})`);
    root.css('--main-black', `rgb(${hueArray[2]})`);
    root.css('--main-black-grad', `rgb(${hueArray[3]})`);
}

function setScroll(clicked_page, isEnter) {
    const dammy = '.dammy_height';
    if(isEnter) {
        clicked_page.find(dammy).addClass('scrollable');
        clicked_page.niceScroll(dammy, {
            scrollspeed: 50,
            mousescrollstep: 10,
            touchbehavior: true,
            grabcursorenabled: false,
            autohidemode: 'cursor',
        });
    } else {
        clicked_page.find(dammy).removeClass('scrollable');
    }
    clicked_page.getNiceScroll().resize();
}

function setImgBox(clicked_page, isEnter) {
    const section_num = clicked_page.find('.section_num');
    const up_distance = is_sp ? windowHeight * 2 / 3 - 60 : windowHeight / 2;
    let imgPosX;
    if(is_tab) imgPosX = -5;
    else if(is_sp) imgPosX = 12;
    else imgPosX = -25;

    if(isEnter) {
        section_num.css('transform', `translate(${imgPosX}%, -${up_distance}px)`);
    } 
    else {
        section_num.removeAttr('style');
        if(is_sp) section_num.css('transform', `translateX(100%) rotateZ(-90deg)`);
    }
    
}

function setEyecatch(hexagon_box) {

    const jiguzagu_show = 1000;
    const jiguzagu_dur = 2000;
    const hexagon_circle_show = jiguzagu_show + jiguzagu_dur;
    const start_line_show = 9000;

    //jiguzagu
    anime({
        targets: '#eyecatch .jiguzagu',
        strokeDashoffset: [anime.setDashoffset, -2200],
        easing: 'easeInOutSine',
        duration: jiguzagu_dur,
        loop: true,
        delay: function (el, i, l) {
            return jiguzagu_show + i * 100;
        },
        endDelay: function (el, i, l) {
            return i * 100;
        },
        keyframes: [
            { opacity: 1 }, { opacity: 1 }, { opacity: 1 }, { opacity: 1 }, { opacity: 1 },
            { opacity: 1 }, { opacity: 1 }, { opacity: 1 }, { opacity: 1 }, { opacity: 0 },
        ],
    });
    //jiguzagu

    //hexagon
    setTimeout(() => {
        hexagon_box.show();
        anime({
            targets: '#eyecatch .hexagon_box_top .hexagon',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'linear',
            duration: 5000,
            loop: true,
            direction: 'normal',
            delay: function (el, i, l) {
                return i * 600;
            },
            keyframes: [
                { opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 },
            ],
        });
        anime({
            targets: '#eyecatch .hexagon_box_bottom .hexagon',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'linear',
            duration: 5000,
            loop: true,
            direction: 'normal',
            delay: function (el, i, l) {
                return i * 600;
            },
            keyframes: [
                { opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 },
            ],
        });
    }, hexagon_circle_show);
    //hexagon

    //circle
    anime({
        targets: '#eyecatch .circle',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 500,
        loop: false,
        delay: function (el, i, l) {
            return hexagon_circle_show + i * 200;
        },
    });
    //circle

    //start
    anime({
        targets: '#eyecatch .start_box .start_line',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 300,
        loop: false,
        direction: 'normal',
        delay: start_line_show,
    });
    //start
}

function closeAnime(index) {

    if(index === 0) animeFromGear();
    if(index === 1) animeFromHex();
    if(index === 2) animeFromTriangle();
    if(index === 3) animeFromRect();
   
    anime({
        targets: '.section_num .active_none',
        keyframes: [
            { opacity: 0 }, { opacity: 1 },
        ],
        easing: 'linear',
        duration: 500,
        loop: false
    });
}

function openAnime(index, title_effect) {
    setTimeout(() => {
        title_effect.animate({right: '0'}); 
        if(index === 0) animeToGear();
        if(index === 1) animeToHex();
        if(index === 2) animeToTriangle();
        if(index === 3) animeToRect();
    }, 1000);
 
    anime({
        targets: '.section_num .active_none',
        keyframes: [
            { opacity: 1 }, { opacity: 0 },
        ],
        easing: 'linear',
        duration: 500,
        loop: false
    });
}

function animeFromGear() {
    anime({
        targets: '.section_num .small_gear polygon',
        points: "34.2,48.5 36,46 37,42 37,33 37,25 37,16 37,9 36,5 34.5,3 32,1 28,0 23,0 18,0 13,0 9,0 6,0.7 3,2.4 1,5 0,9 0,16 0,23 0,32 0,42 0.5,45 2.4,48.2 5,50 9,51 14,51 18,51 24,51 28,51 31.2,50.5 ",
        easing: 'easeOutQuad',
        duration: 600,
        loop: false
    });
    anime({
        targets: '.section_num .big_gear polygon',
        points: "37,25 37,20 37,15 37,9 36.8,6.8 36,5 34.3,2.5 32.5,1.1 30,0.3 28,0 24,0 21,0 18,0 15,0 11,0 8,0 5.6,0.7 3.8,1.8 2.2,3.2 1,5 0.2,7 0,9 0,16 0,21 0,25 0,30 0,36 0,42 0.3,44 1,46 2.6,48.2 4.2,49.6 6,50.5 9,51 13,51 16,51 19,51 22,51 25,51 28,51 30.5,50.6 33,49.6 34.8,48 35.8,46.6 36.6,44.6 37,42 37,35 37,29 ",
        easing: 'easeOutQuad',
        duration: 600,
        loop: false
    });
}

function animeToGear() {
    anime({
        targets: '.section_num .small_gear polygon',
        points: "33.12,28.33 35.15,24.15 31.14,20.18 31.16,17.4 35.53,14.71 34.05,10.28 28.85,10.35 26.72,8.13 27.86,2.89 23.67,0.86 20.07,4.98 17.29,4.96 13.97,0 9.92,1.6 9.88,7.16 8.13,9.03 2.52,7.78 0.5,11.97 4.61,15.57 4.12,18.61 0,21.78 1.12,26.09 6.79,25.77 8.56,27.88 7.42,33.12 11.97,35.25 15.46,31.5 18.24,31.52 21.3,36.01 25.72,34.52 25.29,29.22 27.51,27.08 ",
        easing: 'easeOutQuad',
        duration: 600,
        loop: false
    });
    anime({
        targets: '.section_num .big_gear polygon',
        points: "50.43,25.22 55.02,22.54 54.25,18.72 48.52,18.72 45.85,14.14 48.91,9.17 45.85,6.11 41.26,9.17 37.06,6.88 36.68,0.76 33.24,0 30.18,4.97 25.6,4.97 22.54,0 18.72,0.76 18.72,6.5 14.52,9.17 8.79,5.73 6.11,8.79 9.17,13.75 6.88,17.96 1.15,17.96 0,21.78 4.97,24.83 4.97,29.8 0,32.48 0.76,36.3 6.5,36.3 9.17,40.5 6.5,45.47 9.17,48.14 13.75,45.47 17.96,48.14 17.96,54.25 21.78,55.02 24.83,49.67 29.8,49.67 32.48,55.02 36.3,54.25 36.3,48.52 40.5,45.85 45.47,49.29 48.52,46.23 45.85,40.88 48.14,36.68 53.87,37.06 55.02,33.24 50.05,30.18 ",
        easing: 'easeOutQuad',
        duration: 600,
        loop: false
    });
}

function animeFromHex() {
    anime({
        targets: '.section_num .myimg_box_bg polygon',
        points: "12,51 6.6,50.4 3,48 1,45 0,39 0,12 0.8,7 3,3 7,0.6 12,0 26,0 31,0.8 34.6,3 36.6,7 37,12 37,40 36.4,45 34.2,48.4 30,50.6 25,51 ",
        easing: 'easeOutQuad',
        duration: 600,
        loop: false
    });
    anime({
        targets: '.section_num .myimg_box .myimg_base',
        points: "12,51 6.6,50.4 3,48 1,45 0,39 0,12 0.8,7 3,3 7,0.6 12,0 26,0 31,0.8 34.6,3 36.6,7 37,12 37,40 36.4,45 34.2,48.4 30,50.6 25,51 ",
        easing: 'easeOutQuad',
        duration: 600,
        loop: false
    });
}

function animeToHex() {
    anime({
        targets: '.section_num .myimg_box_bg polygon',
        points: "25.19,58.05 18.67,54.32 12.81,50.97 6.39,47.29 0,43.64 0.11,14.61 5.06,11.75 9.48,9.2 14.62,6.23 19.87,3.2 25.42,0 32.16,3.86 38.07,7.24 43.97,10.61 50.61,14.42 50.5,43.44 45.29,46.45 40.1,49.44 35.22,52.23 30.02,55.21 ",
        easing: 'easeOutQuad',
        duration: 600,
        loop: false
    });
    anime({
        targets: '.section_num .myimg_box .myimg_base',
        points: "25.19,58.05 18.67,54.32 12.81,50.97 6.39,47.29 0,43.64 0.11,14.61 5.06,11.75 9.48,9.2 14.62,6.23 19.87,3.2 25.42,0 32.16,3.86 38.07,7.24 43.97,10.61 50.61,14.42 50.5,43.44 45.29,46.45 40.1,49.44 35.22,52.23 30.02,55.21 ",
        easing: 'easeOutQuad',
        duration: 600,
        loop: false
    });
}

function screenChange(hexagon_box, pages) {
    const click_to_start = $('#main_container #eyecatch .click_to_start');
    click_to_start.on('click', function () {
        const circle_hide_time = 500;
        const circle_box = $('#main_container #eyecatch .circle_box');
        const screen_change_hide = $('#main_container #eyecatch .screen_change_hide');
        anime({
            targets: '#eyecatch .circle',
            strokeDashoffset: [0, anime.setDashoffset],
            easing: 'easeInOutSine',
            duration: circle_hide_time,
            direction: 'normal',
            loop: false,
        });
        setTimeout(() => { circle_box.hide(); }, circle_hide_time);
        screen_change_hide.addClass('hide');
        hexagon_box.addClass('hide');
        $('#main_container .screen_hidden').removeClass('screen_hidden');
        setSections(pages);
        setTimeout(() => {
            $('#main_container #eyecatch').remove();
        }, 2000);
    })
}

function animeOnScroll(pageIndex, clicked_page, back_to_menu) {

    clicked_page.on('scroll', function () {

        let scroll = clicked_page.scrollTop();
        const scrollGap = is_sp && !is_tab ? 500 : 1000;
        const pageHeight = clicked_page.find('.dammy_height').height() - scrollGap;

        if(pageHeight > 0) {
            if(pageHeight < scroll) {
                clicked_page.addClass('w-90-important').removeClass('w-100-important');
                back_to_menu.addClass('z100 back_to_menu_active');
            } else {
                clicked_page.removeClass('w-90-important').addClass('w-100-important');
                back_to_menu.removeClass('z100 back_to_menu_active');
            }
        }
        
        anime.set('.leftline_brightness', { values: scroll / 5000, });
        
        if (pageIndex === 0) {
            const small_gear = $('.concept .section_num .small_gear');
            const big_gear = $('.concept .section_num .big_gear');
            small_gear.css('transform', `translate(${scroll / 700}%, -${scroll / 500}%) rotate(${scroll  / 6.46}deg)`);
            big_gear.css('transform', `rotate(-${scroll / 10}deg)`);
            const concept_chars = document.querySelectorAll('.char_flash');
            let point = Math.floor(scroll / 100) - 1;
            concept_chars.forEach(concept_char => {
                const total_max = concept_char.style.getPropertyValue("--char-total");
                if(point >= total_max || point < 0) return;
                else {
                const chars = concept_char.getElementsByClassName('char');
                chars[point].classList.add('show'); 
                }
            })
            if(point > 20) $('.txt-transparent').removeClass('txt-transparent');
        }

        if (pageIndex === 1) {
            const boxes = $('.txt_box');
            const scrollPerSlide = 2500;
            let slideRenge = Math.floor(scroll / scrollPerSlide);
            let value = Math.floor((scroll / 10) % 250);
            
            for(let i = 0; i < boxes.length; i++) {
                if (slideRenge === i) slidePage(slideRenge);
            }

            function slidePage(slideRenge) {
                let boxi = $(`.txt_box${slideRenge + 1}`); 
                $(`.txt_box:not(:eq(${slideRenge}))`).css('width', 0);    
                if (value <= 100) boxi.css('width', `${value}%`);
                if (slideRenge !== 2) {
                    if (value > 100 && value <= 200) boxi.css('width', `${200 - value}%`);
                    if (value > 200 && value <= 250) boxi.css('width', 0); 
                }
            }
        }

        if(pageIndex === 2) {
            const content_tris = $('.works .section_num');
            const content_tri = $('.works .section_num .content_tri');
            const scrollPerTri = 1500;
            const deciScrollPerTri = scrollPerTri / 10;
            let opacityProp = scrollPerTri * 10 / 7;
            let renge = Math.floor(scroll / scrollPerTri);
            let value = scroll % scrollPerTri; 
            let tran_value;
            let rot_value = value * 18 / 150;
            let workPosX;
            if(is_sp) workPosX = 12;
            else workPosX = 5;

            switch (renge) {
                case 0:
                    tran_value = value * 5.2 / deciScrollPerTri;
                    activeHover(renge);
                    content_tri.eq(renge).css({
                        'transform': `translateY(${95 + tran_value}%)  
                                        rotateX(${180 - rot_value}deg) rotateY(-${180 - rot_value}deg)`,
                        'opacity': `${value / opacityProp}`
                    });
                    break;
                case 1:
                    tran_value = value * 9.5 / deciScrollPerTri;
                    const up_distance = is_sp ? windowHeight * 2 / 3 : windowHeight * 3 / 4 - 60;
                    content_tris.css('transform', `translate(${workPosX}%, -${up_distance}px)`)
                    showWorkImgAfter(renge);
                    activeHover(renge);
                    content_tri.eq(renge).css({
                        'transform': `translateY(${147 + tran_value}%)  
                                        rotateX(${rot_value}deg) rotateY(-${rot_value}deg)`,
                        'opacity': `${value / opacityProp}`
                    });
                    break;
                case 2:
                    tran_value = value * 5.2 / deciScrollPerTri;
                    const up_distance_scroll = is_sp ? windowHeight * 5 / 4 : windowHeight * 3 / 2;
                    content_tris.css('transform', `translate(${workPosX}%, -${up_distance_scroll}px)`)
                    showWorkImgAfter(renge);
                    activeHover(renge);
                    content_tri.eq(renge).css({
                        'transform': `translateY(${242 + tran_value}%)  
                                        rotateX(${180 - rot_value}deg) rotateY(-${180 - rot_value}deg)`,
                        'opacity': `${value / opacityProp}`
                    });
                    break;
                case 3:
                    tran_value = value * 9.5 / deciScrollPerTri;
                    showWorkImgAfter(renge);
                    activeHover(renge);
                    content_tri.eq(renge).css({
                        'transform': `translateY(${294 + tran_value}%)  
                                        rotateX(${rot_value}deg) rotateY(-${rot_value}deg)`,
                        'opacity': `${value / opacityProp}`
                    });
                    break;
                case 4:
                    showWorkImgAfter(renge);
                    activeHover(renge);
                    break;
            }        
            
            function showWorkImgAfter(renge) {
                content_tri.eq(renge - 1).find('.work_img_after').removeClass('dn op0');
                content_tri.eq(renge + 1).find('.work_img_after').addClass('prevent');
            }
            function activeHover(renge) {
                if(renge != 0) content_tri.eq(renge - 1).removeClass('hover_none');
                content_tri.eq(renge).addClass('hover_none');
            }
        }
    })
}

function mouseStalk() {
    const stalker = document.getElementById('stalker');
    document.addEventListener('mousemove', function (e) {
        stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)'; 
    });
    
    const link_els = document.querySelectorAll('.stalk_on');
    link_els.forEach(link_el => {
        link_el.addEventListener('mouseover', function (e) {
            stalker.classList.add('stalker_hover');
        });
        link_el.addEventListener('mouseout', function (e) {
            stalker.classList.remove('stalker_hover');
        });
    });

}
