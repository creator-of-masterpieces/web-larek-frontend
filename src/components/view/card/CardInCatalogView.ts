import { CardsArrayProps, ICardBaseView, ICardFullView } from '../../../types';
import { CardFullView } from './CardFullView';

// Интерфейс карточки товара в каталоге
export interface ICardInCatalogView  extends ICardBaseView, ICardFullView{}

export class CardInCatalogView extends CardFullView implements ICardInCatalogView {

	constructor(container: HTMLElement) {
		super(container);
	}
}