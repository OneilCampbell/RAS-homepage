(function( $ ) {
    $(function() {

    var $home_page = document.getElementById('home');
    
    if($home_page){

        var $job_title = document.getElementById('job-title');
        var $job_location = document.getElementById('job-location');
        var $lowest_salary = document.getElementById('lowest-salary');
        var $average_salary = document.getElementById('average-salary');
        var $highest_salary = document.getElementById('highest-salary');
        var $poc_salary = document.getElementById('poc-salary');

        var salary_info = [
            {
                title: "Senior Excutives",
                city: "San Francisco",
                highest_salary: "$150,000",
                lowest_salary: "$85,300",
                average_salary: "$115,700",
                poc_salary: "$70,000"
            },
            {
                title: "Junior Art Directors",
                city: "New York",
                highest_salary: "$134,700",
                lowest_salary: "$18,700",
                average_salary: "$59,700",
                poc_salary: "$20,000"
            },
            {
                title: "Account Managers",
                city: "Omaha",
                highest_salary: "$72,000",
                lowest_salary: "$34,000",
                average_salary: "$55,000",
                poc_salary: "$40,000"
            },
            {
                title: "Associate Art Buyers",
                city: "Illinois",
                highest_salary: "$62,000",
                lowest_salary: "$42,900",
                average_salary: "$20,700",
                poc_salary: "$30,000"
            }
        ]

        var active_slider_index = 1;

        function populate_salary_info(salary_info_index){
            // console.log(salary_info_index)
            var salary_information = salary_info[salary_info_index];
            $job_title.innerText = salary_information.title;
            $job_location.innerText = salary_information.city;
            $lowest_salary.innerText = salary_information.lowest_salary;
            $average_salary.innerText = salary_information.average_salary;
            $highest_salary.innerText = salary_information.highest_salary;
            $poc_salary.innerText = salary_information.poc_salary;

            var prev_active_slider = document.getElementById(`salary-slider-${active_slider_index}`);
            prev_active_slider.classList.remove('salaries-slideshow-slider-active');

            var new_active_slider = document.getElementById(`salary-slider-${salary_info_index}`);
            new_active_slider.classList.add('salaries-slideshow-slider-active')
            active_slider_index = salary_info_index;
        }

        var $salary_slider_0 = document.getElementById('salary-slider-0');
        $salary_slider_0.addEventListener('click', function (){
            clearInterval(salary_slideshow_cycle);
            populate_salary_info(0);
        })

        var $salary_slider_1 = document.getElementById('salary-slider-1');
        $salary_slider_1.addEventListener('click', function (){
            clearInterval(salary_slideshow_cycle);
            populate_salary_info(1);
        })

        var $salary_slider_2 = document.getElementById('salary-slider-2');
        $salary_slider_2.addEventListener('click', function (){
            clearInterval(salary_slideshow_cycle);
            populate_salary_info(2);
        })

        var $salary_slider_3 = document.getElementById('salary-slider-3');
        $salary_slider_3.addEventListener('click', function (){
            clearInterval(salary_slideshow_cycle);
            populate_salary_info(3);
        })

        var salary_slideshow_cycle_index = 1;
        var salary_slideshow_cycle = setInterval(function(){
            if(salary_slideshow_cycle_index > 3) {
                salary_slideshow_cycle_index = 0;
            }
            populate_salary_info(salary_slideshow_cycle_index);
            salary_slideshow_cycle_index++;
        }, 3000)

        /* 
        -------------------------------------------------------------
        -------------------------------------------------------------
        -------------------------------------------------------------
        -------------------------------------------------------------
        -------------------------------------------------------------
        -------------------------------------------------------------
        -------------------------------------------------------------
        -------------------------------------------------------------
        -------------------------------------------------------------
        -------------------------------------------------------------
        */

        var $social_media_handle = document.getElementById('social-media-message-handle');
        var $social_media_message = document.getElementById('social-media-message');
        var $social_media_date = document.getElementById('social-media-message-date');

        var social_media_info = [
            {
                handle: "@RASingStar",
                message: "Feel underpaid? Want to see what your peers are making? Then we have just the thing for you. Check out the real agency salaries spreadsheet and wonder no more.",
                date: "1 February 2020"
            },
            {
                handle: "@5tephenBrooks",
                message: "An anonymous document created by @cashmeretote provides a snapshot of what salaries in ad agencies look like around the world. See what your peers are making & know your worth.",
                date: "11 January 2020"
            },
            {
                handle: "@ColeWorldNoBlanket",
                message: "Times are rough out here in these streets, so make sure that you're making enough to lay on some comfy sheets. Use the RAS spreadsheet to gain some insight as to your true worth",
                date: "28 January 2020"
            },
            {
                handle: "@thatSalaryGuy",
                message: "*Testimonial Time!*   I used the information on the real agency salaries' spreadsheet to negotiate my latest raise. Ended up getting paid 15% more PLUS a bonus.",
                date: "14 March 2020"
            }
        ]

        active_message_index = 1;

        function change_social_media_display(message_index){
            var social_media_message = social_media_info[message_index];
            $social_media_handle.innerText = social_media_message.handle;
            $social_media_message.innerText = social_media_message.message;
            $social_media_date.innerText = social_media_message.date;

            var active_message = document.getElementById(`social-media-slider-${active_message_index}`);
            active_message.classList.remove('social-media-slider-active');

            var new_message = document.getElementById(`social-media-slider-${message_index}`);
            new_message.classList.add('social-media-slider-active');
            active_message_index = message_index;
        }

        var $social_media_slider_0 = document.getElementById('social-media-slider-0');
        $social_media_slider_0.addEventListener('click', function(){
            clearInterval(social_media_cycle);
            change_social_media_display(0);
        })

        var $social_media_slider_1 = document.getElementById('social-media-slider-1');
        $social_media_slider_1.addEventListener('click', function(){
            clearInterval(social_media_cycle);
            change_social_media_display(1);
        })

        var $social_media_slider_2 = document.getElementById('social-media-slider-2');
        $social_media_slider_2.addEventListener('click', function(){
            clearInterval(social_media_cycle);
            change_social_media_display(2);
        })

        var $social_media_slider_3 = document.getElementById('social-media-slider-3');
        $social_media_slider_3.addEventListener('click', function(){
            clearInterval(social_media_cycle);
            change_social_media_display(3);
        })

        var social_media_cycle_index = 1;
        var social_media_cycle = setInterval(function(){
            if(social_media_cycle_index > 3) {
                social_media_cycle_index = 0;
            }
            change_social_media_display(social_media_cycle_index);
            social_media_cycle_index++;
        }, 3000)

        /* 
        -------------------------------------------------------------
        -------------------------------------------------------------
        -------------------------------------------------------------
        -------------------------------------------------------------
        -------------------------------------------------------------
        -------------------------------------------------------------
        -------------------------------------------------------------
        -------------------------------------------------------------
        -------------------------------------------------------------
        -------------------------------------------------------------
        */


        var progress_icon = document.querySelector('.progress-icon');

        // landing page scroll height
        var ln_p_sh = window.pageYOffset + document.querySelector('.landing-page').getBoundingClientRect().top;
        // bars page scroll height
        var br_p_sh = window.pageYOffset + document.querySelector('.bars-page').getBoundingClientRect().top;
        // salaries page scroll height
        var sl_p_sh = window.pageYOffset + document.querySelector('.salaries-page').getBoundingClientRect().top;
        // blog page scroll height
        var bl_p_sh = window.pageYOffset + document.querySelector('.blog-page').getBoundingClientRect().top;
        // social media page scroll height
        var sm_p_sh = window.pageYOffset + document.querySelector('.social-media-page').getBoundingClientRect().top;

        // console.log(ln_p_sh, br_p_sh, sl_p_sh, bl_p_sh, sm_p_sh);


        var isScrolling;
        var navHeight = 123;

        var prevScrollTop = 0;
        var deltaScroll = 5;

        $(window).scroll(function(event){
            isScrolling = true;
        });

        setInterval(function() {
            if (isScrolling) {
                checkProgress();
                justScrolled();
                isScrolling = false;
            }
        }, 250);

        function checkProgress() {
            var currScrollTop = $(this).scrollTop();
            // console.log(currScrollTop);
            var page;
            if(currScrollTop < br_p_sh - 250){
                $('header')[0].style.background = '#FD6757';
                $('.hamburger-icon-hl')[0].style.borderColor = 'white';
                $('.hamburger-icon-hl')[1].style.borderColor = 'white';
                $('.hamburger-icon-hl')[2].style.borderColor = 'white';
                $('.hamburger-icon-container')[0].style.borderColor = 'black';
                page = 1;
            }else if(currScrollTop < sl_p_sh - 358){
                $('header')[0].style.background = 'white';
                $('.hamburger-icon-hl')[0].style.borderColor = 'black';
                $('.hamburger-icon-hl')[1].style.borderColor = 'black';
                $('.hamburger-icon-hl')[2].style.borderColor = 'black';
                $('.hamburger-icon-container')[0].style.borderColor = '#FD6757';
                page = 2;
            }else if(currScrollTop < bl_p_sh - 358){
                $('header')[0].style.background = 'white';
                $('.hamburger-icon-hl')[0].style.borderColor = 'black';
                $('.hamburger-icon-hl')[1].style.borderColor = 'black';
                $('.hamburger-icon-hl')[2].style.borderColor = 'black';
                $('.hamburger-icon-container')[0].style.borderColor = '#FD6757';
                page = 3;
            }else if(currScrollTop < sm_p_sh - 358){
                $('header')[0].style.background = 'white';
                $('.hamburger-icon-hl')[0].style.borderColor = 'black';
                $('.hamburger-icon-hl')[1].style.borderColor = 'black';
                $('.hamburger-icon-hl')[2].style.borderColor = 'black';
                $('.hamburger-icon-container')[0].style.borderColor = '#FD6757';
                page = 4;
            }else{
                $('header')[0].style.background = 'white';
                $('.hamburger-icon-hl')[0].style.borderColor = 'black';
                $('.hamburger-icon-hl')[1].style.borderColor = 'black';
                $('.hamburger-icon-hl')[2].style.borderColor = 'black';
                $('.hamburger-icon-container')[0].style.borderColor = '#FD6757';
                page = 5;
            }
            
            progress_icon.src = `./Assets/Images/Progress_Icon/progress-icon-${page}.png`;
        }

        function justScrolled() {
            var currScrollTop = $(this).scrollTop();
            
            // Make sure they scroll more than delta
            if(Math.abs(prevScrollTop - currScrollTop) <= deltaScroll){
                return;
            }
            // Check to see if user scrolled down past navbar height at the top of the page
            if (currScrollTop > prevScrollTop && currScrollTop > navHeight){
                // if so and user is scrolling down, hide nav
                $('header').addClass('header-retract');
            } else {
                // if so and user is scrolling up, show nav
                if(currScrollTop + $(window).height() < $(document).height()) {
                    $('header').removeClass('header-retract');
                }
            }
            
            prevScrollTop = currScrollTop;
        }

        //Modal
        const body = document.getElementsByTagName('body')[0];
        const overlay = document.getElementById('overlay');
        const modalTriggers = document.getElementsByClassName('modal-trigger');
        
        for(let i = 0; i < modalTriggers.length; i++) {
            const trigger = modalTriggers[i];
            const modalId = trigger.dataset.id;
            const modalClose = document.querySelectorAll(`#${modalId} .close`);
            
            trigger.addEventListener('click', (e)=>handleModalTriggerClick(e));
            modalClose[0].addEventListener('click', (e)=>handleModalCloseClick(e, modalId));
        }

        const handleModalTriggerClick = (e) => {
            const modalId = e.toElement.dataset.id;
            const modal = document.getElementById(modalId);
            body.classList.add('has-modal');
            modal.classList.add('active');
            overlay.classList.add('active');
        }

        const handleModalCloseClick = (e, id) => {
            const modal = document.getElementById(id);
            body.classList.remove('has-modal');
            modal.classList.remove('active');
            overlay.classList.remove('active');
        }
        
    }

    else{
        var isScrolling;
        var navHeight = 123;

        var prevScrollTop = 0;
        var deltaScroll = 5;

        $(window).scroll(function(event){
            isScrolling = true;
        });

        setInterval(function() {
            if (isScrolling) {
                justScrolled();
                isScrolling = false;
            }
        }, 250);

        function justScrolled() {
            var currScrollTop = $(this).scrollTop();
            
            // Make sure they scroll more than delta
            if(Math.abs(prevScrollTop - currScrollTop) <= deltaScroll){
                return;
            }
            // Check to see if user scrolled down past navbar height at the top of the page
            if (currScrollTop > prevScrollTop && currScrollTop > navHeight){
                // if so and user is scrolling down, hide nav
                $('header').addClass('header-retract');
            } else {
                // if so and user is scrolling up, show nav
                if(currScrollTop + $(window).height() < $(document).height()) {
                    $('header').removeClass('header-retract');
                }
            }
            
            prevScrollTop = currScrollTop;
        }

         //Modal
         const body = document.getElementsByTagName('body')[0];
         const overlay = document.getElementById('overlay');
         const modalTriggers = document.getElementsByClassName('modal-trigger');
         
         for(let i = 0; i < modalTriggers.length; i++) {
             const trigger = modalTriggers[i];
             const modalId = trigger.dataset.id;
             const modalClose = document.querySelectorAll(`#${modalId} .close`);
             
             trigger.addEventListener('click', (e)=>handleModalTriggerClick(e));
             modalClose[0].addEventListener('click', (e)=>handleModalCloseClick(e, modalId));
         }
 
         const handleModalTriggerClick = (e) => {
             const modalId = e.toElement.dataset.id;
             const modal = document.getElementById(modalId);
             body.classList.add('has-modal');
             modal.classList.add('active');
             overlay.classList.add('active');
         }
 
         const handleModalCloseClick = (e, id) => {
             const modal = document.getElementById(id);
             body.classList.remove('has-modal');
             modal.classList.remove('active');
             overlay.classList.remove('active');
         }
    }

    });

})( jQuery );