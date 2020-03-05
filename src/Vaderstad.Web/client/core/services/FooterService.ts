﻿import { InstanceLifetimes, IHttpApiOperationResult } from '@omnia/fx-models';
import { Injectable, HttpClientConstructor, HttpClient, Inject } from '@omnia/fx';


@Injectable({ lifetime: InstanceLifetimes.Transient })
export class SocialService {

    @Inject<HttpClientConstructor>(HttpClient, {
        configPromise: HttpClient.createOmniaServiceRequestConfig("68b27de3-9026-4dea-9708-fbd642642b63")
    }) protected httpClient: HttpClient;

    constructor() {
    }

    getFooter = (topicId: string) => {

        return new Promise<any>((resolve, reject) => {
            this.httpClient.get<IHttpApiOperationResult<any>>(`/api/footer`).then(result => {
                if (result.data.success) {
                    resolve(result.data.data);
                }
                else
                    reject();
            }).catch(reject);
        })

    };


}