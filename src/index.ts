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
import { CardInPreviewView } from './components/view/card/CardInPreviewView';
import { HeaderView } from './components/view/header/HeaderView';

// Элементы разметки
const catalogElement = ensureElement<HTMLElement>('.gallery');
const catalogCardElement = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewCardElement = ensureElement<HTMLTemplateElement>('#card-preview');
const modalElement = ensureElement<HTMLElement>('.modal');
const headerElement = ensureElement<HTMLElement>('.header');

// Прочие классы
const baseApi: IApi = new Api(API_URL);
const api = new AppApi(baseApi, CDN_URL);
const events = new EventEmitter();

// Классы данных
const catalogData = new CardsData(events);

// Классы вью
const catalogView = new CatalogView(catalogElement, events);
const modalView = new ModalView(modalElement, events);
const headerView = new HeaderView(headerElement, events);

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
		const cardClonedElement = cloneTemplate<HTMLElement>(catalogCardElement);
		const cardView = new CardInCatalogView(cardClonedElement, events);
		return cardView.render(item);
	});
	// Добавляет карточки в разметку.
	catalogView.content = cards;
});

// Выводит выбранную карточку в модальное окно.
events.on<{cardId: string}>(AppEvents.ProductOpen, (id) => {
	const previewCardClonedElement = cloneTemplate<HTMLElement>(previewCardElement);
	const previewCardView = new CardInPreviewView(previewCardClonedElement, events);
	const previewCardFilled =  previewCardView.render(catalogData.getCard(id.cardId));
	modalView.content = previewCardFilled;
	modalView.openModal();
})

// Открывает корзину
events.on(AppEvents.BasketOpen, () => {
	modalView.openModal(); // Тут будет отрытие корзины в модалке.
})


