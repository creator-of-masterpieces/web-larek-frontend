import { IApi, ICard } from '../../types';

export class AppApi {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	getCards(): Promise<ICard[]> {
		return this._baseApi.get<ICard[]>(`/product`).then((cards: ICard[]) => cards);
	}
}
