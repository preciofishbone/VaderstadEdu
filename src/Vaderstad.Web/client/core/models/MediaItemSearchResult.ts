import { WebImage } from '@omnia/fx-models';

export interface MediaItemSearchResult extends WebImage {
    url: string,
    fullUrl: string,
    photographer: string,
    encodingFormat: string,
}