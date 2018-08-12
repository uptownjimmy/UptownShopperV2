/**
 * Created by uptownjimmy on 7/10/17.
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';

import {NavbarComponent} from './navbar.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        RouterModule],
    declarations: [NavbarComponent],
    exports: [NavbarComponent],
    providers: []
})

export class NavbarModule {}
