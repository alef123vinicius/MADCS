import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.prescription{
   export enum ProductType {
      PRESCRIPTION,
   }
   export enum PrescriptionStatus {
      CREATED,
      VALID,
      INVALID,
      USED,
   }
   export class Prescription extends Asset {
      prescriptionId: string;
      type: ProductType;
      status: PrescriptionStatus;
      medicaments: string;
      orientation: string;
      numberOfUses: number;
      issueDate: Date;
      dueDate: Date;
      contract: Contract;
   }
   export class Contract extends Asset {
      contractId: string;
      medical: Medical;
      pharmaceutic: Pharmaceutic;
      patient: Patient;
      minDate: Date;
      maxDate: Date;
      maxUsePrescription: number;
      minPenaltyFactor: number;
      maxPenaltyFactor: number;
   }
   export class Address {
      city: string;
      country: string;
      street: string;
   }
   export abstract class Business extends Participant {
      email: string;
      address: Address;
      accountBalance: number;
   }
   export class Medical extends Business {
   }
   export class Pharmaceutic extends Business {
   }
   export class Patient extends Business {
   }
   export abstract class PrescriptionTransaction extends Transaction {
      prescription: Prescription;
   }
   export class DispensingReceived extends PrescriptionTransaction {
   }
   export class DispensingAllPrescriptions extends Transaction {
      prescriptions: Prescription[];
   }
   export class SetupDemo extends Transaction {
   }
   export class Testing extends Transaction {
   }
// }
