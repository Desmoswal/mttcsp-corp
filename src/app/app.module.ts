import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';

//Syncfusion
import {MenuModule, ToolbarModule, SidebarModule, TreeViewModule} from '@syncfusion/ej2-angular-navigations'
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { DashboardLayoutModule} from '@syncfusion/ej2-angular-layouts'
import { QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder'
import { GridModule, PagerModule, ToolbarService, EditService } from '@syncfusion/ej2-angular-grids'
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import {TextBoxModule} from '@syncfusion/ej2-angular-inputs';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ChartModule, AccumulationChartModule  } from '@syncfusion/ej2-angular-charts';
import { CategoryService, DataLabelService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
  SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService, LegendService, TooltipService, PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationAnnotationService,
  AccumulationDataLabelService } from '@syncfusion/ej2-angular-charts';

import { AppComponent } from './app.component';
import { SidebarmenulistComponent } from './sidebar/sidebarmenulist/sidebarmenulist.component';
import { SidebaruserComponent } from './sidebar/sidebaruser/sidebaruser.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { EmployeemanagementComponent } from './admin/employeemanagement/employeemanagement.component';
import { AdminjobsComponent } from './admin/adminjobs/adminjobs.component';
import { AdminstatisticsComponent } from './admin/adminstatistics/adminstatistics.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, SidebarmenulistComponent, SidebaruserComponent, AdmindashboardComponent, EmployeemanagementComponent, AdminjobsComponent, AdminstatisticsComponent,],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
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
    MenuModule,
    ToolbarModule,
    SidebarModule,
    TreeViewModule,
    ListViewModule,
    DashboardLayoutModule,
    QueryBuilderModule,
    GridModule,
    TextBoxModule,
    NumericTextBoxModule,
    DropDownListModule,
    ButtonModule,
    PagerModule,
    ChartModule,
    AccumulationChartModule
  ],
  providers: [PageService, SortService, FilterService, GroupService, ToolbarService, EditService, LineSeriesService, LegendService, TooltipService, DataLabelService, CategoryService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
    SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService, PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationAnnotationService,
    AccumulationDataLabelService],
  bootstrap: [AppComponent]
})
export class AppModule {}
