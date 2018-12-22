export interface CategoryResponse {
    id: number;
    name: string;
    supercategory: {
        id: number;
        name: string;
    }
}
