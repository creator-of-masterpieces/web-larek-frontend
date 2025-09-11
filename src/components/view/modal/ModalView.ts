import { IModalView } from '../../../types';
import { IEvents } from '../../core/EventEmitter';

export class ModalView implements IModalView {
	protected closeButton: HTMLButtonElement;
	protected events: IEvents;

	constructor(protected modalElement: HTMLElement, events: IEvents) {
		this.events = events;
		this.closeButton = modalElement.querySelector('.modal__close');
		this.closeButton.addEventListener('click', () => {
			this.closeModal();
		})
	}

	set content(element: HTMLElement) {
		this.modalElement.replaceChildren(element);
	}

	openModal() {
		this.modalElement.classList.add('modal_active');
	}

	closeModal() {
		this.modalElement.classList.remove('modal_active');
	}
}