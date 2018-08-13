import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../components/admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../components/admin/user-profile/user-profile.component';
import { TableListComponent } from '../../components/admin/table-list/table-list.component';
import { TypographyComponent } from '../../components/admin/typography/typography.component';
import { IconsComponent } from '../../components/admin/icons/icons.component';
import { MapsComponent } from '../../components/admin/maps/maps.component';
import { NotificationsComponent } from '../../components/admin/notifications/notifications.component';
import { UpgradeComponent } from '../../components/admin/upgrade/upgrade.component';

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule, MatCardModule, MatSortModule,
} from '@angular/material';
import {QuizComponent} from '../../components/admin/quiz/quiz.component';
import {AngularFirestore} from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        MatButtonModule,
        MatRippleModule,
        MatInputModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatTableModule,
        MatCardModule,
        MatSortModule
    ],
    declarations: [
        DashboardComponent,
        QuizComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        UpgradeComponent,
    ],
    providers: [
        AngularFirestore,
    ],
})

export class AdminLayoutModule {
}
