import { IEvents } from '../../core/EventEmitter';
import { cloneTemplate } from '../../../utils/utils';
import { Component } from '../shared/Component';
import { ICard, ICatalogView } from '../../../types';

export class CatalogView extends Component<ICatalogView> implements ICatalogView {
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
	}

	set content(cards: HTMLElement[]) {
		this.container.replaceChildren(...cards);
	}
}