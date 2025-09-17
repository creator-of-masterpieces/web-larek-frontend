import { IEvents } from '../../core/EventEmitter';
import { cloneTemplate, ensureElement } from '../../../utils/utils';
import { Component } from '../shared/Component';
import { ICard, ICatalogView } from '../../../types';

export class CatalogView extends Component<ICatalogView> implements ICatalogView {
	protected events: IEvents;
	protected pageElement: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
	  this.pageElement = ensureElement('.page__wrapper');
	}

	set content(cards: HTMLElement[]) {
		this.container.replaceChildren(...cards);
	}

	set locked(isOpen: boolean) {
		if(isOpen) {
			this.pageElement.classList.add('page__wrapper_locked');
		}
		else {
			this.pageElement.classList.remove('page__wrapper_locked');
		}
	}
}