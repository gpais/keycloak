import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayuaaSharedModule } from '../../shared';
import {
    CustomersService,
    CustomersPopupService,
    CustomersComponent,
    CustomersDetailComponent,
    CustomersDialogComponent,
    CustomersPopupComponent,
    CustomersDeletePopupComponent,
    CustomersDeleteDialogComponent,
    customersRoute,
    customersPopupRoute,
} from './';

const ENTITY_STATES = [
    ...customersRoute,
    ...customersPopupRoute,
];

@NgModule({
    imports: [
        GatewayuaaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomersComponent,
        CustomersDetailComponent,
        CustomersDialogComponent,
        CustomersDeleteDialogComponent,
        CustomersPopupComponent,
        CustomersDeletePopupComponent,
    ],
    entryComponents: [
        CustomersComponent,
        CustomersDialogComponent,
        CustomersPopupComponent,
        CustomersDeleteDialogComponent,
        CustomersDeletePopupComponent,
    ],
    providers: [
        CustomersService,
        CustomersPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayuaaCustomersModule {}
