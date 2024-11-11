import { CartItem } from "./cart-item";

export class Cart {
    items: CartItem[] = [];

    getItemCount() {
        let total = 0;
        this.items.forEach(e => total += e.quantity);
        return total;
    }

    getSubtotal() {
        let total = 0;
        this.items.forEach(e => total += e.getTotalPrice());
        return total;
    }

    getTotalPrice() {
        let total = 0;
        this.items.forEach(e => total += e.getTotalPrice());
        return total;
    }
}
