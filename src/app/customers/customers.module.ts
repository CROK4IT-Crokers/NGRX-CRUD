import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule, Actions } from '@ngrx/effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CustomerComponent } from './customer/customer.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

import { StoreModule } from '@ngrx/store';

import { customerReducer } from './state/customer.reducer';
import { CustomerEffect } from './state/customer.effect';

const customerRoutes: Routes = [{ path: '', component: CustomerComponent }];

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(customerRoutes),
    StoreModule.forFeature('customers', customerReducer),
    EffectsModule.forFeature([CustomerEffect]),
  ],
})
export class CustomersModule {}
