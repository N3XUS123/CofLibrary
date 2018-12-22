export class BookCreateDto {

    title: string;
    autor: string;
    anyo: number;
    content: string;
    typeId: number;
    categoryId: number;

    constructor(t, a, an, c, typ, cat) {
        this.title = t;
        this.autor = a;
        this.anyo = an;
        this.content = c;
        this.typeId = typ;
        this.categoryId = cat;
    }

}
