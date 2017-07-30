import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';



@Component({
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css']
}) export class PersonComponent implements OnInit, OnDestroy{
    twoScreen: boolean = true;
    private urlEventChangeSub: Subscription;

    constructor(
        // private route: ActivatedRoute,
        private router: Router
    ) {
        let url = router.url;
        this.changeTwoScreenValue(url);
    }

    ngOnInit() {
        this.urlEventChangeSub = this.router.events.subscribe(data =>{
            // console.log(this.route);
            if(data instanceof NavigationEnd) {
                console.log(data);
                this.changeTwoScreenValue(data.url);
            }
        });
    }
    ngOnDestroy() {
        this.urlEventChangeSub.unsubscribe();
    }
    changeTwoScreenValue(url: String) {
        console.log(url.lastIndexOf('/home/person'));
        
        if(url.endsWith('/home/person')) {
            
            this.twoScreen = false;
        } else {
            this.twoScreen = true;
        }

    }


}