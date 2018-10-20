import {LayoutModule} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {LayoutComponent} from './container/layout/layout.component';
import {LoginComponent} from './container/login/login.component';

import {CoreRoutingModule} from './core-routing.module';
import {UsuarioEffects} from './store/effects/usuario.effects';
import {globalReducer} from './store/reducers/global.reducers';

@NgModule({
	imports: [
		CommonModule,
		CoreRoutingModule,
		LayoutModule,
		MatCardModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		StoreModule.forFeature('core', globalReducer),
		EffectsModule.forFeature([UsuarioEffects]),
	],
	declarations: [LayoutComponent, LoginComponent]
})
export class CoreModule {
}
