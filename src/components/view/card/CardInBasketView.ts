import { ICardBaseView } from '../../../types';
import { CardBaseView } from './CardBaseView';
import { IEvents } from '../../core/EventEmitter';

// Интерфейс карточки товара, добавленной в корзину
export class CardInBasketView extends CardBaseView implements ICardBaseView {
	deleteButton: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this.events = events;
		this.deleteButton = container.querySelector('.basket__item-delete');
	}
}