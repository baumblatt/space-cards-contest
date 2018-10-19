import {registerLocaleData} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import localeBRExtra from '@angular/common/locales/extra/pt';
import localeBR from '@angular/common/locales/pt';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './store/effects/app.effects';
import {globalReducer, metaReducers} from './store/reducers/global.reducer';

registerLocaleData(localeBR, 'pt', localeBRExtra);

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		StoreModule.forRoot(globalReducer, {metaReducers}),
		EffectsModule.forRoot([AppEffects])
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
