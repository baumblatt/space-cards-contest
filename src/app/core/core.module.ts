import {LayoutModule} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
	MatButtonModule,
	MatCardModule,
	MatGridListModule,
	MatIconModule,
	MatListModule,
	MatSidenavModule,
	MatSnackBarModule,
	MatTabsModule,
	MatToolbarModule,
} from '@angular/material';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {CartaCardComponent} from './components/carta-card/carta-card.component';
import {CartasGridComponent} from './components/cartas-grid/cartas-grid.component';
import {JogadoresGridComponent} from './components/jogadores-grid/jogadores-grid.component';
import {CartaComponent} from './containers/carta/carta.component';
import {CartasComponent} from './containers/cartas/cartas.component';
import {HomeComponent} from './containers/home/home.component';
import {LayoutComponent} from './containers/layout/layout.component';
import {LoginComponent} from './containers/login/login.component';
import {SalaComponent} from './containers/sala/sala.component';
import {SalasComponent} from './containers/salas/salas.component';

import {CoreRoutingModule} from './core-routing.module';
import {CartasEffects} from './store/effects/cartas.effects';
import {SalaEffects} from './store/effects/sala.effects';
import {SnackBarEffect} from './store/effects/snack-bar.effect';
import {UsuarioEffects} from './store/effects/usuario.effects';
import {globalReducer} from './store/reducers/global.reducers';

@NgModule({
	imports: [
		CommonModule,
		CoreRoutingModule,
		LayoutModule,
		MatButtonModule,
		MatCardModule,
		MatGridListModule,
		MatIconModule,
		MatListModule,
		MatSnackBarModule,
		MatSidenavModule,
		MatTabsModule,
		MatToolbarModule,
		StoreModule.forFeature('core', globalReducer),
		EffectsModule.forFeature([CartasEffects, SalaEffects, SnackBarEffect, UsuarioEffects]),
	],
	declarations: [
		CartaCardComponent,
		CartaComponent,
		CartasComponent,
		CartasGridComponent,
		HomeComponent,
		JogadoresGridComponent,
		LayoutComponent,
		LoginComponent,
		SalaComponent,
		SalasComponent,
	],
})
export class CoreModule {

}
