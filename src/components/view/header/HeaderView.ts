import { Component } from '../shared/Component';
import { IEvents } from '../../core/EventEmitter';
import { AppEvents } from '../../../utils/constants';


export interface IHeaderView {
	set counter (cardsCount: number);
}

// Класс для управления отображением шапки приложения, который управляет иконкой корзины
export class HeaderView extends Component<IHeaderView> implements IHeaderView {
	protected events: IEvents
	protected basketButton: HTMLButtonElement;
	protected basketCounterElement: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this.basketButton = container.querySelector('.header__basket');
		this.basketCounterElement = container.querySelector('.header__basket-counter');
		this.basketButton.addEventListener('click', () => {
			this.events.emit(AppEvents.BasketOpen);
		})
	}


	set counter (cardsCount: number) {
		this.basketCounterElement.textContent = cardsCount.toString();
	}
}