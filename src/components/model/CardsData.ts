import { ICard, ICardsData } from '../../types';
import { IEvents } from '../core/EventEmitter';
import { AppEvents } from '../../utils/constants';

export class CardsData {
	protected cards: ICard[];
	protected preview: ICard;
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	// Сохраняет карточки товаров
	setCards (cards: ICard[]) {
		this.cards = cards;
		this.events.emit(AppEvents.CardsSaved);
	}
	getCards() {
		return this.cards;
	}
}