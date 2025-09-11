import { IModalView } from '../../../types';
import { IEvents } from '../../core/EventEmitter';

export class ModalView implements IModalView {
	protected events: IEvents;
	protected closeButton: HTMLButtonElement;
	protected modalContent: HTMLElement;


	constructor(protected modalElement: HTMLElement, events: IEvents) {
		this.events = events;
		this.closeButton = modalElement.querySelector('.modal__close');
		this.modalContent = modalElement.querySelector('.modal__content');
		this.closeButton.addEventListener('click', () => {
			this.closeModal();
		})
		this.modalElement.addEventListener('mousedown', (evt) => {
			if(evt.target === evt.currentTarget) {
				this.closeModal();
			}
		})
		this.handleEscUp = this.handleEscUp.bind(this);
	}

	set content(element: HTMLElement) {
		this.modalContent.replaceChildren(element);
	}

	openModal() {
		this.modalElement.classList.add('modal_active');
		document.addEventListener('keyup', this.handleEscUp);
	}

	closeModal() {
		this.modalElement.classList.remove('modal_active');
		document.removeEventListener('keyup', this.handleEscUp);
	}

	handleEscUp (evt: KeyboardEvent) {
		if (evt.key === "Escape") {
			this.closeModal();
		}
	};

}