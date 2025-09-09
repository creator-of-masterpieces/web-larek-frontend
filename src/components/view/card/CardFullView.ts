import { ICardBaseView, ICardFullView } from '../../../types';
import { Component } from '../shared/Component';
import {CardBaseView} from "./CardBaseView";

// Класс содержит базовые свойства для классов карточек в галерее и превью
export class CardFullView extends CardBaseView implements ICardFullView {
	protected cardCategoryEl: HTMLElement;
	protected cardImageEl: HTMLImageElement;

	constructor(container: HTMLElement) {
		super(container);
		this.cardCategoryEl = container.querySelector('.card__category');
		this.cardImageEl = container.querySelector('.card__image');
	}
	set category (text: string) {
		this.cardCategoryEl.textContent = text;
	};
	set image (link: string) {
		this.cardImageEl.src = link;
	};
}