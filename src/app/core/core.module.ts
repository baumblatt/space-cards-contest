import {LayoutModule} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
	MatButtonModule,
	MatCardModule,
	MatGridListModule,
	MatIconModule,
	MatIconRegistry,
	MatListModule,
	MatSidenavModule,
	MatTabsModule,
	MatToolbarModule,
} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {CartasGridComponent} from './components/cartas-grid/cartas-grid.component';
import {CartaComponent} from './container/carta/carta.component';
import {CartasComponent} from './container/cartas/cartas.component';
import {HomeComponent} from './container/home/home.component';
import {LayoutComponent} from './container/layout/layout.component';
import {LoginComponent} from './container/login/login.component';
import {SalasComponent} from './container/salas/salas.component';

import {CoreRoutingModule} from './core-routing.module';
import {CartasEffects} from './store/effects/cartas.effects';
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
		MatSidenavModule,
		MatTabsModule,
		MatToolbarModule,
		StoreModule.forFeature('core', globalReducer),
		EffectsModule.forFeature([CartasEffects, UsuarioEffects]),
	],
	declarations: [LayoutComponent, LoginComponent, HomeComponent, SalasComponent, CartaComponent, CartasComponent, CartasGridComponent]
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
