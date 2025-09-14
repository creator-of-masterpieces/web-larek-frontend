import { ICard, ICardsData } from '../../types';
import { IEvents } from '../core/EventEmitter';
import { AppEvents } from '../../utils/constants';

export class CardsData implements ICardsData {
	protected events: IEvents;
	protected cards: ICard[];
	protected preview: ICard;

	constructor(events: IEvents) {
		this.events = events;
	}

	// Сохраняет карточки товаров
	setCards(cards: ICard[]) {
		this.cards = cards;
		this.events.emit(AppEvents.CardsSaved);
	}

	// Возвращает карточки товаров
	getCards() {
		return this.cards;
	}
 // Возвращает карточку по id
	getCard(id: string) {
		return this.cards.find((card) => card.id === id);
	}
}
