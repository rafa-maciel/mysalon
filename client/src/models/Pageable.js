export default class Pageable{
    constructor(pageNumber, pageSize, totalElements, totalPages, numberOfElements, first, last, number, size, empty) {
        this._pageNumber = pageNumber;
        this._pageSize = pageSize;
        this._totalElements = totalElements;
        this._totalPages = totalPages;
        this._numberOfElements = numberOfElements;
        this._first = first;
        this._last = last;
        this._number = number;
        this._size = size;
        this._empty = empty;
    }

    get pageNumber() {
        return this._pageNumber;
    }

    get pageSize() {
        return this._pageSize;
    }
    get totalElements() {
        return this._totalElements;
    }
    get totalPages() {
        return this._totalPages;
    }
    get numberOfElements() {
        return this._numberOfElements;
    }
    get first() {
        return this._first;
    }
    get last() {
        return this._last;
    }
    get number() {
        return this._number;
    }
    get size() {
        return this._size;
    }
    get empty() {
        return this._empty;
    }
    
    get paged() {
        return this._totalPages > 1;
    }
}