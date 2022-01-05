import { DataPipe } from './utils/date.pipe';
import { AppService } from './app.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { NgbDateParserFormatter, NgbTimepickerModule, NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import icons from './utils/icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderComponent } from './components/loader/loader.component';
import { DateFormat } from './utils/date.format';
import { DataHoraPipe } from './utils/date.time.pipe';

@NgModule({
    declarations: [AppComponent, HeaderComponent, HomeComponent, TaskModalComponent, DataPipe, LoaderComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        NgbTimepickerModule,
        NgbModule,
        NgbCollapseModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FontAwesomeModule,
        ToastrModule.forRoot({
            timeOut: 4000,
            positionClass: 'toast-bottom-right'
        })
    ],
    providers: [AppService, DataPipe, ToastrService, { provide: NgbDateParserFormatter, useClass: DateFormat }],
    bootstrap: [AppComponent],
    exports: [DataPipe]
})
export class AppModule {
    constructor(iconLibrary: FaIconLibrary) {
        icons.forEach((i) => iconLibrary.addIcons(i));
    }
}
