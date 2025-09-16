// Типы данных

// Способы оплаты
export type TUserPayment = 'card' | 'cash' | '';

// Типы запросов к серверу
export type ApiPostMethods = 'POST' | 'GET';

// Типы данных карточки, которые передаются в render
export type CardBaseProps  = { title: string; price: number | null };
export type CardMediaProps = { category?: string; image?: string; index?: number; buttonDisable?: boolean};
export type CardsArrayProps ={ items: ICard[]};
export type CardProps = CardBaseProps & CardMediaProps;

// Тип источника события изменения корзины

export type TBasketSource = 'preview' | 'basket';

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

// Данные заказа
export interface IOrder extends IUser {
	total: number;
	items: string[];
}

// Ответ сервера на успешную отправку заказа
export interface IApiOrderResponse {
	id: string;
	total: number;
}

// Интерфейсы слоя данных

// Интерфейс класса данных каталога карточек
export interface ICardsData {
	setCards (cards: ICard[]): void;
	// savePreview (cards: ICard[]): void;
	getCards(): ICard[];
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
export interface IBaseFormView {
	resetForm(): void;
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