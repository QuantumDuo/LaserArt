export class PagedArray {
    constructor({items, totalCount} = {items: [], totalCount: 0}) {
        this.items = items
        this.totalCount = totalCount
    }
}