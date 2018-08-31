import { Routes } from '@angular/router';

import { DashboardComponent } from '../../components/admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../components/admin/user-profile/user-profile.component';
import { TableListComponent } from '../../components/admin/table-list/table-list.component';
import { TypographyComponent } from '../../components/admin/typography/typography.component';
import { IconsComponent } from '../../components/admin/icons/icons.component';
import { MapsComponent } from '../../components/admin/maps/maps.component';
import { NotificationsComponent } from '../../components/admin/notifications/notifications.component';
import { UpgradeComponent } from '../../components/admin/upgrade/upgrade.component';
import { QuizzesComponent } from '../../components/admin/quizzes/quizzes.component';
import {QuizComponent} from '../../components/admin/quiz/quiz.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'quizzes',        component: QuizzesComponent },
    { path: 'quiz/:id',       component: QuizComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: '',               redirectTo: 'quizzes', pathMatch: 'full' }
];
