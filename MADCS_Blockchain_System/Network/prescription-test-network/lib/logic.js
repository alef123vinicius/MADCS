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

'use strict';

/**
* Write your transction processor functions here
*/

/* global getAssetRegistry */
/**
* Initialize some test assets and participants useful for running a demo.
* @param {org.example.prescription.SetupDemo} setupDemo - the SetupDemo transaction
* @transaction
*/
async function setupDemo(setupDemo) { // eslint-disable-line no-unused-var
    //*****************ESPECIFICAÇÕES PARA GERAR O MODELO DE NEGÓCIO EXEMPLO***************
    const NUMBER_OF_PACIENTS = 2;
    const NUMBER_OF_MEDICALS = 2;
    const NUMBER_OF_PHARMACEUTICS = 2;
    const NUMBER_OF_CONTRACTS = 8;
    const NUMBER_OF_PRESCRIPTIONS = 10; //(10 * 8)
    //*****************ESPECIFICAÇÕES PARA GERAR O MODELO DE NEGÓCIO EXEMPLO***************
    const factory = getFactory();
    const NS = 'org.example.prescription';
    var i;
    for (i = 0; i < NUMBER_OF_MEDICALS; i++) {

        // create the medical
        const medical = factory.newResource(NS, 'Medical', 'medical' + i + '@email.com');
        const medicalAddress = factory.newConcept(NS, 'Address');
        medicalAddress.country = 'BRASIL';
        medical.address = medicalAddress;
        medical.accountBalance = Math.floor((Math.random() * 100) + 1);

        // add the medical's
        const medicalRegistry = await getParticipantRegistry(NS + '.Medical');
        await medicalRegistry.addAll([medical]);

    }
    for (i = 0; i < NUMBER_OF_PACIENTS; i++) {
        // create the patient
        const patient = factory.newResource(NS, 'Patient', 'patient' + i + '@email.com');
        const patientAddress = factory.newConcept(NS, 'Address');
        patientAddress.country = 'UK';
        patient.address = patientAddress;
        patient.accountBalance = Math.floor((Math.random() * 100) + 1);

        // add the patient's
        const patientRegistry = await getParticipantRegistry(NS + '.Patient');
        await patientRegistry.addAll([patient]);
    }
    for (i = 0; i < NUMBER_OF_PHARMACEUTICS; i++) {
        // create the pahrmaceutic
        const pharmaceutic = factory.newResource(NS, 'Pharmaceutic', 'pharma' + i + '@email.com');
        const pharmaceuticAddress = factory.newConcept(NS, 'Address');
        pharmaceuticAddress.country = 'Panama';
        pharmaceutic.address = pharmaceuticAddress;
        pharmaceutic.accountBalance = Math.floor((Math.random() * 100) + 1);

        // add the pharmaceutic's
        const pharmaceuticRegistry = await getParticipantRegistry(NS + '.Pharmaceutic');
        await pharmaceuticRegistry.addAll([pharmaceutic]);
    }

    // create the contract
    for (i = 0; i < NUMBER_OF_CONTRACTS; i++) {
        var j = 0;
        var k = 0;
        var l = 0;
        j = Math.trunc(i / 4) + 1;
        k = Math.trunc(i / 2);
        if (i < 4) {
            k = k + 1;
            if (i < 2) {
                l = i + 1;
            } else {
                l = i - 1;
            }
        } else {
            k = k - 1;
            if (i < 6) {
                l = i - 3;
            } else {
                l = i - 5;
            }
        }

        // o String contractId
        const contract = factory.newResource(NS, 'Contract', 'CON_00' + (i + 1));
        contract.medical = factory.newRelationship(NS, 'Medical', 'medical' + j + '@email.com');
        contract.patient = factory.newRelationship(NS, 'Patient', 'patient' + l + '@email.com');
        contract.pharmaceutic = factory.newRelationship(NS, 'Pharmaceutic', 'pharma' + k + '@email.com');
        //const tomorrow = setupDemo.timestamp;
        //const tomorrow2 = setupDemo.timestamp;
        contract.minDate = new Date("2019-0" + (i + 1) + "-10T1" + i + ":37:17.151Z"); //tomorrow;  min temperature for the cargo
        contract.maxDate = new Date("2019-0" + (i + 2) + "-10T1" + i + ":37:17.151Z"); //tomorrow2;  max temperature for the cargo
        contract.maxUsePrescription = Math.floor((Math.random() * 12) + 1);
        contract.minPenaltyFactor = Math.random() * (1.0 - 0.5) + 0.5;
        contract.maxPenaltyFactor = Math.random() * (1.5 - 1.0) + 1.0;

        // add the contracts
        const contractRegistry = await getAssetRegistry(NS + '.Contract');
        await contractRegistry.addAll([contract]);
    }
    var dec = 0;
    for (i = 0; i < NUMBER_OF_PRESCRIPTIONS; i++) {
        //const tomorrow = setupDemo.timestamp;
        //const tomorrow2 = setupDemo.timestamp;
        for (j = 0; j < NUMBER_OF_CONTRACTS; j++) {
            // create the prescription
            const prescription = factory.newResource(NS, 'Prescription', 'PRESC_' + (j + dec + 1));
            prescription.type = 'PRESCRIPTION';
            prescription.status = 'CREATED';
            prescription.numberOfUses = 0;
            prescription.medicaments = 'DIPIRONA, AMOXILINA';
            prescription.orientation = "De 8 em 8 horas, caso não funcione retorne ao consultório médico";
            prescription.issueDate = new Date("2019-0" + (j + 1) + "-11T1" + j + ":37:17.151Z");//tomorrow;
            if (i % 2 == 0) {
                prescription.dueDate = new Date("2019-0" + (j + 1) + "-09T1" + j + ":37:17.151Z");
            } else {
                prescription.dueDate = new Date("2019-0" + (j + 2) + "-20T1" + j + ":37:17.151Z");
            }
            prescription.contract = factory.newRelationship(NS, 'Contract', 'CON_00' + (j + 1));
            dec = dec + NUMBER_OF_CONTRACTS;


            // add the prescriptions
            const prescriptionRegistry = await getAssetRegistry(NS + '.Prescription');
            await prescriptionRegistry.addAll([prescription]);
        }

    }
    //console.log(prescriptionRegistry);
}

