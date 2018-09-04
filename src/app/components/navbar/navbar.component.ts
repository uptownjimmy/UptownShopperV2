import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'us-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public title: string;
    private mobile: boolean;
    public isNavbarCollapsed = true;

    constructor(private router: Router) {}

    ngOnInit() {
        if (window.screen.width >= 1024 && window.screen.height >= 768) {
            this.mobile = false;
            this.title = 'Uptown Shopper';
        } else {
            this.mobile = true;
            this.title = 'Shopping';
            this.setTitle(this.title);
        }

        this.router.navigate(['/shopping']);
    }

    linkClicked(linkName) {
        if (this.mobile) {
            this.setTitle(linkName);
        }
    }

    setTitle(linkName) {
        this.title = linkName;
    }
}
