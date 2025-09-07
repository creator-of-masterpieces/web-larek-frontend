import { ICardBaseView, ICardFullView } from '../../../types';
import { Component } from '../shared/Component';

// Класс содержит базовые свойства для классов карточек в галерее и превью
export class CardFullView extends Component<ICardFullView> implements ICardFullView {
	protected cardCategoryEl: HTMLElement;
	protected cardImageEl: HTMLElement;

	constructor(container: HTMLTemplateElement) {
		super(container);
		this.cardCategoryEl = container.querySelector('.card__category');
		this.cardImageEl = container.querySelector('.card__image');
	}
	set category (text: string) {
		this.cardCategoryEl.textContent = text;
	};
	set image (link: string) {
		this.cardImageEl.textContent = link;
	};
}