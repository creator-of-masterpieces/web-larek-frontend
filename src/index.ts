import './scss/styles.scss';
import { CardsData } from './components/model/CardsData';
import { EventEmitter, IEvents } from './components/core/EventEmitter';
import { IApi } from './types';
import { Api } from './components/core/Api';
import { API_URL } from './utils/constants';
import { AppApi } from './components/core/AppApi';


const events = new EventEmitter();
const catalog = new CardsData(events);
const baseApi: IApi = new Api(API_URL);
const api = new AppApi(baseApi);

// Загружает массив карточек и сохраняет их в данные каталога
api.getCards()
.then((cards) => {
	catalog.setCards(cards);
	console.log(catalog.getCards());
})
.catch((error) => {
	console.error(error);
})
