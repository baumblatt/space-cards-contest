import {LayoutModule} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
	MatBadgeModule,
	MatButtonModule,
	MatCardModule,
	MatDialogModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatSidenavModule,
	MatSnackBarModule,
	MatTabsModule,
	MatToolbarModule,
} from '@angular/material';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AguardeComponent} from './components/aguarde/aguarde.component';
import {CartaCardComponent} from './components/carta-card/carta-card.component';
import {CartaResultadoCardComponent} from './components/carta-resultado-card/carta-resultado-card.component';
import {CartasGridComponent} from './components/cartas-grid/cartas-grid.component';
import {JogadoresGridComponent} from './components/jogadores-grid/jogadores-grid.component';
import {RodadaDialogComponent} from './components/rodada-dialog/rodada-dialog.component';
import {SalaDialogComponent} from './components/sala-dialog/sala-dialog.component';
import {CartaComponent} from './containers/carta/carta.component';
import {CartasComponent} from './containers/cartas/cartas.component';
import {HomeComponent} from './containers/home/home.component';
import {LayoutComponent} from './containers/layout/layout.component';
import {LoginComponent} from './containers/login/login.component';
import {SalaComponent} from './containers/sala/sala.component';
import {SalasComponent} from './containers/salas/salas.component';

import {CoreRoutingModule} from './core-routing.module';
import {BaralhoEffects} from './store/effects/baralho.effects';
import {CartasEffects} from './store/effects/cartas.effects';
import {LoadingEffect} from './store/effects/loading.effect';
import {SalaEffects} from './store/effects/sala.effects';
import {SnackBarEffect} from './store/effects/snack-bar.effect';
import {UsuarioEffects} from './store/effects/usuario.effects';
import {globalReducer} from './store/reducers/global.reducers';

@NgModule({
	imports: [
		CommonModule,
		CoreRoutingModule,
		LayoutModule,
		MatBadgeModule,
		MatButtonModule,
		MatCardModule,
		MatDialogModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatSnackBarModule,
		MatSidenavModule,
		MatTabsModule,
		MatToolbarModule,
		ReactiveFormsModule,
		StoreModule.forFeature('core', globalReducer),
		EffectsModule.forFeature([BaralhoEffects, CartasEffects, LoadingEffect, SalaEffects, SnackBarEffect, UsuarioEffects]),
	],
	declarations: [
		AguardeComponent,
		CartaCardComponent,
		CartaComponent,
		CartasComponent,
		CartasGridComponent,
		HomeComponent,
		JogadoresGridComponent,
		LayoutComponent,
		LoginComponent,
		RodadaDialogComponent,
		SalaComponent,
		SalaDialogComponent,
		SalasComponent,
		CartaResultadoCardComponent,
	],
	entryComponents: [AguardeComponent, RodadaDialogComponent, SalaDialogComponent]
})
export class CoreModule {

}
