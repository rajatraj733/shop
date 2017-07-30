import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';


const app_routes: Routes = [
    //{path: 'home', loadChildren: './home/home.module#HomeModule' },
    {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(app_routes)
    ],
    exports: [
        RouterModule
    ]
}) export class AppRoutes {}



