export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {

};

// Список событий. Enum - список именованных констант, используют, чтобы не опечататься.
export enum AppEvents {

	CardsSaved = 'cards:saved',
	BasketChanged = 'basket:changed',
	ModalOpen = 'modal: open',
	ModalClose = 'modal:close',
	ProductOpen = 'product:open',
	ProductBuy = 'product:buy',
	BasketOpen = 'basket:open',
	BasketDelete = 'basket:delete',
	BasketOrder = 'basket:order',
	FormOrderSubmit = 'formOrder:submit',
	FormContactsSubmit = 'formContacts:submit',
	FormOrderInput = 'formOrder:input',
	FormContactsInput = 'formContacts:input',
	FormOrderOnline = 'formOrder:online',
	FormOrderCash = 'formOrder:cash',
	OrderSuccessMessageSuccessConfirm = 'orderSuccessMessage:successConfirm'
}
