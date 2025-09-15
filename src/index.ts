import './scss/styles.scss';
import { CardsData } from './components/model/CardsData';
import { EventEmitter, IEvents } from './components/core/EventEmitter';
import { IApi, IUser, TUserPayment } from './types';
import { Api } from './components/core/Api';
import { API_URL, AppEvents, CDN_URL } from './utils/constants';
import { AppApi } from './components/core/AppApi';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CardInCatalogView } from './components/view/card/CardInCatalogView';
import { CatalogView } from './components/view/catalog/CatalogView';
import { ModalView } from './components/view/modal/ModalView';
import { CardInPreviewView } from './components/view/card/CardInPreviewView';
import { HeaderView } from './components/view/header/HeaderView';
import { CardInBasketView } from './components/view/card/CardInBasketView';
import { BasketData } from './components/model/BasketData';
import { BasketView } from './components/view/basket/BasketView';
import { OrderFormView } from './components/view/form/OrderFormView';
import { ContactsFormView } from './components/view/form/ContactsFormView';
import { UserData } from './components/model/UserData';

// Элемент галереи
const catalogElement = ensureElement<HTMLElement>('.gallery');

//  Элемент карточки в каталоге
const catalogCardElement = ensureElement<HTMLTemplateElement>('#card-catalog');

// Элемент выбранной карточки
const previewCardElement = ensureElement<HTMLTemplateElement>('#card-preview');

// Элемент карточки в корзине
const CardInBasketElement = ensureElement<HTMLTemplateElement>('#card-basket');

// Элемент модального окна
const modalElement = ensureElement<HTMLElement>('.modal');

// Элемент шапки
const headerElement = ensureElement<HTMLElement>('.header');

// Клонированный элемент корзины
const basketClonedElement = cloneTemplate<HTMLElement>(ensureElement<HTMLTemplateElement>('#basket'));

// Прочие классы
const baseApi: IApi = new Api(API_URL);
const api = new AppApi(baseApi, CDN_URL);
const events = new EventEmitter();

// Классы данных
const catalogData = new CardsData(events);
const basketData = new BasketData(events);
const userData = new UserData(events);

// Классы вью
const catalogView = new CatalogView(catalogElement, events);
const modalView = new ModalView(modalElement, events);
const headerView = new HeaderView(headerElement, events);
const basketView = new BasketView(basketClonedElement, events);

// Клонирую темплейт формы оплаты. Передаю его в класс формы
const orderFormElement = cloneTemplate<HTMLFormElement>(ensureElement<HTMLTemplateElement>('#order')) ;
const orderFormView = new OrderFormView(orderFormElement, events);

// Клонирую темплейт формы контактов. Передаю его в класс формы
const contactsFormElement = cloneTemplate<HTMLFormElement>(ensureElement<HTMLTemplateElement>('#contacts'));
const contactsFormView = new ContactsFormView(contactsFormElement, events);


// Хранит значение источника события изменения корзины:
// - из карточки в превью
// - из карточки в корзине
let lastSource: 'preview' | 'basket' | null = null;

// Загружает массив карточек и сохраняет их в данные каталога
api.getCards()
.then((cards) => {
	catalogData.setCards(cards);
})
.catch((error) => {
	console.error(error);
})

// Создает элементы карточек, заполняет данными из класса данных.
events.on(AppEvents.CardsSaved, () => {
	const cards = catalogData.getCards().map((item) => {
		const cardClonedElement = cloneTemplate<HTMLElement>(catalogCardElement);
		const cardView = new CardInCatalogView(cardClonedElement, events);
		return cardView.render(item);
	});
	// Добавляет карточки в разметку.
	catalogView.content = cards;
});

// Выводит выбранную карточку в модальное окно.
events.on<{cardId: string}>(AppEvents.ProductOpen, (id) => {
	// Клонирую карточку
	const previewCardClonedElement = cloneTemplate<HTMLElement>(previewCardElement);
	// Создаю вью объект карточки
	const previewCardView = new CardInPreviewView(previewCardClonedElement, events);
	// Заполняю карточку данными
	const previewCardFilled =  previewCardView.render(catalogData.getCard(id.cardId));

	// Устанавливаю текст кнопки купить/удалить
	if(basketData.isInBasket(id.cardId)) {
		previewCardView.buttonDeleteText();
	}
	else {
		previewCardView.buttonBuyText();
	}

	// добавляю карточку в модальное окно и открываю окно
	modalView.content = previewCardFilled;
	modalView.openModal();
})

