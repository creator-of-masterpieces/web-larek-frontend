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
import { ModalView } from './components/view/modal/ModalView';

// Элементы разметки
const cardElement = ensureElement<HTMLTemplateElement>('#card-catalog');
const catalogElement = ensureElement<HTMLElement>('.gallery');
const modalElement = ensureElement<HTMLElement>('.modal');

// Прочие классы
const baseApi: IApi = new Api(API_URL);
const api = new AppApi(baseApi, CDN_URL);
const events = new EventEmitter();

// Классы данных
const catalogData = new CardsData(events);

// Классы вью
const catalogView = new CatalogView(catalogElement, events);
const modalView = new ModalView(modalElement, events);

// Загружает массив карточек и сохраняет их в данные каталога
api.getCards()
.then((cards) => {
	catalogData.setCards(cards);
})
.catch((error) => {
	console.error(error);
})

// Создает элементы карточек, заполняет данными из класса данных.
events.on(AppEvents.CardsSaved, () => {
	const cards = catalogData.getCards().map((item) => {
		const cardClonedElement = cloneTemplate<HTMLElement>(cardElement);
		const cardView = new CardInCatalogView(cardClonedElement, events);
		return cardView.render(item);
	});
	// Добавляет карточки в разметку
	catalogView.content = cards;
});

// Пытаюсь вывести выбранную карточку в модалку.
events.on<{cardId: string}>(AppEvents.ProductOpen, (id) => {
	const cardClonedElement = cloneTemplate<HTMLElement>(cardElement);
	const cardView = new CardInCatalogView(cardClonedElement, events);
	modalView.content = cardView.render(cardView);
	modalView.openModal();
	console.log(id.cardId);
	console.log(catalogData.getCard(id.cardId));
})


