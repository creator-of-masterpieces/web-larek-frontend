export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {

};

// Список событий. Enum - список именованных констант, используют, чтобы не опечататься.
export enum AppEvents {
	CardsSaved = 'cards:saved',
	PaymentSaved = 'payment: saved',
	AddressSaved = 'address: saved',
	EmailSaved = 'email:saved',
	PhoneSaved = 'phone:saved',
	BasketChanged = 'basket:changed',
	ModalOpen = 'modal:open',
	ModalClose = 'modal:close',
	ProductOpen = 'product:open',
	CardButtonClick = 'cardButton:click',
	BasketOpen = 'basket:open',
	BasketDelete = 'basket:delete',
	BasketOrder = 'basket:order',
	FormOrderSubmit = 'formOrder:submit',
	FormContactsInputEmail = 'formContactsEmail:input',
	FormContactsInputPhone = 'formContactsPhone:input',
	FormOrderOnline = 'formOrder:online',
	FormOrderCash = 'formOrder:cash',
	FormOrderInput = 'formOrder:input',
	FormContactsSubmit = 'formContacts:submit',
	OrderSuccessMessageSuccessConfirm = 'orderSuccessMessage:successConfirm'
}