// Слушатель события изменения корзины
events.on(AppEvents.BasketChanged, () => {

	// Создаю массив корзинных html карточек. Для этого перебираю массив данных с карточками.
	const cards = basketData.getCards().map((card, index) => {

		// Клонирую html шаблон карточки
		const cardInBasketCloned = cloneTemplate<HTMLElement>(CardInBasketElement);

		// Создаю экземпляр класса вью карточки
		const cardInBasketView = new CardInBasketView(cardInBasketCloned, events);

		// Заполненный html элемент карточки
		const cardInBasketFilled = cardInBasketView.render(card);

		// Задаю порядковый номер карточки в корзине
		cardInBasketFilled.querySelector('.basket__item-index').textContent = String(index + 1);

		// Передаю в рендер вью карточки данные карточки
		return cardInBasketView.render(card);

	})
	// Записываю получившийся массив заполненных html карточек в вью корзины
	basketView.content = cards;

	// Устанавливаю общую стоимость товара в корзине
	basketView.totalPrice = basketData.getTotalPrice();

	// Устанавливаю значения счетчика товаров в корзине
	headerView.counter = basketData.getCardsCount();

	// Закрываю модалку с выбранной карточкой
	if(lastSource === 'preview') {
		modalView.closeModal();
	}
	lastSource = null;
})

// Слушатель события открытия корзины
events.on(AppEvents.BasketOpen, ()=> {
	// Рисую корзину в модалке, открываю модалку
	modalView.render({ content: basketView.render() });
	modalView.openModal();
})

// Слушатель клика по кнопке выбранной карточки
events.on(AppEvents.CardButtonClick, ({ id }: {id: string}) => {
	// Источник клика
	lastSource = 'preview';
	// Выбранная карточка
	const selectedCard = catalogData.getCard(id);

	// Проверка, есть ли карточка в корзине
	if (basketData.isInBasket(id)) {
		basketData.removeCard(id);
	}
	else {
		basketData.addCard(selectedCard);
	}
});

// Слушатель клика по кнопке удаления карточки в корзине
events.on(AppEvents.BasketDelete, ({id}: {id: string})=> {
	lastSource = 'basket';
	basketData.removeCard(id);
})

// Слушатель сабмита корзины. Открывает форму оплаты.
events.on(AppEvents.BasketOrder, () => {

	// Отрисовываю форму в модальном окне
	modalView.render({ content: orderFormView.render() });
})

// Слушатель нажатия кнопки оплаты наличными
events.on<{ payment: TUserPayment }>(AppEvents.FormOrderCash, (payment) => {
	userData.setPayment(payment.payment)
	orderFormView.render({submitButtonDisable: userData.isOrderDataValid(), error: userData.getError()})
});

// Слушатель нажатия кнопки оплаты онлайн
events.on<{ payment: TUserPayment }>(AppEvents.FormOrderOnline, (payment) => {
	userData.setPayment(payment.payment);
	orderFormView.render({submitButtonDisable: userData.isOrderDataValid(), error: userData.getError()})
})

// Слушатель ввода в поле адреса
events.on<{address: string}>(AppEvents.FormOrderInput, (address) => {
	userData.setAddress(address.address);
	orderFormView.render({submitButtonDisable: userData.isOrderDataValid(), error: userData.getError()})
})

// Слушатель сохранения данных оплаты
events.on<{payment: TUserPayment}>(AppEvents.PaymentSaved, (payment) => {
	if (payment.payment === 'card') {
		orderFormView.activePaymentButton = true;
	}
	else {
		orderFormView.activePaymentButton = false;
	}
})

// Слушатель сабмита формы оплаты
events.on(AppEvents.FormOrderSubmit, () => {

	// Отрисовываю элемент формы в модальном окне
	modalView.render({content: contactsFormView.render({submitButtonDisable: false})});
})

// Слушатель изменения поля email
events.on<{email: string}>(AppEvents.FormContactsInputEmail, (email)=> {
	userData.setEmail(email.email);
	contactsFormView.render({submitButtonDisable: userData.isContactsDataValid()})

})

// Слушатель изменения поля телефон
events.on<{phone: string}>(AppEvents.FormContactsInputPhone, (phone)=> {
	userData.setPhone(phone.phone);
	contactsFormView.render({submitButtonDisable: userData.isContactsDataValid()})
})





