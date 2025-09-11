import { CardFullView } from './CardFullView';
import { ICardBaseView, ICardFullView } from '../../../types';
import { IEvents } from '../../core/EventEmitter';

// Интерфейс выбранной карточки товара
export interface ICardPreviewView extends ICardBaseView, ICardFullView {
	set description (text: string);
}

export class CardInPreviewView extends CardFullView implements ICardPreviewView {
	protected cardDescriptionElement: HTMLElement;
	protected buyButton: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this.cardDescriptionElement = container.querySelector('.card__text');
		this.buyButton = container.querySelector('.card__button');
	}

	set description(text: string) {
		this.cardDescriptionElement.textContent = text;
	}
}