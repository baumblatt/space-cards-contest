import {LayoutModule} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
	MatButtonModule,
	MatCardModule,
	MatIconModule,
	MatIconRegistry,
	MatListModule,
	MatSidenavModule,
	MatToolbarModule
} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {HomeComponent} from './container/home/home.component';
import {LayoutComponent} from './container/layout/layout.component';
import {LoginComponent} from './container/login/login.component';
import {SalasComponent} from './container/salas/salas.component';

import {CoreRoutingModule} from './core-routing.module';
import {CartasEffects} from './store/effects/cartas.effects';
import {UsuarioEffects} from './store/effects/usuario.effects';
import {globalReducer} from './store/reducers/global.reducers';
import { CartaComponent } from './container/carta/carta.component';

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
		EffectsModule.forFeature([CartasEffects, UsuarioEffects]),
	],
	declarations: [LayoutComponent, LoginComponent, HomeComponent, SalasComponent, CartaComponent]
})
export class CoreModule {
	constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
		this.iconRegistry.addSvgIcon('astronaut',
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icones/astronaut.svg'));
		this.iconRegistry.addSvgIcon('moon',
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icones/moon.svg'));
		this.iconRegistry.addSvgIcon('spaceship',
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icones/spaceship.svg'));
		this.iconRegistry.addSvgIcon('telescope',
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/icones/telescope.svg'));
	}
}
