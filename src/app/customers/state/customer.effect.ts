import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { CustomerService } from '../customer.service';
import * as customerActions from '../state/customer.actions';
import { Customer } from '../customer.model';

@Injectable()
export class CustomerEffect {
  constructor(
    // Inject the actions from the store so that we can listen to them
    private action$: Actions,
    private customerService: CustomerService
  ) {}

  // Register the effect using the @Effect decorator
  loadCustomers$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType<customerActions.LoadCustomers>(
        customerActions.CustomerActionTypes.LOAD_CUSTOMERS
      ),
      mergeMap((actions: customerActions.LoadCustomers) =>
        this.customerService.getCustomers().pipe(
          map(
            (customers: Customer[]) =>
              new customerActions.LoadCustomersSuccess(customers)
          ),
          catchError((err) => of(new customerActions.LoadCustomersFail(err)))
        )
      )
    )
  );

  // @Effect()
  //   loadCustomers$: Observable<Action> = this.action$.pipe(
  //     ofType<customerActions.LoadCustomers>(
  //       customerActions.CustomerActionTypes.LOAD_CUSTOMERS
  //     ),
  //     mergeMap((actions: customerActions.LoadCustomers) =>
  //       this.customerService.getCustomers().pipe(
  //         map(
  //           (customers: Customer[]) =>
  //             new customerActions.LoadCustomersSuccess(customers)
  //         ),
  //         catchError((err) => of(new customerActions.LoadCustomersFail(err)))
  //       )
  //     )
  //   );

  // Get Customer By ID
  loadCustomer$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType<customerActions.LoadCustomer>(
        customerActions.CustomerActionTypes.LOAD_CUSTOMER
      ),
      mergeMap((action: customerActions.LoadCustomer) =>
        this.customerService.getCustomerById(action.payload).pipe(
          map(
            (customer: Customer) =>
              new customerActions.LoadCustomerSuccess(customer)
          ),
          catchError((err) => of(new customerActions.LoadCustomerFail(err)))
        )
      )
    )
  );

  // Create Customer Effect
  createCustomer$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType<customerActions.CreateCustomer>(
        customerActions.CustomerActionTypes.CREATE_CUSTOMER
      ),
      map((action: customerActions.CreateCustomer) => action.payload),
      mergeMap((customer: Customer) =>
        this.customerService.createCustomer(customer).pipe(
          map(
            (newCustomer: Customer) =>
              new customerActions.CreateCustomerSuccess(newCustomer)
          ),
          catchError((err) => of(new customerActions.CreateCustomerFail(err)))
        )
      )
    )
  );

  // Create Customer Effect
  updateCustomer$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType<customerActions.UpdateCustomer>(
        customerActions.CustomerActionTypes.UPDATE_CUSTOMER
      ),
      map((action: customerActions.UpdateCustomer) => action.payload),
      mergeMap((customer: Customer) =>
        this.customerService.updateCustomer(customer).pipe(
          map(
            (updateCustomer: Customer) =>
              new customerActions.UpdateCustomerSuccess({
                id: updateCustomer.id!,
                changes: updateCustomer,
              })
          ),
          catchError((err) => of(new customerActions.UpdateCustomerFail(err)))
        )
      )
    )
  );

  // Delete Customer Effect
  deleteCustomer$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType<customerActions.DeleteCustomer>(
        customerActions.CustomerActionTypes.DELETE_CUSTOMER
      ),
      map((action: customerActions.DeleteCustomer) => action.payload),
      mergeMap((id: number) =>
        this.customerService.deleteCustomer(id).pipe(
          map(() => new customerActions.DeleteCustomerSuccess(id)),
          catchError((err) => of(new customerActions.DeleteCustomerFail(err)))
        )
      )
    )
  );
}
