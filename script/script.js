/**
 * Transaction file for green supply chain
 */

const namespace = "org.supplychain.green.model";

/**
 *
 * @param {org.bicyclesharing.model.InitTestData} param - model instance
 * @transaction
 */
async function InitTestDataFunction(param) {  
    console.log('init test data');

    console.log('Creating a manufacturer company');  
    const factory = getFactory(); 
	
  	// adding manufacturer company 
    const manCompReg = await getParticipantRegistry(namespace + '.ManufacturerCompany');   
    const manComp = await factory.newResource(namespace, 'ManufacturerCompany', "1");
    manComp.companyName = "Cell phone Manufacturer Inc.";
    manComp.GHG = 100;
    const newAddress = await factory.newConcept(namespace, 'CompanyAddress');
	newAddress.country = "Bejing";
	newAddress.city = "China";
	newAddress.street = "Xia Mo Street";
    newAddress.hauseNr = 16;
  	manComp.companyAddress = newAddress;
  
    await manCompReg.add(manComp);       

  	// adding transportation company 1
    const transCompReg = await getParticipantRegistry(namespace + '.TransportationCompany');   
    const transComp1 = await factory.newResource(namespace, 'TransportationCompany', "2");
    transComp1.companyName = "Truck Transport Inc.";
    transComp1.GHG = 50;
    const newAddress2 = await factory.newConcept(namespace, 'CompanyAddress');
	newAddress2.country = "Hong Kong";
	newAddress2.city = "China";
	newAddress2.street = "Mua Mo Street";
    newAddress2.hauseNr = 22;
  	transComp1.companyAddress = newAddress2;
  
    await transCompReg.add(transComp1);       

  	// adding transportation company 2
    const transComp2 = await factory.newResource(namespace, 'TransportationCompany', "3");
    transComp2.companyName = "Shipping Inc.";
    transComp2.GHG = 150;
    const newAddress3 = await factory.newConcept(namespace, 'CompanyAddress');
	newAddress3.country = "Sydney";
	newAddress3.city = "Australia";
	newAddress3.street = "Beecon Str";
    newAddress3.hauseNr = 122;
  	transComp2.companyAddress = newAddress3;

    await transCompReg.add(transComp2);       

    // adding transportation company 3
    const transComp3 = await factory.newResource(namespace, 'TransportationCompany', "4");
    transComp3.companyName = "Fast Train Transport";
    transComp3.GHG = 80;
    const newAddress4 = await factory.newConcept(namespace, 'CompanyAddress');
	newAddress4.country = "Italy";
	newAddress4.city = "Venice";
	newAddress4.street = "Via Margutta";
    newAddress4.hauseNr = 8;
  	transComp3.companyAddress = newAddress4;

    await transCompReg.add(transComp3);       
  
  	// adding sales company 
    const salesCompReg = await getParticipantRegistry(namespace + '.SalesCompany');   
    const salesComp = await factory.newResource(namespace, 'SalesCompany', "5");
    salesComp.companyName = "Sales Co.";
    salesComp.GHG = 30;
    const newAddress5 = await factory.newConcept(namespace, 'CompanyAddress');
	newAddress5.country = "Hungary";
	newAddress5.city = "Budapest";
	newAddress5.street = "Bartok Bela ut";
    newAddress5.hauseNr = 44;
  	salesComp.companyAddress = newAddress5;
  
    await salesCompReg.add(salesComp);         
}

/**
 *
 * @param {org.bicyclesharing.model.ClearData} param - model instance
 * @transaction
 */
async function ClearDataFunction(param) {  
    console.log('clearing all data');
  
    const userParticipantRegistry = await getParticipantRegistry(namespace + '.User');
    let users = await userParticipantRegistry.getAll();
    await userParticipantRegistry.removeAll(users);
    
    const assetParticipantRegistry = await getParticipantRegistry(namespace + '.AssetOwner'); 
    let assetParticipants = await assetParticipantRegistry.getAll();
    await assetParticipantRegistry.removeAll(assetParticipants);
 
    const bycicleAssetRegistry = await getAssetRegistry(namespace + '.Bycicle'); 
    let bycicles = await bycicleAssetRegistry.getAll();
    await bycicleAssetRegistry.removeAll(bycicles);

    const bikeAssetRegistry = await getAssetRegistry(namespace + '.Bike'); 
    let bikes = await bikeAssetRegistry.getAll();
    await bikeAssetRegistry.removeAll(bikes);

    console.log('clearing all data finished');  
}

/**
 *
 * @param {org.bicyclesharing.model.HireBycicle} param - model instance
 * @transaction
 */
async function HireBycicleFunction(param) {  
    console.log('Hiring a Bycicle');
 	
    let bycicleToHire = param.BycicleToHire;
    let hireByMe = param.HireByMe;
    
  	if (bycicleToHire.AssetAvailability == "FREE"){
      	bycicleToHire.AssetAvailability = "HIRED";
        bycicleToHire.HiredBy = hireByMe;
      	
        const bycicleAssetRegistry = await getAssetRegistry(namespace + '.Bycicle'); 
      	await bycicleAssetRegistry.update(bycicleToHire);  
       
       // raising hiring event
     let HiringEvent  = await getFactory().newEvent(namespace, 'BycicleHiredEvent'); 
       HiringEvent.BycicleName = bycicleToHire.ObjectName;
       HiringEvent.HiringPersonName = hireByMe.UserName;     
      emit(HiringEvent);
    }
}

/**
 *
 * @param {org.bicyclesharing.model.NeedRepair} param - model instance
 * @transaction
 */
async function NeedRepairFunction(param) {  
	    console.log('Bicycle needing a repair');

    let bycicleToRepair = param.BycicleToRepair;
    
  	if (bycicleToRepair.AssetSate == "GOOD"){
      	bycicleToRepair.AssetSate = "IMPAIRED";
      	bycicleToRepair.AssetAvailability = "NOT_AVAILABLE";
            	
        const bycicleAssetRegistry = await getAssetRegistry(namespace + '.Bycicle'); 
      	await bycicleAssetRegistry.update(bycicleToRepair);  
    }
}

/**
 *
 * @param {org.bicyclesharing.model.Repaired} param - model instance
 * @transaction
 */
async function RepairedFunction(param) {  
		console.log('Repaired');

    let bycicleToRepair = param.BycicleToRepair;
    
  	if (bycicleToRepair.AssetSate == "IMPAIRED"){
      	bycicleToRepair.AssetSate = "GOOD";
      	bycicleToRepair.AssetAvailability = "FREE";
            	
        const bycicleAssetRegistry = await getAssetRegistry(namespace + '.Bycicle'); 
      	await bycicleAssetRegistry.update(bycicleToRepair);  
    }
  
  
	
}
