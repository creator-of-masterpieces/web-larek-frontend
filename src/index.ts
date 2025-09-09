import './scss/styles.scss';
import { CardsData } from './components/model/CardsData';
import { EventEmitter, IEvents } from './components/core/EventEmitter';
import { IApi } from './types';
import { Api } from './components/core/Api';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/core/AppApi';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CardInCatalogView } from './components/view/card/CardInCatalogView';

// Элементы разметки
const cardElement = cloneTemplate<HTMLElement>(ensureElement<HTMLTemplateElement>('#card-catalog'));
const catalogElement = ensureElement<HTMLElement>('.gallery');

const events = new EventEmitter();
const catalog = new CardsData(events);
const baseApi: IApi = new Api(API_URL);
const api = new AppApi(baseApi);
const card = new CardInCatalogView(cardElement);

// Загружает массив карточек и сохраняет их в данные каталога
api.getCards()
.then((cards) => {
	catalog.setCards(cards);
})
.catch((error) => {
	console.error(error);
})

// Тестирую класс карточки в каталоге
console.log(card);
catalogElement.append(card.render({price: 20000, title: 'Телеграм премиум', category: 'Донат', image:`${CDN_URL}/Shell.png`}));

