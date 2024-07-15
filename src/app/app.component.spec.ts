import {TestBed, waitForAsync} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BackendService} from "./backend.service";

describe('AppComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [
                {provide: BackendService, useValue: new BackendService()}
            ]

        }).compileComponents();
    }));

    it('should create the app', (() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should render a li tag', (() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('li').textContent).toContain('Author');
    }));
    it('should render title in a router-outlet tag', (() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('router-outlet').textContent).toBeDefined();
    }));
    it('should render title in a app-header tag', (() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('app-header').textContent).toContain('Tasks Progress');
    }));
});
