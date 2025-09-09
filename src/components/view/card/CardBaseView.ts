import { Component } from '../shared/Component';
import { CardProps, ICardBaseView } from '../../../types';

// Класс содержит базовые свойства для всех классов карточек
export class CardBaseView extends Component<CardProps> implements ICardBaseView {
	protected cardTitleEl: HTMLElement;
	protected cardPriceEl: HTMLElement;
	constructor(container: HTMLElement) {
		super(container);
		this.cardTitleEl = this.container.querySelector('.card__title');
		this.cardPriceEl = this.container.querySelector('.card__price');
	}
	
	set title (text: string) {
		this.cardTitleEl.textContent = text;
	};

	set price (price: number) {
		if(price){
			this.cardPriceEl.textContent = price.toString();
		}
		else {
			this.cardPriceEl.textContent = '';
		}
	};
}