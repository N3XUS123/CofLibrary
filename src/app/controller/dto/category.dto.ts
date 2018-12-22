export class CategoryDto {

    name: string;
    superCategoryId: number;

    constructor(n: string, s: number) {
        this.name = n;
        this.superCategoryId = s;
    }
}
