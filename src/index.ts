import './scss/styles.scss';
import { CardsData } from './components/model/CardsData';
import { EventEmitter, IEvents } from './components/core/EventEmitter';
import { IApi } from './types';
import { Api } from './components/core/Api';
import { API_URL, AppEvents, CDN_URL } from './utils/constants';
import { AppApi } from './components/core/AppApi';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CardInCatalogView } from './components/view/card/CardInCatalogView';
import { CatalogView } from './components/view/catalog/CatalogView';

// Элементы разметки
const cardElement = ensureElement<HTMLTemplateElement>('#card-catalog');
const catalogElement = ensureElement<HTMLElement>('.gallery');

// Прочие классы
const baseApi: IApi = new Api(API_URL);

const api = new AppApi(baseApi, CDN_URL);
const events = new EventEmitter();

// Классы данных
const catalogData = new CardsData(events);

// Классы вью
const card = new CardInCatalogView(cardElement);
const catalogView = new CatalogView(catalogElement, events);

// Загружает массив карточек и сохраняет их в данные каталога
api.getCards()
.then((cards) => {
	catalogData.setCards(cards);
	console.log(catalogData.getCards()); // Выводит карточки
})
.catch((error) => {
	console.error(error);
})

// Отрисовывает полученные с сервера карточки.
events.on(AppEvents.CardsSaved, () => {
	const cards = catalogData.getCards().map((item) => {
		const cardClonedElement = cloneTemplate<HTMLElement>(cardElement);
		const cardView = new CardInCatalogView(cardClonedElement);
		console.log(cardView.render(item))
		catalogElement.append(cardView.render(item));
	});

});


