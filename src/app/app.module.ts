import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {LoadingModule, ANIMATION_TYPES} from 'ngx-loading';
import {ToastrModule} from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';

import {NavbarModule} from './components/navbar/navbar.module';
import {AppComponent} from './app.component';
import {ItemListComponent} from './components/item/item-list/item-list.component';
import {ItemDetailComponent} from './components/item/item-detail/item-detail.component';
import {StoreListComponent} from './components/store/store-list/store-list.component';
import {StoreDetailComponent} from './components/store/store-detail/store-detail.component';
import {ShoppingListComponent} from './components/shopping/shopping-list/shopping-list.component';
import {AddItemsComponent} from './components/shopping/add-shopping-items/add-shopping-items.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ItemTypeDropdownComponent} from './components/item/item-type-dropdown/item-type-dropdown.component';

import {ItemService} from './services/item.service';
import {ShoppingService} from './services/shopping.service';
import {ServicesModule} from './services/services.module';


@NgModule({
    declarations: [
        AppComponent,
        ItemListComponent,
        ItemDetailComponent,
        StoreListComponent,
        StoreDetailComponent,
        ShoppingListComponent,
        AddItemsComponent,
        ItemTypeDropdownComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot([
            {
                path: 'shopping',
                component: ShoppingListComponent
            },
            {
                path: 'items',
                component: ItemListComponent
            },
            {
                path: 'stores',
                component: StoreListComponent
            }
        ]),
        NgbModule.forRoot(),
        AngularFontAwesomeModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'outline-danger',
            cancelButtonType: 'outline-secondary'
        }),
        LoadingModule.forRoot({
            animationType: ANIMATION_TYPES.threeBounce,
            backdropBackgroundColour: 'rgba(0,0,0,0.1)',
            backdropBorderRadius: '4px',
            primaryColour: '#ffffff',
            secondaryColour: '#ffffff',
            tertiaryColour: '#ffffff'
        }),
        CommonModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-center',
            preventDuplicates: true
        }),
        NavbarModule,
        ServicesModule.forRoot()
    ],
    providers: [
        {provide: 'itemService', useClass: ItemService},
        {provide: 'shoppingService', useClass: ShoppingService},
        {provide: 'itemURL', useValue: 'http://localhost:5000/api/item'}
    ],
    entryComponents: [
        ItemDetailComponent,
        AddItemsComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
