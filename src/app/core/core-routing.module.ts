import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './container/layout/layout.component';
import {LoginComponent} from './container/login/login.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
	{path: '', pathMatch: 'full', redirectTo: 'game'},
	{path: 'game', canActivate: [AuthGuard], component: LayoutComponent},
	{path: 'login', component: LoginComponent}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CoreRoutingModule {
}
