export class Category {
    user_id: string | null;
    category_name: string | null;
    category_primary_color: string;
    category_secondary_color: string;
    constructor(
        user_id: string | null,
        category_name: string | null,
        category_primary_color: string,
        category_secondary_color: string,
    ) {
        this.user_id = user_id;
        this.category_name = category_name;
        this.category_primary_color = category_primary_color;
        this.category_secondary_color = category_secondary_color;
    }
}