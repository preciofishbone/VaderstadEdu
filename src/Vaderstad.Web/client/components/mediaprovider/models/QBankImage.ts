import { WebImage } from '@omnia/fx-models';

export interface MediaItemSearchResult extends WebImage {
    url: string,
    photographer: string,
    encodingFormat: string,
 }