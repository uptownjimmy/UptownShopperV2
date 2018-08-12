import {Component, OnInit, Input, Renderer2, Inject, AfterViewInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Item} from '../item.model';

@Component({
    selector: 'us-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit, AfterViewInit {
    @Input() isNew: boolean;
    @Input() modalTitle: string;
    @Input() item: Item;

    public loading = false;
    public itemDetailForm;
    private name: string = null;
    private item_Type: number = null;
    private active: boolean = null;
    private notes: string = null;

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

    public popoverTitle = 'Delete Confirmation';
    public popoverMessage = 'Are you sure you want to delete this item?';
    public confirmClicked = false;
    public cancelClicked = false;

    constructor(
        public activeModal: NgbActiveModal,
        @Inject('itemService') private itemService,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        if (this.item) {
            this.name = this.item.name;
            this.item_Type = this.item.item_Type;
            this.active = this.item.active;
            this.notes = this.item.notes;
        }

        this.itemDetailForm = new FormGroup({
            'name': new FormControl(this.name, Validators.required),
            'item_Type': new FormControl(this.item_Type, Validators.required),
            'active': new FormControl(this.active),
            'notes': new FormControl(this.notes)
        });
    }

    ngAfterViewInit(): void {
        // prevents the list beneath from scrolling
        setTimeout(() => this.renderer.selectRootElement('#name').focus(), 0);
    }

    private formSubmit() {
        console.log(this.itemDetailForm.value);
        this.loading = true;

        if (this.item) {
            this.item.name = this.itemDetailForm.value.name;
            this.item.item_Type = this.itemDetailForm.value.item_Type;
            this.item.notes = this.itemDetailForm.value.notes;
            this.item.modified_By = 'JMJIII';
            this.itemService.updateExistingItem(this.item);
        } else {
            this.itemService.createNewItem(this.itemDetailForm.value);
        }

        this.activeModal.close();
        this.loading = false;
    }

    private deleteItem() {
        console.log('Deleting item # ' + this.item);
        this.loading = true;
        if (this.item) {
            this.itemService.deleteItem(this.item);
        }
        this.activeModal.close();
        this.loading = false;
    }
}
