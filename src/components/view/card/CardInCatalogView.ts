import { CardsArrayProps, ICardBaseView, ICardFullView } from '../../../types';
import { CardFullView } from './CardFullView';
import { AppEvents } from '../../../utils/constants';
import { IEvents } from '../../core/EventEmitter';

// Интерфейс карточки товара в каталоге
export interface ICardInCatalogView  extends ICardBaseView, ICardFullView{}

export class CardInCatalogView extends CardFullView implements ICardInCatalogView {

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this.container.addEventListener('click', () => {
			this.events.emit(AppEvents.ProductOpen, { cardId: this.cardId  });
		})
	}
}