/**
* A prescription has been received by an patient
* @param {org.example.prescription.DispensingAllPrescriptions} DispensingAllPrescriptions - the validateAllPrescriptions transaction
* @transaction
*/
async function payAllPrescriptions(DispensingAllPrescriptions) { // eslint-disable-line no-unused-vars
    const prescriptionRegistry = DispensingAllPrescriptions.prescriptions;
    console.log(prescriptionRegistry);
    var i;
    for (i = 0; i < prescriptionRegistry.length; i++) {
        console.log(i, prescriptionRegistry[i]);
        var prescription = prescriptionRegistry[i];
        var contract = prescription.contract;
        let payOut = 0;
        //***********************ESPECIFICAÇÕES DO CONTRATO***************************
        if ((prescription.issueDate.getDate() < contract.minDate.getDate()) || (prescription.dueDate.getDate() > contract.maxDate.getDate()) || ((contract.maxUsePrescription - prescription.numberOfUses) <= 0)) {
            prescription.status = 'INVALID';
            payOut -= contract.minPenaltyFactor * prescription.numberOfUses
        } else {
            //Erro está aqui 
            //if ((prescription.dueDate.getDate() > DispensingAllPrescriptions.timestamp.getDate())) {
            //    prescription.status = 'INVALID';
            //    payOut -= contract.minPenaltyFactor * prescription.numberOfUses
            //} else {
            if (prescription.status == 'VALID' || prescription.status == 'INVALID') {
                if (prescription.status == 'VALID') {
                    prescription.status = 'USED';
                }
                if (prescription.status == 'INVALID' || ((contract.maxUsePrescription - prescription.numberOfUses) <= 0)) {
                    payOut -= contract.maxPenaltyFactor * prescription.numberOfUses;
                }
            } else {
                if (prescription.status != 'USED') {
                    prescription.status = 'VALID';
                }
            }
            //}
        }
        prescription.numberOfUses += 1;
        if ((contract.maxUsePrescription - prescription.numberOfUses) > 0) {
            payOut += (contract.maxUsePrescription - prescription.numberOfUses) * contract.minPenaltyFactor;
        }
        prescriptionRegistry[i].contract.patient.accountBalance += payOut;
        //***********************ESPECIFICAÇÕES DO CONTRATO***************************

        const registry = await getAssetRegistry('org.example.prescription.Prescription');
        await registry.update(prescriptionRegistry[i]);

        const registryP = await getParticipantRegistry('org.example.prescription.Patient');
        await registryP.update(prescriptionRegistry[i].contract.patient);
    }
}

