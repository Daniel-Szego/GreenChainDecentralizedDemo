/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { CellPhoneComponent } from './CellPhone/CellPhone.component';

import { ManufacturerCompanyComponent } from './ManufacturerCompany/ManufacturerCompany.component';
import { SalesCompanyComponent } from './SalesCompany/SalesCompany.component';
import { RelayCompanyComponent } from './RelayCompany/RelayCompany.component';
import { TransportationCompanyComponent } from './TransportationCompany/TransportationCompany.component';

import { InitTestDataComponent } from './InitTestData/InitTestData.component';
import { ClearDataComponent } from './ClearData/ClearData.component';
import { TransferComponent } from './Transfer/Transfer.component';
import { ProduceComponent } from './Produce/Produce.component';
import { SellComponent } from './Sell/Sell.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'CellPhone', component: CellPhoneComponent },
  { path: 'ManufacturerCompany', component: ManufacturerCompanyComponent },
  { path: 'SalesCompany', component: SalesCompanyComponent },
  { path: 'RelayCompany', component: RelayCompanyComponent },
  { path: 'TransportationCompany', component: TransportationCompanyComponent },
  { path: 'InitTestData', component: InitTestDataComponent },
  { path: 'ClearData', component: ClearDataComponent },
  { path: 'Transfer', component: TransferComponent },
  { path: 'Produce', component: ProduceComponent },
  { path: 'Sell', component: SellComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
