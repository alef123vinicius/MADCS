# MADCS
model for testing in Hyperledger Composer

*******************INSTALAÇÃO

npm install -g composer-cli@0.20

npm install -g composer-rest-server@0.20

npm install -g generator-hyperledger-composer@0.20

npm install -g yo

*******************PLAYGROUND INSTALL	

npm install -g composer-playground@0.20

*******************INSTALL FABRIC

pré-requisito para editar os business: vscode

mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers

curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz 

tar -xvf fabric-dev-servers.tar.gz


cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12

./downloadFabric.sh

**********************CONTROL YOUR DEV ENVIRONMENT

cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12
./startFabric.sh
./createPeerAdminCard.sh

**********************START PLAYGROUND

composer-playground

address: http://localhost:8080/login

**********************DEVELOPER SYSTEM-BASED BLOCKCHAIN ARCHITETURE

yo hyperledger-composer:businessnetwork

(name application): prescriptionX-network

(Lincense): Apache-2.0

(Generate Empty network): Yes or No

**********************DEFINES BUSINESS NETWORK

***********************************.cto

***********************************.ts

***********************************.acl


*********************************** GENERATE A BUSINESS NETWORK

cd /fabric-dev-servers/prescriptionX-network

composer archive create -t dir -n .

composer network install --card PeerAdmin@hlfv1 --archiveFile prescription5-network@0.0.1.bna

composer network start --networkName prescription5-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer card import --file networkadmin.card

composer network ping --card admin@prescriptionX-network

***** Upgrade

Edit and swap the version in packpage.json for actual.(ex: 0.0.2)

composer archive create -t dir -n .

composer network install --card PeerAdmin@hlfv1 --archiveFile prescription-test-network@0.0.2.bna

composer network upgrade -c PeerAdmin@hlfv1 -n prescription-test-network -V 0.0.2

*********************************** GENERATE REST SERVER

cd /fabric-dev-servers/prescriptionX-network

composer-rest-server

(card): admin@prescriptionX-network
(never use namespace)
(generated API): No
(Using Passport): No
(test interface): Yes
(logging):
(Enable Evente Publication): Yes
(TLS security): No

Restart server comand
composer-rest-server -c admin@prescription-test-network -n always -u true -d N -w true



 
*********************************** GENERATE ANGULAR APPLICATION
cd /fabric-dev-servers/prescriptionX-network

yo hyperledger-composer:angular

(running business network): Yes
(project name): prescriptionx-network
(descritpion): Teste
(author name): Alef
(author email): alef123.vinicius@gmail.com
(license): Apache-2.0
(standard json): Yes
(card): admin@prescriptionX-network
(Select): Connect to an existing REST API
(address): http://localhost
(port): 3000
(Namespace): not used

*********************************** START ANGULAR APPLICATION
cd /fabric-dev-servers/prescriptionX-network/prescriptionX-network

npm start

angular address: http://localhost:4200


