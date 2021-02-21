import { MutableRefObject, RefObject } from 'react';
export declare function isDocument(obj: any): obj is Document;
export declare function isWindow(obj: any): obj is Window;
export declare function isRefObject<T>(obj: any): obj is RefObject<T> | MutableRefObject<T>;
export declare function isElement(obj: any): obj is HTMLElement;
