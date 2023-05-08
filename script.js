(() => {
  const cardsNumber = [];
	// функция, которая генерирует парные числа в массив
	function pairedArray (count){
		for (let i = 0; i < count; i++) {
			cardsNumber.push(i, i);
		};
	};

	// функция, которая перемешивает массив
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1)); // генерируем случайный индекс от 0 до i
			[array[i], array[j]] = [array[j], array[i]]; // меняем местами элементы с индексами i и j
		};
		return array;
	};

	// Параметры для игры
	function cardsAppOptions (){
		const container = document.getElementById('game');
		container.style.cssText = 'display: flex; flex-wrap: wrap; max-width: 430px;';
		const input = document.createElement('input');
		input.style.marginRight = '10px';
		const button = document.createElement('button');
		button.textContent = 'Создать игру';
		container.append(input, button);

		button.addEventListener ('click', () => {
			if (input.value >= 2 && input.value <= 10 && input.value % 2 === 0) {
				pairedArray(input.value / 2);
				shuffleArray(cardsNumber);
				createCardsApp(input.value);
				input.remove();
				button.remove();
			} else {
				pairedArray(4);
				shuffleArray(cardsNumber);
				createCardsApp(4);
				input.remove();
				button.remove();
			}
		})
	}
	cardsAppOptions ();

	// создание игры
	function createCardsApp (cardQuantity) {
		console.log (cardsNumber);
		// ищем контейнер и стилизуем его
		const container = document.getElementById('game');
		container.style.cssText = 'display: flex; flex-wrap: wrap; max-width: 430px; position: relative;';
		// делаем кнопку сброса
		const button = document.createElement('button');
		button.textContent = 'Сбросить игру';
		button.style.cssText = 'position: absolute; left: 30%; bottom: -80px; display: none; width: 150px; height: 50px;'
		// помещаем кнопку в контейнер
		container.append(button);

		// создаём карточки
		const divCards = [];

		for (let i = 1; i <= cardQuantity; i++) {
			const divCard = document.createElement('div');
			// стилизация карточек и их отображение в контейнере
			divCard.style.cssText = 'display: flex; justify-content: center; align-items: center; width: 100px; height: 100px; margin-right: 5px; margin-bottom: 5px; border: 1px solid black; cursor: pointer;'
			divCard.style.fontSize = '0';
			container.append(divCard);
			// формирование объекта
			let cardObject = {};
			cardObject.status = false;
			cardObject.coupleFound = false;
			cardObject.html = divCard;
			// добавление каждой карточки в массив из всех карточек, которые отрисованы 
			divCards.push(cardObject);
		};

		// добавление цифр из перемешанного массива в карточки
		for (let i = 0; i < divCards.length; i++) {
			divCards[i].textContent = cardsNumber[i];
			divCards[i].html.textContent = cardsNumber[i];
		};

		// проверка на совпадение чисел открытых карточек и если они совпадают, то добавляются в массив coupleFoundCarts
		function checkForNumber () {
			for (let i = 0; i < trueCards.length; i++) {
				for (let j = i + 1; j < trueCards.length; j++) {
					if (trueCards[i].textContent === trueCards[j].textContent) {
						if (!coupleFoundCards.includes(trueCards[i]) & !coupleFoundCards.includes(trueCards[j])) {
							coupleFoundCards.push (trueCards[i]);
							coupleFoundCards.push (trueCards[j]);
						}
					};
				}
			}
		}

		// нажатие на карточку
		const trueCards = [];
		let coupleFoundCards = [];

		for (const card of divCards) {
			card.html.addEventListener('click', () => {
				// Проверяем, есть ли уже карточка в массиве trueCards
				if (!trueCards.includes(card)) {
					card.status = true;
					card.html.style.fontSize = "x-large";
					card.html.style.backgroundColor = "rgba(142, 163, 149, 0.4)";
					trueCards.push(card); // добавляем открытую карточку в trueCards
					checkForNumber (); // проверяем innerHTML в карточках и если он одинаков, то элементы перемещаются в coupleFoundCards
					// Если пары найдены, то обновляем статус найденной пары на true
					if (coupleFoundCards.length >= 2) {
						for (const item of coupleFoundCards) {
							item.coupleFound = true;
						}
					} 
					// задаём зелёный фон найденным парам
					console.log (coupleFoundCards);
					for (const trueCard of trueCards) {
						if (trueCard.coupleFound === true) {
							trueCard.html.style.backgroundColor = 'rgba(3, 247, 92, 0.4)';
						}
					}
					// Сброс карточек, если пара не найдена
					if (trueCards.length === coupleFoundCards.length + 2) {
						// Сброс стилей для последних двух открытых карточек
						for (let i = trueCards.length - 2; i < trueCards.length; i++) {
							trueCards[i].status = false;
							trueCards[i].html.style.backgroundColor = "white";
							trueCards[i].html.style.fontSize = "0";
						}
						// Удаление последних двух карточек из массива trueCards
						trueCards.splice(-2);
						console.log(trueCards);
					}
					// появление сброса игры, когда все пары найдены
					if (cardsNumber.length === coupleFoundCards.length) {
						button.style.display = 'block';
						button.addEventListener('click', () => {
							divCards.splice(0, divCards.length);
							trueCards.splice(0, trueCards.length);
							cardsNumber.splice(0, cardsNumber.length);
							coupleFoundCards.splice(0, coupleFoundCards.length);
							while (container.firstChild) {
								container.removeChild(container.firstChild);
							}
							cardsAppOptions ();
						})
					}
				}
			});
		};
	};

})();