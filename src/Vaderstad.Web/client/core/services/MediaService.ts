import { InstanceLifetimes, IHttpApiOperationResult } from '@omnia/fx-models';
import { Injectable, HttpClientConstructor, HttpClient, Inject } from '@omnia/fx';
import { MediaItemSearchResult } from '../../components/mediaprovider/models/QBankImage';


@Injectable({ lifetime: InstanceLifetimes.Transient })
export class MediaService {

    @Inject<HttpClientConstructor>(HttpClient, {
        configPromise: HttpClient.createOmniaServiceRequestConfig("68b27de3-9026-4dea-9708-fbd642642b63")
    }) protected httpClient: HttpClient;

    constructor() {
    }

    async search(query: string) {
        return new Promise<Array<MediaItemSearchResult>>((resolve, reject) => {
            this.httpClient.get<IHttpApiOperationResult<Array<MediaItemSearchResult>>>(`/api/media?query=${query}`).then(result => {
                if (result.data.success) {
                    resolve(result.data.data);
                }
                else
                    reject();
            }).catch(reject);
        })

    };



}