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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PrescriptionService } from './Prescription.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-prescription',
  templateUrl: './Prescription.component.html',
  styleUrls: ['./Prescription.component.css'],
  providers: [PrescriptionService]
})
export class PrescriptionComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  prescriptionId = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  medicaments = new FormControl('', Validators.required);
  orientation = new FormControl('', Validators.required);
  numberOfUses = new FormControl('', Validators.required);
  issueDate = new FormControl('', Validators.required);
  dueDate = new FormControl('', Validators.required);
  contract = new FormControl('', Validators.required);

  constructor(public servicePrescription: PrescriptionService, fb: FormBuilder) {
    this.myForm = fb.group({
      prescriptionId: this.prescriptionId,
      type: this.type,
      status: this.status,
      medicaments: this.medicaments,
      orientation: this.orientation,
      numberOfUses: this.numberOfUses,
      issueDate: this.issueDate,
      dueDate: this.dueDate,
      contract: this.contract
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicePrescription.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.prescription.Prescription',
      'prescriptionId': this.prescriptionId.value,
      'type': this.type.value,
      'status': this.status.value,
      'medicaments': this.medicaments.value,
      'orientation': this.orientation.value,
      'numberOfUses': this.numberOfUses.value,
      'issueDate': this.issueDate.value,
      'dueDate': this.dueDate.value,
      'contract': this.contract.value
    };

    this.myForm.setValue({
      'prescriptionId': null,
      'type': null,
      'status': null,
      'medicaments': null,
      'orientation': null,
      'numberOfUses': null,
      'issueDate': null,
      'dueDate': null,
      'contract': null
    });

    return this.servicePrescription.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'prescriptionId': null,
        'type': null,
        'status': null,
        'medicaments': null,
        'orientation': null,
        'numberOfUses': null,
        'issueDate': null,
        'dueDate': null,
        'contract': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.prescription.Prescription',
      'type': this.type.value,
      'status': this.status.value,
      'medicaments': this.medicaments.value,
      'orientation': this.orientation.value,
      'numberOfUses': this.numberOfUses.value,
      'issueDate': this.issueDate.value,
      'dueDate': this.dueDate.value,
      'contract': this.contract.value
    };

    return this.servicePrescription.updateAsset(form.get('prescriptionId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.servicePrescription.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicePrescription.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'prescriptionId': null,
        'type': null,
        'status': null,
        'medicaments': null,
        'orientation': null,
        'numberOfUses': null,
        'issueDate': null,
        'dueDate': null,
        'contract': null
      };

      if (result.prescriptionId) {
        formObject.prescriptionId = result.prescriptionId;
      } else {
        formObject.prescriptionId = null;
      }

      if (result.type) {
        formObject.type = result.type;
      } else {
        formObject.type = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.medicaments) {
        formObject.medicaments = result.medicaments;
      } else {
        formObject.medicaments = null;
      }

      if (result.orientation) {
        formObject.orientation = result.orientation;
      } else {
        formObject.orientation = null;
      }

      if (result.numberOfUses) {
        formObject.numberOfUses = result.numberOfUses;
      } else {
        formObject.numberOfUses = null;
      }

      if (result.issueDate) {
        formObject.issueDate = result.issueDate;
      } else {
        formObject.issueDate = null;
      }

      if (result.dueDate) {
        formObject.dueDate = result.dueDate;
      } else {
        formObject.dueDate = null;
      }

      if (result.contract) {
        formObject.contract = result.contract;
      } else {
        formObject.contract = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'prescriptionId': null,
      'type': null,
      'status': null,
      'medicaments': null,
      'orientation': null,
      'numberOfUses': null,
      'issueDate': null,
      'dueDate': null,
      'contract': null
      });
  }

}
