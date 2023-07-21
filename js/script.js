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
		  modal = document.querySelector('.modal'),
		  modalCloseBtn = document.querySelector('[data-close]');

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

	modalCloseBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	// const modalTimerId = setTimeout(openModal, 5000);

	function showModalByScroll() {
		if ( window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

	// Class usage for card

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			element.innerHTML = `
				<div class="menu__item">
					<img src=${this.src} alt=${this.alt}>
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Cena:</div>
						<div class="menu__item-total"><span>${this.price}</span> grn/den'</div>
					</div>
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
		'.menu .container'
	).render();

	new MenuCard(
		"img/tabs/elite.jpg",
		"elite",
		'Menju “Premium”',
		'V menju “Premium” my ispolzuem ne tolko krasivyj dizajn upakovki, no i kachestvennoe ispolnenie bljud. Krasnaja ryba, moreprodukty, frukty - restorannoe menju bez pohoda v restoran!',
		14,
		'.menu .container'
	).render();

	new MenuCard(
		"img/tabs/post.jpg",
		"post",
		'Menju "Postnoe"',
		'Menju “Postnoe” - jeto tshhatelnyj podbor ingredientov: polnoe otsutstvie produktov zhivotnogo proishozhdenija, moloko iz mindalja, ovsa, kokosa ili grechki, pravilnoe kolichestvo belkov za schet tofu i importnyh vegetarianskih stejkov.',
		21,
		'.menu .container'
	).render();

});