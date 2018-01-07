/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { GatewayuaaTestModule } from '../../../test.module';
import { CustomersComponent } from '../../../../../../main/webapp/app/entities/customers/customers.component';
import { CustomersService } from '../../../../../../main/webapp/app/entities/customers/customers.service';
import { Customers } from '../../../../../../main/webapp/app/entities/customers/customers.model';

describe('Component Tests', () => {

    describe('Customers Management Component', () => {
        let comp: CustomersComponent;
        let fixture: ComponentFixture<CustomersComponent>;
        let service: CustomersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayuaaTestModule],
                declarations: [CustomersComponent],
                providers: [
                    CustomersService
                ]
            })
            .overrideTemplate(CustomersComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomersComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Customers(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.customers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
