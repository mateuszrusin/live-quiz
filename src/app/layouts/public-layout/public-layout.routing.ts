import { Routes } from '@angular/router';

import { PublicComponent } from '../../components/public/public/public.component';
import {LoginComponent} from '../../components/public/login/login.component';
import {LogoutComponent} from '../../components/public/logout/logout.component';
import {QuizComponent} from '../../components/public/quiz/quiz.component';

export const PublicLayoutRoutes: Routes = [
    { path: '',      component: PublicComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent},
    { path: 'quiz/:id',       component: QuizComponent },
];
