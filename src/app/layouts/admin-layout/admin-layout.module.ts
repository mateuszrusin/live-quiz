import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../components/admin/dashboard/dashboard.component';
import {UserProfileComponent} from '../../components/admin/user-profile/user-profile.component';
import {TableListComponent} from '../../components/admin/table-list/table-list.component';
import {TypographyComponent} from '../../components/admin/typography/typography.component';
import {IconsComponent} from '../../components/admin/icons/icons.component';
import {MapsComponent} from '../../components/admin/maps/maps.component';
import {NotificationsComponent} from '../../components/admin/notifications/notifications.component';
import {UpgradeComponent} from '../../components/admin/upgrade/upgrade.component';

import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule, MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatPaginatorModule, MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
} from '@angular/material';
import {QuizzesComponent} from '../../components/admin/quizzes/quizzes.component';
import {QuizComponent} from '../../components/admin/quiz/quiz.component';
import {MomentModule} from 'angular2-moment';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        ReactiveFormsModule,
        FormsModule,
        MomentModule,
        MatButtonModule,
        MatRippleModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatTableModule,
        MatCardModule,
        MatSortModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDialogModule,
    ],
    declarations: [
        DashboardComponent,
        QuizzesComponent,
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
    ],
})

export class AdminLayoutModule {
}
