import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './container/layout/layout.component';
import {LoginComponent} from './container/login/login.component';

const routes: Routes = [
	{path: 'login', component: LoginComponent},
	{path: '', component: LayoutComponent}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CoreRoutingModule {
}
