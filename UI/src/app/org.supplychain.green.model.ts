import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.supplychain.green.model{
   export enum AssetStatus {
      CREATED,
      ON_THE_ROAD,
      SOLD,
   }
   export abstract class GHGcarrierAsset extends Asset {
      assetId: string;
      assetStatus: AssetStatus;
      aggregatedGHG: number;
      atCompany: GHGproducerCompany;
   }
   export abstract class PhisicalAsset extends GHGcarrierAsset {
      amount: number;
   }
   export abstract class LiquidAsset extends GHGcarrierAsset {
      amount: number;
   }
   export enum CellPhoneType {
      LENOVO,
      ZTE,
      XIAOMI,
   }
   export class CellPhone extends PhisicalAsset {
      cellPhoneType: CellPhoneType;
   }
   export class CompanyAddress {
      country: string;
      city: string;
      street: string;
      hauseNr: number;
   }
   export abstract class GHGproducerCompany extends Participant {
      participantId: string;
      companyName: string;
      companyAddress: CompanyAddress;
      GHG: number;
   }
   export class ManufacturerCompany extends GHGproducerCompany {
   }
   export class SalesCompany extends GHGproducerCompany {
   }
   export class RelayCompany extends GHGproducerCompany {
   }
   export class TransportationCompany extends GHGproducerCompany {
      transportFrom: GHGproducerCompany[];
   }
   export class InitTestData extends Transaction {
   }
   export class ClearData extends Transaction {
   }
   export class Transfer extends Transaction {
      assetToTransfer: GHGcarrierAsset;
      fromCompany: GHGproducerCompany;
      toCompany: GHGproducerCompany;
   }
   export class Produce extends Transaction {
      manufacturerCompany: ManufacturerCompany;
   }
   export class Sell extends Transaction {
      assetToSell: GHGcarrierAsset;
      salesCompany: SalesCompany;
   }
   export class AssetCreated extends Event {
      gHGcarrierAsset: GHGcarrierAsset;
      creationGHG: number;
   }
   export class AssetTransferred extends Event {
      gHGcarrierAsset: GHGcarrierAsset;
      transferGHG: number;
   }
   export class AssetSold extends Event {
      gHGcarrierAsset: GHGcarrierAsset;
      sellingGHG: number;
   }
// }
