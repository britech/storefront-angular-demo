import { Utils } from "../utils/utils";
import { Product } from "./product"

export class CartItem {
    id: number = 0
    product?: Product = {} as Product
    quantity: number = 0

    getTotalPrice() : number {
        return this.product?.price == undefined ? 0 : (this.product.price * this.quantity);
    }

    getDisplayPrice(): string {
        return Utils.round(this.getTotalPrice());
    }
}
