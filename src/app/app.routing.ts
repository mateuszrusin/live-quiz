import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import {AuthGuard} from './services/auth.guard';
import {PublicGuard} from './services/public.guard';

const routes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        canActivate: [PublicGuard],
        children: [
            {
                path: '',
                loadChildren: './layouts/public-layout/public-layout.module#PublicLayoutModule'
            }
        ],
    }, {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
            }]
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, { enableTracing: true })
    ],
    exports: [],
})
export class AppRoutingModule {
}
