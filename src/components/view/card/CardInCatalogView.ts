import { Component } from '../shared/Component';
import { ICardBaseView, ICardFullView} from '../../../types';
import { CardBaseView } from './CardBaseView';
import { CardFullView } from './CardFullView';

// Интерфейс карточки товара в каталоге
export interface ICardInCatalogView  extends ICardBaseView, ICardFullView{}

export class CardInCatalogView extends CardBaseView implements ICardInCatalogView {
	private fullView: ICardFullView;

	constructor(container: HTMLTemplateElement) {
		super(container);
		this.fullView = new CardFullView(container);
	}
	set category (text: string) {
		this.fullView.category = text;
	};
	set image (link: string) {
		this.fullView.image = link;
	};
}