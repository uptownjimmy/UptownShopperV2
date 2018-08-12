import {Store} from '../components/store/store.model';

export class StoreService {
    private stores: Store[] = [
        new Store('Kroger', 'Alps Road'),
        new Store('Publix', 'Watkinsville'),
        new Store('Lowe\'s', 'Epps Bridge Road'),
    ];

    getItems() {
        return this.stores.slice();
    }

}
