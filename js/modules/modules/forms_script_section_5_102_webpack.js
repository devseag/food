function forms() {
    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        // loading: 'Loading',
        loading: 'img/form/spinner.svg',
        success: 'Success. Soon we will call you',
        failure: 'Something is wrong'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

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
            postData('http://localhost:3000/requests', json)
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

module.exports = forms;