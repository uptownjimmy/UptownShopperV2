import {Component, EventEmitter, forwardRef, Inject, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'us-item-type-dropdown',
    templateUrl: './item-type-dropdown.component.html',
    styleUrls: ['./item-type-dropdown.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ItemTypeDropdownComponent),
            multi: true
        }
    ]
})
export class ItemTypeDropdownComponent implements OnInit, ControlValueAccessor {
    @Output() selectedItemType: EventEmitter<any> = new EventEmitter<any>();
    public item_Types = [
        {'key_Text': 'Grocery'},
        {'key_Text': 'Hardware'},
        {'key_Text': 'Clothing'}
    ];
    public selectedItemTypeText = '* select an option';
    private propagateChange = (_: any) => {};


    constructor(@Inject('itemService') private itemService) {
    }

    ngOnInit() {}

    private onItemClick(item_Type) {
        // this.selectedItemType.emit(item_Type);
        this.propagateChange(item_Type.key_Text);
        console.log(item_Type.key_Text);
        this.selectedItemTypeText = item_Type.key_Text;
    }

    public writeValue(obj: any) {
        if (obj) {
            this.selectedItemType = obj;
        }
    }

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {
    }
}
