import {Item} from '../components/item/item.model';
import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Injectable, Inject} from '@angular/core';

@Injectable()
export class ItemService {
    private getURL;
    public items: Item[] = [];
    public itemListChanged = new Subject<Item[]>();
    private loading = false;

    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        @Inject('api') private api
    ) {
        this.getURL = api + 'item';
    }

    public getItems(refresh: boolean = false) {
        this.loading = true;
        this.http.get<Item[]>(this.getURL).subscribe(
            response => {
                this.items = response;
                this.itemListChanged.next(this.items.slice());
                this.loading = false;
                console.log('ItemService.getItems(): Item list retrieved.');
            },
            (err: HttpErrorResponse) => {
                if (err.error) {
                    console.log('Client error occurred in ItemService.getItems(): ', err.error.message);
                    this.loading = false;
                } else {
                    this.loading = false;
                    console.log(
                        'API error occurred in ItemService.getItems(): ' + err.status
                    );
                }
            }
        );
    }

    public getItemsSnapshot() {
        return this.http.get(this.getURL).pipe(map(
            response => response
            , (err: HttpErrorResponse) => {
                if (err.error) {
                    console.log('Client error occurred in ItemService.getItemsSnapshot(): ', err.error.message);
                } else {
                    console.log(
                        'API error occurred in ItemService.getItemsSnapshot(): ' + err.status
                    );
                }
            }
        ));
    }

    public createNewItem(formValues: Item) {
        const item = {
            name: formValues.name,
            item_Type: formValues.item_Type,
            active: true, // formValues.active;  need to add checkbox for this
            notes: formValues.notes,
            created_By: 'JMJIII' // formValues.created_By; need to add logged-in user for this
        };

        if (!this.items.find((i) => i.name === item.name)) {
            this.loading = true;
            this.http.post('http://localhost:5000/api/item', item).subscribe(
                response => {
                    this.getItems();
                    this.toastr.success('New item created.', 'Success!');
                    console.log('New item created: ' + response);
                },
                (err: HttpErrorResponse) => {
                    if (err.error) {
                        this.loading = false;
                        console.log('Client error occurred in ItemService.createNewItem(): ', err.error.message);
                    } else {
                        this.loading = false;
                        console.log(
                            'API error occurred in ItemService.createNewItem(): ' + err.status + ', ' + err.error
                        );
                    }

                    this.toastr.error(item.name + ' could not be created.', 'No good!');
                }
            );
        } else {
            this.toastr.error('"' + item.name + '"' + ' already exists.', 'No good!');
        }
    }

    public updateExistingItem(item: Item) {
        this.loading = true;
        this.http.put('http://localhost:5000/api/item/' + item.id, item).subscribe(
            response => {
                this.loading = false;
                this.itemListChanged.next(this.items.slice());
                this.toastr.success('Item updated.', 'Success!');
                console.log('Existing item updated: ' + item.name);
            },
            (err: HttpErrorResponse) => {
                if (err.error) {
                    this.loading = false;
                    console.log('Client error occurred in ItemService.updateExistingItem(): ', err.error.message);
                } else {
                    this.loading = false;
                    console.log(
                        'API error occurred in ItemService.updateExistingItem(): ' + err.status + ', ' + err.error
                    );
                }

                this.toastr.error(item.name + ' could not be updated.', 'No good!');
            }
        );
    }

    public deleteItem(item: Item) {
        this.loading = true;
        this.http.delete('http://localhost:5000/api/item/' + item.id).subscribe(
            response => {
                const index: number = this.items.indexOf(item);
                if (index !== -1) {
                    this.items.splice(index, 1);
                }
                this.itemListChanged.next(this.items.slice());
                this.loading = false;
                this.toastr.success('Item deleted.', 'Success!');
                console.log('Item deleted: ' + item.name);
            },
            (err: HttpErrorResponse) => {
                if (err.error) {
                    console.log('Client error occurred in ItemService.deleteItem(): ', err.error.message);
                    this.loading = false;
                } else {
                    this.loading = false;
                    console.log(
                        'API error occurred in ItemService.deleteItem(): ' + err.status + ', ' + err.error
                    );
                }

                this.toastr.error(item.name + ' could not be deleted.', 'No good!');
            }
        );
    }
}
