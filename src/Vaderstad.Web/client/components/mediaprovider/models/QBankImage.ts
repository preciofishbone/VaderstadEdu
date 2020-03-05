import { WebImage } from '@omnia/fx-models';

export interface QBankImage extends WebImage {
    url: string,
    fullUrl:string,
    photographer: string,
    encodingFormat: string,
 }