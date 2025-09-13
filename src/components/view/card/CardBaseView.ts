import { Component } from '../shared/Component';
import { CardProps, ICardBaseView } from '../../../types';
import { IEvents } from '../../core/EventEmitter';

// Класс содержит базовые свойства для всех классов карточек
export class CardBaseView extends Component<CardProps> implements ICardBaseView {
	protected cardTitleElement: HTMLElement;
	protected cardPriceElement: HTMLElement;
	protected cardId: string;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this.cardTitleElement = this.container.querySelector('.card__title');
		this.cardPriceElement = this.container.querySelector('.card__price');
	}
	
	set title (text: string) {
		this.cardTitleElement.textContent = text;
	};

	set price (price: number) {
		if(price){
			this.cardPriceElement.textContent = price.toString();
		}
		else {
			this.cardPriceElement.textContent = 'Бесценно';
		}
	};

	set id (id: string) {
		this.cardId = id;
	}
}