/**
* A prescription has been received by an patient
* @param {org.example.prescription.DispensingReceived} prescriptionReceived - the PrescriptionReceived transaction
* @transaction
*/
async function payOut(DispensingReceived) { // eslint-disable-line no-unused-vars

    const prescription = DispensingReceived.prescription;
    const contract = prescription.contract;
    let payOut = 0;

    console.log('Received at: ' + DispensingReceived.timestamp);
    console.log('Contract maxDate: ' + contract.maxDate);
    /* o String prescriptionId; o ProductType type; o PrescriptionStatus status; o String medicaments; o String orientation; o DateTime issueDate; o DateTime dueDate */
    //--> Medical medical; --> Pharmaceutic pharmaceutic; --> Patient patient; o DateTime minDate; o DateTime maxDate; o Double minPenaltyFactor; o Double maxPenaltyFactor
    if ((prescription.issueDate.getDate() < contract.minDate.getDate()) && (prescription.dueDate.getDate() > contract.maxDate.getDate()) || ((contract.maxUsePrescription - prescription.numberOfUses) <= 0)) {
        prescription.status = 'INVALID';
        payOut -= contract.minPenaltyFactor * prescription.numberOfUses
    } else {
        if (prescription.status == 'VALID' || prescription.status == 'INVALID') {
            if (prescription.status == 'VALID') {
                prescription.status = 'USED';
            }
            if (prescription.status == 'INVALID' || ((contract.maxUsePrescription - prescription.numberOfUses) <= 0)) {
                payOut -= contract.maxPenaltyFactor * prescription.numberOfUses;
            }
        } else {
            if (prescription.status != 'USED') {
                prescription.status = 'VALID';
            }
        }
    }
    prescription.numberOfUses += 1;
    if ((contract.maxUsePrescription - prescription.numberOfUses) > 0) {
        payOut += (contract.maxUsePrescription - prescription.numberOfUses) * contract.minPenaltyFactor;
    }

    DispensingReceived.prescription.contract.patient.accountBalance += payOut;

    const registry = await getAssetRegistry('org.example.prescription.Prescription');
    await registry.update(DispensingReceived.prescription);

    const registryP = await getParticipantRegistry('org.example.prescription.Patient');
    await registryP.update(DispensingReceived.prescription.contract.patient);
}

async function detect(DispensingReceived) {

}

async function model() {
    if (isLearning()) {
        return learning();
    }

}

function learning(DispensingReceived) {
    // open file with model
    // O modelo pode ser configurado para treinar dentro da própria arquitetura do sistema, 
    // Ou realzado por uma API externa local e colocado aqui.
    // Temos uma API python com flask, que roda externamente o modelo com os dados em um outro endereço
    // O resultado do modelo é inserido no arquivo txt, lido pelo contrato e feito a validação em tempo real,
    // sem precisar treinar, apenas transformar os dados para uma base númerica e calcular sua distância.
    const model = open("../models/k-means.txt");

    const dispensingWithFilter = filterDispensing(DispensingReceived);

    const calculateDistance = distance(dispensingWithFilter, model);

    const resultDataAnalisys = verifyAnomaly(calculateDistance, model, DispensingReceived);

    return resultDataAnalisys;

}

function isLearning() {
    if (learning() === null || learning() === undefined) {
        return false;
    }
    return true;
}


function filterDispensing(DispensingReceived) {
    //A filtragem dos dados depende de cada tipo,
    //Para a analise de prescrições foi tranformado todos os dados para uma base númerica
    //Pode-se realizar agregações, no caso de strings, uma contagem de caracteres, ou uma análise mais apropriada.
    const dataFiltering = creatFilter(DispensingReceived);
    return dataFiltering;
}

function creatFilter(DispensingReceived) {
    return DispensingReceived;
}

function distance(dispensingWithFilter, model) {
    //Passo do algoritmo k-means para realizar o fit.
    //com os dados tranformados, pode-se calcular a distância e analisar com os dados treinados dos clusters.
    const dist = dispensingWithFilter;
    const comp = compareDists(model, dispensingWithFilter);
    return comp;
}

function verifyAnomaly(calculateDistance, model, DispensingReceived) {
    /*
     Conforme os cluster foram criados, cada grupo pertence a uma determinada característica semelhante,
     Dependendo da análise na curve de elbow pode-se ter de 2 a n clusters, conforme a dificuldade de agrupar os dados
     Porém, deve-se verificar o grupo que convergiu para a caracteristica anomala. Normalmente, esses dados com anomalias são em 
     Menores números no Dataset, mas podem ser encontrados e agrupados da mesma forma. 
     A regra empresa foi, dado que o valor da transação atual é pŕoxima ou pertence ao cluster anomalo, essa transação não poderá ser finalizada.
    */
    const result = AnalyserData(calculateDistance, model);
    if (result.anomaly === 'INVALID') {
        emit(DispensingReceived)
        //existe uma anmalia ou comportamento que determina uma alteração na transação.
        return true;
    }
    //não foi encontrado anomalia na análise do dado
    return false;
}

/**
* A prescription has been received by an patient
* @param {org.example.prescription.EmitAlertAllPeers} EventAlert - the EmitAlertAllPeers transaction
* @transaction
*/
async function emit(DispensingReceived) {
    /*
    Todos os peers pode receber o dado analisado, verificar e caso esteja condizente a seu cluster e sua análise, poderá adiciona o dado ao conjunto.
    */
    const prescription = DispensingReceived.prescription;
    prescription.status = 'INVALID';
    const registry = await getAssetRegistry('org.example.prescription.Prescription');
    await registry.update(DispensingReceived.prescription);
    const registry = await getAssetRegistry('org.example.prescription.EventAlert');
    let event = DispensingReceived.EventAlert;
    event.message = 'Anomaly detection in data transaction';
    await registry.update(DispensingReceived);
}

