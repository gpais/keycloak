/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { GatewayuaaTestModule } from '../../../test.module';
import { CustomersDetailComponent } from '../../../../../../main/webapp/app/entities/customers/customers-detail.component';
import { CustomersService } from '../../../../../../main/webapp/app/entities/customers/customers.service';
import { Customers } from '../../../../../../main/webapp/app/entities/customers/customers.model';

describe('Component Tests', () => {

    describe('Customers Management Detail Component', () => {
        let comp: CustomersDetailComponent;
        let fixture: ComponentFixture<CustomersDetailComponent>;
        let service: CustomersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayuaaTestModule],
                declarations: [CustomersDetailComponent],
                providers: [
                    CustomersService
                ]
            })
            .overrideTemplate(CustomersDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomersDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Customers(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.customers).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
