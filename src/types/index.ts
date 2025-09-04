// Типы

// Способы оплаты
export type TUserPayment = 'card' | 'cash' | '';

// Карточка
export interface ICard {
	id: string;
	title: string;
	image: string;
	category: string;
	price: number | null;
	description: string;
}

// Данные покупателя
export interface IUser {
	payment: TUserPayment
	address: string;
	email: string;
	phone: string;
}

// Интерфейсы слоя данных

// Интерфейс класса данных каталога карточек
export interface ICardsData {
	cards: ICard[];
	preview: ICard;
	getCards ():ICard[];
	saveCards (cards: ICard[]): void;
	savePreview (cards: ICard[]): void;
	getCard(id: string): ICard[];
}

// Интерфейс класса данных покупателя
export interface IUserData {
	payment: TUserPayment
	address: string;
	email: string;
	phone: string;
	GetUser (): IUser;
	ValidateUser (userData: IUser): boolean;
	SaveUser (userData: IUser): void;
}

// Интерфейс класса данных корзины
export interface IBasketData {
	Cards: ICard[];
	AddCard (card: ICard[]): void;
	RemoveCard (id: string): void;
	GetTotalPrice(cards: ICard[]): number;
	GetCards (): ICard[];
	IsInBasket (id: string): boolean;
}

// Интерфейсы слоя представления

// Базовый интерфейс карточки товара
export interface ICardBaseView {
	cardTitleEl: HTMLElement;
	cardPriceEl: HTMLElement;
	set title (text: string);
	set price (price: number);
}

// Расширенный интерфейс карточки товара
export interface ICardFullView {
	cardCategoryEl: HTMLElement;
	cardImageLink: string;
	set category (text: string);
	set image (link: string);
}

// Интерфейс карточки товара в каталоге
export interface ICardInCatalogView  extends ICardBaseView, ICardFullView{}

// Интерфейс выбранной карточки товара
export interface ICardPreviewView extends ICardBaseView, ICardFullView {
	cardDescriptionEl: HTMLElement;
	buyButton: HTMLButtonElement;
	set description (text: string);
}

// Интерфейс карточки товара, добавленной в корзину
export interface ICardInBasketView extends ICardBaseView{
	cardIndexEl: HTMLElement;
	deleteButton: HTMLButtonElement;
	set cardIndex(index: number);
}

// Интерфейс иконки корзины в шапке приложения
export interface IHeaderView {
	busketButton: HTMLButtonElement
	basketCounterEl: HTMLElement
	set counter (cardsCount: number);
}

// Интерфейс каталога карточек на главной странице
export interface ICatalogView {
	catalogEl: HTMLElement;
	set content (cards: HTMLElement[]);
}

// Интерфейс модального окна
export interface IModalView {
	closeButton: HTMLButtonElement;
	openModal(): void;
	closeModal(): void;
	set content (element: HTMLElement);
}

// Интерфейс содержимого модального окна с корзиной
export interface IBasketView {
	totalPriceEl: HTMLElement;
	submitButton: HTMLButtonElement;
	set submitButtonText (text: string);
	set totalPrice (totalPrice: number);
}

// Родительский интерфейс формы
export interface IFormView {
	formEl: HTMLFormElement;
	inputsEl: NodeListOf<HTMLInputElement>;
	errorsEl: HTMLElement;
	submitButton: HTMLButtonElement;
	onInputChange (): void;
	set errors (text: string);
	set valid (value: boolean);
	getInputsValue (): Record<string, string>;
}

// Интерфейс формы сбора информации об оплате и адресе
export interface IOrderFormView extends IFormView {
	cardPaymentButton: HTMLButtonElement;
	cashPaymentButton: HTMLButtonElement;
	addressInputEl: HTMLInputElement;
	set address (text: string);
}

// Интерфейс формы для сбора контактных данных
export interface IContactsFormView extends IFormView {
	emailInputEl: HTMLInputElement;
	phoneInputEl: HTMLInputElement;
	set email (text: string);
	set phone (text: string);
}

// Интерфейс окна с подтверждением оформления заказа
export interface IOrderSuccesView {
	totalPriceEl: HTMLElement;
	succesCloseButton: HTMLButtonElement;
	set totalPrice (totalPrice: number);
}
