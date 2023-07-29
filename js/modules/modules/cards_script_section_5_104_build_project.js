import { getResource } from "../services/services";

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

    getResource('http://localhost:3000/menu')
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

export default cards;