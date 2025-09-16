import { ICardFullView } from '../../../types';
import {CardBaseView} from "./CardBaseView";
import { IEvents } from '../../core/EventEmitter';
import { categoryClasses } from '../../../utils/constants';

// Класс содержит базовые свойства для классов карточек в галерее и превью
export class CardFullView extends CardBaseView implements ICardFullView {
	protected cardCategoryEl: HTMLElement;
	protected cardImageEl: HTMLImageElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this.cardCategoryEl = container.querySelector('.card__category');
		this.cardImageEl = container.querySelector('.card__image');
	}
	set category (text: string) {
		this.cardCategoryEl.textContent = text;
		this.cardCategoryEl.className = `card__category ${categoryClasses[text] ?? ''}`
	};
	set image (link: string) {
		this.cardImageEl.src = link;
	};
}