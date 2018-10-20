import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {LayoutComponent} from './container/layout/layout.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule} from '@angular/material';
import {LoginComponent} from './container/login/login.component';

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
		MatListModule
	],
	declarations: [LayoutComponent, LoginComponent]
})
export class CoreModule {
}
