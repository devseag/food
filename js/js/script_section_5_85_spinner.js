window.addEventListener('DOMContentLoaded', () =>{

	//Tabs

	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach(item =>{
			// item.style.display = 'none';
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item =>{
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		// tabsContent[i].style.display = 'block';
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	// showTabContent(0);
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	//Timer

	const deadline = '2020-07-21';

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
		if (num >=0 && num < 10){
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
	
	setClock('.timer', deadline);

	// Modal

	const modalTrigger = document.querySelectorAll('[data-modal]'),
		  modal = document.querySelector('.modal');

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		// modal.classList.toggle('show');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});		  


	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		// modal.classList.toggle('show');
		document.body.style.overflow = '';	
	}

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 50000);

	function showModalByScroll() {
		if ( window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

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
			if(this.classes.length === 0) {
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

	// const div = new MenuCard();
	// div.render();
	new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		'Menju "Fitnes"',
		'Menju "Fitnes" - jeto novyj podhod k prigotovleniju bljud: bolshe svezhih ovoshhej i fruktov. Produkt aktivnyh i zdorovyh ljudej. Jeto absoljutno novyj produkt s optimalnoj cenoj i vysokim kachestvom!',
		9,
		'.menu .container',
	).render();

	new MenuCard(
		"img/tabs/elite.jpg",
		"elite",
		'Menju “Premium”',
		'V menju “Premium” my ispolzuem ne tolko krasivyj dizajn upakovki, no i kachestvennoe ispolnenie bljud. Krasnaja ryba, moreprodukty, frukty - restorannoe menju bez pohoda v restoran!',
		14,
		'.menu .container',
		'menu__item'
	).render();

	new MenuCard(
		"img/tabs/post.jpg",
		"post",
		'Menju "Postnoe"',
		'Menju “Postnoe” - jeto tshhatelnyj podbor ingredientov: polnoe otsutstvie produktov zhivotnogo proishozhdenija, moloko iz mindalja, ovsa, kokosa ili grechki, pravilnoe kolichestvo belkov za schet tofu i importnyh vegetarianskih stejkov.',
		21,
		'.menu .container',
		'menu__item'
	).render();

	// Forms

	const forms = document.querySelectorAll('form');

	const message = {
		// loading: 'Loading',
		loading: 'img/form/spinner.svg',
		success: 'Success. Soon we will call you',
		failure: 'Something is wrong'
	};

	forms.forEach(item => {
		postData(item);
	});

	function postData(form) {
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

			const request = new XMLHttpRequest();
			request.open('POST', 'server.php');

			// request.setRequestHeader('Content-type', 'multipart/form-data');
			request.setRequestHeader('Content-type', 'application/json');
			const formData = new FormData(form);

			const object = {};
			formData.forEach(function(value, key) {
				object[key] = value;
			});

			const json = JSON.stringify(object);

			// request.send(formData);
			request.send(json);

			request.addEventListener('load', () =>{
				if (request.status === 200) {
					console.log(request.response);
					// statusMessage.textContent = message.success;
					showThanksModal(message.success);
					form.reset();
					// setTimeout(() => {
					statusMessage.remove();
					// }, 2000);
				} else {
					showThanksModal(message.failure);
				}
			});
		});
	}

	function showThanksModal(message) {
		const preModalDialog = document.querySelector('.modal__dialog');
		
		preModalDialog.classList.add('hide');

		openModal();

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
			closeModal();
		}, 4000);
	}
});