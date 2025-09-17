import { ICardBaseView } from '../../../types';
import { CardBaseView } from './CardBaseView';
import { IEvents } from '../../core/EventEmitter';
import { AppEvents } from '../../../utils/constants';

// Интерфейс карточки товара, добавленной в корзину
export class CardInBasketView extends CardBaseView implements ICardBaseView {
	deleteButton: HTMLButtonElement;
	indexElement: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this.events = events;
		this.indexElement = container.querySelector('.basket__item-index');
		this.deleteButton = container.querySelector('.basket__item-delete');
		this.deleteButton.addEventListener('click', () => {
			events.emit(AppEvents.BasketDelete, { id: this.cardId});
		})
	}

	set index(index: number) {
		this.indexElement.textContent = String(index + 1);
	}
}