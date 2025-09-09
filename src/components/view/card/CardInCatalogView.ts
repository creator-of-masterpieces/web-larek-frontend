import { Component } from '../shared/Component';
import { ICardBaseView, ICardFullView} from '../../../types';
import { CardBaseView } from './CardBaseView';
import { CardFullView } from './CardFullView';

// Интерфейс карточки товара в каталоге
export interface ICardInCatalogView  extends ICardBaseView, ICardFullView{}

export class CardInCatalogView extends CardFullView implements ICardInCatalogView {

	constructor(container: HTMLElement) {
		super(container);
	}
}