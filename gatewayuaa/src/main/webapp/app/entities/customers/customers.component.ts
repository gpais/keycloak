import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Customers } from './customers.model';
import { CustomersService } from './customers.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-customers',
    templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit, OnDestroy {
customers: Customers[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private customersService: CustomersService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.customersService.query().subscribe(
            (res: ResponseWrapper) => {
                this.customers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCustomers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Customers) {
        return item.id;
    }
    registerChangeInCustomers() {
        this.eventSubscriber = this.eventManager.subscribe('customersListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
