import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
//import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

//TrulyUI
import { CoreModule, InputModule, ButtonModule, MenuModule, SidebarModule, IconsModule, ToolbarModule, AvatarModule, BadgeModule, PopupMenuModule } from 'truly-ui';



// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { JobsComponent } from './admin/jobs/jobs.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { StatisticsComponent } from './admin/statistics/statistics.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, HeaderComponent, DashboardComponent, JobsComponent, EmployeesComponent, StatisticsComponent],
  imports: [
    CoreModule.forRoot({theme: 'default'}),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    //CoreModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    //TrulyUI
    InputModule,
    ButtonModule,
    MenuModule,
    SidebarModule,
    IconsModule,
    ToolbarModule,
    AvatarModule,
    BadgeModule,
    PopupMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
