import { Component } from '../shared/Component';
import { ICardBaseView } from '../../../types';

// Класс содержит базовые свойства для всех классов карточек
export class CardBaseView extends Component<ICardBaseView> {
	protected cardTitleEl: HTMLElement;
	protected cardPriceEl: HTMLElement;
	constructor(container: HTMLTemplateElement) {
		super(container);
		this.cardTitleEl = this.container.querySelector('.card__title');
		this.cardPriceEl = this.container.querySelector('.card__price');
	}
	
	set title (text: string) {
		this.cardTitleEl.textContent = text;
	};

	set price (price: number) {
		this.cardPriceEl.textContent = String(price);
	};
}