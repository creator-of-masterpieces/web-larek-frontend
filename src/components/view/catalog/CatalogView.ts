import { IEvents } from '../../core/EventEmitter';
import { cloneTemplate } from '../../../utils/utils';
import { Component } from '../shared/Component';
import { ICard } from '../../../types';

export class CatalogView extends Component<ICard>{
	protected cards: HTMLElement[];
	protected events: IEvents;

	constructor(template: HTMLTemplateElement, events: IEvents) {
		super(template);
		this.events = events;
	}

	set content(cards: HTMLElement[]) {
		
	}
}