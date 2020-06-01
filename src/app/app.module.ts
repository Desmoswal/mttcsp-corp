import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


//Syncfusion
import {MenuModule, ToolbarModule, SidebarModule, TreeViewModule,AccordionModule } from '@syncfusion/ej2-angular-navigations'
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { DashboardLayoutModule, SplitterModule} from '@syncfusion/ej2-angular-layouts'
import { QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder'
import { GridModule, PagerModule, /*ToolbarService,*/ EditService } from '@syncfusion/ej2-angular-grids'
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import {TextBoxModule} from '@syncfusion/ej2-angular-inputs';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule, ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { ChartModule, AccumulationChartModule  } from '@syncfusion/ej2-angular-charts';
import { CategoryService, DataLabelService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
  SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService, LegendService, TooltipService, PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationAnnotationService,
  AccumulationDataLabelService } from '@syncfusion/ej2-angular-charts';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { PdfViewerComponent,PdfViewerModule, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
  NavigationService, AnnotationService, TextSearchService, TextSelectionService, PrintService, ToolbarService
} from '@syncfusion/ej2-angular-pdfviewer';
import { DocumentEditorModule, DocumentEditorContainerModule } from '@syncfusion/ej2-angular-documenteditor';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';
import { LinearGaugeModule } from '@syncfusion/ej2-angular-lineargauge';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';

import { AppComponent } from './app.component';
import { SidebarmenulistComponent } from './sidebar/sidebarmenulist/sidebarmenulist.component';
import { SidebaruserComponent } from './sidebar/sidebaruser/sidebaruser.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { EmployeemanagementComponent } from './admin/employeemanagement/employeemanagement.component';
import { AdminjobsComponent } from './admin/adminjobs/adminjobs.component';
import { AdminstatisticsComponent } from './admin/adminstatistics/adminstatistics.component';
import { FilemanagerComponent } from './filemanager/filemanager.component';
import { WorkspaceComponent } from './employee/workspace/workspace.component';
import { LanguagemanagementComponent } from './admin/languagemanagement/languagemanagement.component';
import { AvailablejobsComponent } from './employee/availablejobs/availablejobs.component';
import { JobhistoryComponent } from './employee/jobhistory/jobhistory.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { AuthInterceptor } from './auth-interceptor';
import { LogoutComponent } from './logout/logout.component';
import { EmployeedashboardComponent } from './employee/employeedashboard/employeedashboard.component';
import { ReviewjobsComponent } from './employee/reviewjobs/reviewjobs.component';
import { TopemployeesComponent } from './admin/statistics/topemployees/topemployees.component';
import { LanguagestatisticsComponent } from './admin/statistics/languagestatistics/languagestatistics.component';
import { JobstatisticsComponent } from './admin/statistics/jobstatistics/jobstatistics.component';
import { ManagementComponent } from './admin/management/management.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, SidebarmenulistComponent, SidebaruserComponent, AdmindashboardComponent, EmployeemanagementComponent, AdminjobsComponent, AdminstatisticsComponent, FilemanagerComponent, WorkspaceComponent, LanguagemanagementComponent, AvailablejobsComponent, JobhistoryComponent, ChatComponent, LoginComponent, ProfileComponent, FieldErrorDisplayComponent, LogoutComponent, EmployeedashboardComponent, ReviewjobsComponent, TopemployeesComponent, LanguagestatisticsComponent, JobstatisticsComponent, ManagementComponent, ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
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
    AccumulationChartModule,
    FileManagerModule,
    SplitterModule,
    PdfViewerModule,
    DocumentEditorModule,
    DocumentEditorContainerModule,
    AccordionModule,
    ChipListModule,
    DialogModule,
    CircularGaugeModule,
    LinearGaugeModule,
    ToastModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, PageService, SortService, FilterService, GroupService, ToolbarService, EditService, LineSeriesService, LegendService, TooltipService, DataLabelService, CategoryService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
    SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService, PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationAnnotationService,
    AccumulationDataLabelService, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
    NavigationService, AnnotationService, TextSearchService, TextSelectionService, PrintService],
  bootstrap: [AppComponent]
})
export class AppModule {}
