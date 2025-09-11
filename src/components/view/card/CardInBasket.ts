import { Component } from '../shared/Component';
import { ICardBaseView } from '../../../types';
import { CardBaseView } from './CardBaseView';
import { IEvents } from '../../core/EventEmitter';

// Интерфейс карточки товара, добавленной в корзину
export interface ICardInBasketView extends ICardBaseView {
	set cardIndex(index: number);
}


export class CardInBasketView extends CardBaseView implements ICardInBasketView {
	cardIndexElement: HTMLElement;
	
	deleteButton: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this.events = events;
	}

	set cardIndex(index: number) {
		this.cardIndexElement.textContent = index.toString();
	}
}