import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CartaComponent} from './containers/carta/carta.component';
import {CartasComponent} from './containers/cartas/cartas.component';
import {HomeComponent} from './containers/home/home.component';
import {LayoutComponent} from './containers/layout/layout.component';
import {LoginComponent} from './containers/login/login.component';
import {SalasComponent} from './containers/salas/salas.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
	{path: '', pathMatch: 'full', redirectTo: 'game'},
	{
		path: 'game', canActivate: [AuthGuard], component: LayoutComponent, children: [
			{path: '', pathMatch: 'full', redirectTo: 'salas'},
			{path: 'salas', component: SalasComponent},
			{path: 'home', component: HomeComponent},
			{path: 'cartas', component: CartasComponent},
			{path: 'carta/:id', component: CartaComponent},
		]
	},
	{path: 'login', component: LoginComponent}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CoreRoutingModule {
}
