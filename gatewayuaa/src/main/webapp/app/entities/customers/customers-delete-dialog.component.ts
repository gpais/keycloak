import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Customers } from './customers.model';
import { CustomersPopupService } from './customers-popup.service';
import { CustomersService } from './customers.service';

@Component({
    selector: 'jhi-customers-delete-dialog',
    templateUrl: './customers-delete-dialog.component.html'
})
export class CustomersDeleteDialogComponent {

    customers: Customers;

    constructor(
        private customersService: CustomersService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customersService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'customersListModification',
                content: 'Deleted an customers'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customers-delete-popup',
    template: ''
})
export class CustomersDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customersPopupService: CustomersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.customersPopupService
                .open(CustomersDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
