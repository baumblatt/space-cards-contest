import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import localeBRExtra from '@angular/common/locales/extra/pt';
import localeBR from '@angular/common/locales/pt';
import {LOCALE_ID, NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
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
		HttpClientModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFireFunctionsModule,
		AngularFirestoreModule,
		StoreModule.forRoot(globalReducer, {metaReducers}),
		EffectsModule.forRoot([AppEffects]),
		StoreDevtoolsModule.instrument({name: 'Space Card Contest', logOnly: environment.production}),
		ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
	],
	providers: [{provide: LOCALE_ID, useValue: 'pt'}],
	bootstrap: [AppComponent]
})
export class AppModule {
}
