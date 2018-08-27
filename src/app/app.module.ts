import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './layouts/admin-layout/components/components.module';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import {AppRoutingModule} from './app.routing';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        PublicLayoutComponent
    ],
    // providers: [AuthGuard, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
