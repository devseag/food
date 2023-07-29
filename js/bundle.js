/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // Calculator

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', '1.375');
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        // const elements = document.querySelectorAll(`${parentSelector} div`);
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                // console.log(ratio, sex);

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);

                    e.target.classList.add(activeClass);
                    calcTotal();
                });
            });
        });

        // document.querySelector(parentSelector).addEventListener('click', (e) => {
        // 	if (e.target.getAttribute('data-ratio')) {
        // 		ratio = +e.target.getAttribute('data-ratio');
        // 	} else {
        // 		sex = e.target.getAttribute('id');
        // 	}
        // 	// console.log(ratio, sex);

        // 	elements.forEach(elem => {
        // 		elem.classList.remove(activeClass);

        // 		e.target.classList.add(activeClass);
        // 		calcTotal();
        // 	});
        // });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    // Class usage for card

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            // console.log(this.classes);
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Cena:</div>
					<div class="menu__item-total"><span>${this.price}</span> grn/den'</div>
				</div>
			`;
            this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            // data.forEach(obj => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                // new MenuCard(obj.img, obj.altimg).render();
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // axios.get('http://localhost:3000/menu')
    // 	.then(data => {
    // 		// data.forEach(obj => {
    // 			data.data.forEach(({img, altimg, title, descr, price}) => {				
    // 			// new MenuCard(obj.img, obj.altimg).render();
    // 			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    // 		});
    // 	});

    // getResource('http://localhost:3000/menu')
    // 	.then(data => createCard(data));

    // function createCard(data) {
    // 	data.forEach(({img, altimg, title, descr, price}) => {
    // 		const element = document.createElement('div');

    // 		element.classList.add('menu__item');

    // 		element.innerHTML = `
    // 			<img src=${img} alt=${altimg}>
    // 			<h3 class="menu__item-subtitle">${title}</h3>
    // 			<div class="menu__item-descr">${descr}</div>
    // 			<div class="menu__item-divider"></div>
    // 			<div class="menu__item-price">
    // 				<div class="menu__item-cost">Cena:</div>
    // 				<div class="menu__item-total"><span>${price}</span> grn/den'</div>
    // 			</div>
    // 		`;

    // 		document.querySelector('.menu .container').append(element);
    // 	});
    // }

    // const div = new MenuCard();
    // div.render();
    // new MenuCard(
    // 	"img/tabs/vegy.jpg",
    // 	"vegy",
    // 	'Menju "Fitnes"',
    // 	'Menju "Fitnes" - jeto novyj podhod k prigotovleniju bljud: bolshe svezhih ovoshhej i fruktov. Produkt aktivnyh i zdorovyh ljudej. Jeto absoljutno novyj produkt s optimalnoj cenoj i vysokim kachestvom!',
    // 	9,
    // 	'.menu .container',
    // ).render();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
    // Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        // loading: 'Loading',
        loading: 'img/form/spinner.svg',
        success: 'Success. Soon we will call you',
        failure: 'Something is wrong'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // const statusMessage = document.createElement('div');
            const statusMessage = document.createElement('img');
            // statusMessage.classList.add('status');
            statusMessage.src = message.loading;
            // statusMessage.textContent = message.loading;
            statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;	
			`;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');


            // request.setRequestHeader('Content-type', 'multipart/form-data');
            // request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            // const object = {};
            // formData.forEach(function(value, key) {
            // 	object[key] = value;
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // const obj = {a: 23, b: 50};
            // console.log(Object.entries(obj)); // [ [ 'a', 23 ], [ 'b', 50 ] ]

            // const json = JSON.stringify(object);

            // fetch('server.php', {
            // 	method: "POST",
            // 	headers: {
            // 		'Content-type': 'application/json'
            // 	},
            // 	// body: formData
            // 	body: JSON.stringify(object)
            // })
            // postData('http://localhost:3000/requests', JSON.stringify(object))
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                // .then(data => data.text())
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                    // })
                    // .then()
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                })

            // request.send(formData);
            // request.send(json);

            // request.addEventListener('load', () =>{
            // 	if (request.status === 200) {
            // 		console.log(request.response);
            // 		// statusMessage.textContent = message.success;
            // 		showThanksModal(message.success);
            // 		form.reset();
            // 		// setTimeout(() => {
            // 		statusMessage.remove();
            // 		// }, 2000);
            // 	} else {
            // 		showThanksModal(message.failure);
            // 	}
            // });
        });
    }

    function showThanksModal(message) {
        const preModalDialog = document.querySelector('.modal__dialog');

        preModalDialog.classList.add('hide');

        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thansModal = document.createElement('div');
        thansModal.classList.add('modal__dialog');
        thansModal.innerHTML = `
			<div class="modal__content">
				<div class = "modal__close" data-close>×</div>
				<div class = "modal__title">${message}</div>
			</div>
		`;

        document.querySelector('.modal').append(thansModal);
        setTimeout(() => {
            thansModal.remove();
            preModalDialog.classList.add('show');
            preModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }

    // fetch('db.json')
    // fetch('http://localhost:3000/menu')
    // 	.then(data => data.json())
    // 	.then(res => console.log(res));


    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(json => console.log(json));

    //   fetch('https://jsonplaceholder.typicode.com/posts', {
    // 	  method: "POST",
    // 	  body: JSON.stringify({name: 'Alex'}),
    // 	  headers: {
    // 		'Content-type': 'application/json'
    // 	  }
    //   })
    //   .then(response => response.json())
    //   .then(json => console.log(json));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
    modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    // modal.classList.toggle('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    // modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }

}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
    // Slider

    const slides = document.querySelectorAll(slide), // '.offer__slide'
        slider = document.querySelector(container), // '.offer__slider'
        prev = document.querySelector(prevArrow),// '.offer__slider-prev'
        next = document.querySelector(nextArrow), // '.offer__slider-next'
        total = document.querySelector(totalCounter), // '#total'
        current = document.querySelector(currentCounter), // '#current'
        slidesWrapper = document.querySelector(wrapper), // '.offer__slider-wrapper'
        slidesField = document.querySelector(field), // '.offer__slider-inner'
        width = window.getComputedStyle(slidesWrapper).width;


    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;
`;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
  `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        // if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { // '500px'-width
        // if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) { // '500px'-width
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { // '500px'-width			
            offset = 0;
        } else {
            // offset += +width.slice(0, width.length - 2);
            // offset += +width.replace(/\D/g, '');
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener("click", () => {
        if (offset == 0) {
            // offset = +width.slice(0, width.length - 2) * (slides.length - 1);
            // offset = +width.replace(/\D/g, '') * (slides.length - 1);
            offset = deleteNotDigits(width) * (slides.length - 1);

        } else {
            // offset -= +width.slice(0, width.length - 2);
            // offset -= +width.replace(/\D/g, '')
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;

                // offset = +width.slice(0, width.length - 2) * (slideTo - 1);
                // offset = +width.replace(/\D/g, '') * (slideTo - 1);
                offset = deleteNotDigits(width) * (slideTo - 1);

                slidesField.style.transform = `translateX(-${offset}px)`;

                if (slides.length < 10) {
                    current.textContent = `0${slideIndex}`;
                } else {
                    current.textContent = slideIndex;
                }

                dots.forEach(dot => dot.style.opacity = '.5');
                dots[slideIndex - 1].style.opacity = 1;
            });
        });
    });

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    // 	total.textContent = `0${slides.length}`;
    // } else {
    // 	total.textContent = slides.length;
    // }

    // function showSlides(n) {
    // 	if (n > slides.length) {
    // 		slideIndex = 1;
    // 	}

    // 	if ( n < 1) {
    // 		slideIndex = slides.length;
    // 	}

    // 	slides.forEach(item => item.style.display = 'none');

    // 	slides[slideIndex - 1].style.display = 'block';

    // 	if (slides.length < 10) {
    // 		current.textContent = `0${slideIndex}`;
    // 	} else {
    // 		current.textContent = slideIndex;
    // 	}
    // }

    // function plusSlides(n) {
    // 	showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    // 	plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    // 	plusSlides(1);
    // });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    //Tabs

    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    // showTabContent(0);
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) { // 'tabheader__item'
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    //Timer

    // const deadline = ''; //2020-07-21

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline); // '.timer'
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();

};

// const getResource = async (url) => {
async function getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener('DOMContentLoaded', () => {

	const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 300000);

	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2023-07-29');
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
		container: '.offer__slider',
		nextArrow: '.offer__slider-next',
		slide: '.offer__slide',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map