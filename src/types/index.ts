	// Типы данных

// Способы оплаты
export type TUserPayment = 'card' | 'cash' | '';

// Типы запросов к серверу
export type ApiPostMethods = 'POST' | 'GET';

// Типы данных карточки, которые передаются в render
export type CardBaseProps  = { title: string; price: number | null };
export type CardMediaProps = { category?: string; image?: string; index?: number; };
export type CardsArrayProps ={ items: ICard[]};
export type CardProps = CardBaseProps & CardMediaProps;

// Интерфейс карточки
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
	setCards (cards: ICard[]): void;
	// savePreview (cards: ICard[]): void;
	getCards(): ICard[];
}

// Интерфейс класса данных покупателя
export interface IUserData {
	payment: TUserPayment
	address: string;
	email: string;
	phone: string;
	getUser (): IUser;
	validateUser (userData: IUser): boolean;
	saveUser (userData: IUser): void;
}

	// Интерфейсы слоя представления

// Базовый интерфейс карточки товара
export interface ICardBaseView {
	set title (text: string);
	set price (price: number);
	set id (id: string);
}

// Расширенный интерфейс карточки товара
export interface ICardFullView extends ICardBaseView {
	set category (text: string);
	set image (link: string);
}



// Интерфейс каталога карточек на главной странице
export interface ICatalogView {
	set content (cards: HTMLElement[]);
}

// Интерфейс модального окна
export interface IModalView {
	openModal(): void;
	closeModal(): void;
	set content (element: HTMLElement);
}

// Интерфейс содержимого модального окна с корзиной
export interface IBasketView {
	totalPriceElement: HTMLElement;
	submitButton: HTMLButtonElement;
	set submitButtonText (text: string);
	set totalPrice (totalPrice: number);
}

// Родительский интерфейс формы
export interface IFormView {
	formEl: HTMLFormElement;
	inputsElement: NodeListOf<HTMLInputElement>;
	errorsElement: HTMLElement;
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
	addressInputElement: HTMLInputElement;
	set address (text: string);
}

// Интерфейс формы для сбора контактных данных
export interface IContactsFormView extends IFormView {
	emailInputElement: HTMLInputElement;
	phoneInputElement: HTMLInputElement;
	set email (text: string);
	set phone (text: string);
}

// Интерфейс окна с подтверждением оформления заказа
export interface IOrderSuccessView {
	totalPriceElement: HTMLElement;
	successCloseButton: HTMLButtonElement;
	set totalPrice (totalPrice: number);
}

	// Интерфейсы слоя коммуникации

// Интерфейс класса для обращения к серверу
export interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}