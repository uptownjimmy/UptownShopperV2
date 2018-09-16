import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../../item/item.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddItemsComponent} from '../add-shopping-items/add-shopping-items.component';
import {Subscription} from 'rxjs';
import {ShoppingItemOptionsComponent} from '../shopping-item-options/shopping-item-options.component';
import {StoreService} from '../../../services/store.service';
import {Store} from '../../store/store.model';

@Component({
    selector: 'us-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    protected item_Types = [
        {
            id: 1,
            key_Text: 'Grocery'
        },
        {
            id: 2,
            key_Text: 'Hardware'
        },
        {
            id: 3,
            key_Text: 'Clothing'
        }
    ];
    public items: Item[] = [];
    public shoppingItems: Item[] = [];
    public stores: Store[];
    public selectedStore = 'Filter by Store';

    constructor(
        @Inject('itemService') public itemService,
        private modalService: NgbModal,
        private storeService: StoreService
    ) {
        this.itemService.getItems();
        this.subscription = this.itemService.itemListChanged.subscribe(
            (newItems: Item[]) => {
                this.items = newItems;
                this.shoppingItems = this.items.filter(
                    item => item.active === true
                );
            }
        );
    }

    ngOnInit() {
        this.stores = this.storeService.getStores();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private addOrRemoveItems() {
        setTimeout(() => {
            const modalRef = this.modalService.open(AddItemsComponent, {
                size: 'lg',
                windowClass: 'add-shopping-items-popup'
            });
            modalRef.componentInstance.items = this.items;
            modalRef.componentInstance.shoppingItems = this.shoppingItems;
        });
    }

    private shoppingItemListClick($event, item) {
        setTimeout(() => {
            const modalRef = this.modalService.open(ShoppingItemOptionsComponent);
            modalRef.componentInstance.item = item;

            modalRef.result.then((result) => {
                console.log(result);
            }).catch((error) => {
                console.log(error);
            });
        });
    }

    private filterByStore(storeName) {
        this.shoppingItems = this.shoppingItems.filter(item => item.store === storeName);
    }
}
