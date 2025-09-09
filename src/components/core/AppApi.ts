import { IApi, ICard} from '../../types';
import { ApiListResponse } from './Api';

export class AppApi {
	private _baseApi: IApi;
	private cdn: string;

	constructor(baseApi: IApi, cdn: string) {
		this._baseApi = baseApi;
		this.cdn = cdn;
	}

	getCards(): Promise<ICard[]> {
		return this._baseApi.get<ApiListResponse<ICard>>(`/product`)
			.then((response) =>
				response.items.map((item)=> ({
					...item,
					image: this.cdn + item.image
				}))
			);
	}
}