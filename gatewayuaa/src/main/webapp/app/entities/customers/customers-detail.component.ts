import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Customers } from './customers.model';
import { CustomersService } from './customers.service';

@Component({
    selector: 'jhi-customers-detail',
    templateUrl: './customers-detail.component.html'
})
export class CustomersDetailComponent implements OnInit, OnDestroy {

    customers: Customers;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private customersService: CustomersService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCustomers();
    }

    load(id) {
        this.customersService.find(id).subscribe((customers) => {
            this.customers = customers;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCustomers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'customersListModification',
            (response) => this.load(this.customers.id)
        );
    }
}
