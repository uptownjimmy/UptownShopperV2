import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../../item/item.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddItemsComponent} from '../add-shopping-items/add-shopping-items.component';
import {Subscription} from 'rxjs';
import {ItemDetailComponent} from '../../item/item-detail/item-detail.component';

@Component({
    selector: 'us-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    public items: Item[] = [];
    public shoppingItems: Item[] = [];

    constructor(
        @Inject('itemService') public itemService,
        private modalService: NgbModal
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

    ngOnInit() {}

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

    }
}
