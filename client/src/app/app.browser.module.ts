import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserCookiesModule } from './cookies/browser/browser-cookies.module';
@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'app-root' }),
        AppModule,
        BrowserCookiesModule.forRoot()
    ]
})
export class AppBrowserModule { }
