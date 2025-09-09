import { Component } from '../shared/Component';
import {CardCatalogProps, ICardBaseView} from '../../../types';

// Класс содержит базовые свойства для всех классов карточек
export class CardBaseView extends Component<CardCatalogProps> {
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
		this.cardPriceEl.textContent = price.toString();
	};
}