import {Component, OnInit} from '@angular/core';
import {Store} from '../store.model';
import {StoreService} from '../../../services/store.service';

@Component({
    selector: 'us-store-list',
    templateUrl: './store-list.component.html',
    styleUrls: ['./store-list.component.css'],
    providers: [
        StoreService
    ]
})
export class StoreListComponent implements OnInit {
    public stores: Store[];

    constructor(private storeService: StoreService) {
    }

    ngOnInit() {
        this.stores = this.storeService.getStores();
    }
}
