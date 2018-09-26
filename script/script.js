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
	
  	// adding company 
    const manCompReg = await getParticipantRegistry(namespace + '.ManufacturerCompany');   
    const manComp = await factory.newResource(namespace, 'ManufacturerCompany', "1");
    manComp.companyName = "CREATED";
    manComp.GHG = 100;
    const newAddress = await factory.newConcept(namespace, 'CompanyAddress');
	newAddress.country = "Bejing";
	newAddress.city = "China";
	newAddress.street = "Xia mo Street";
    newAddress.hauseNr = 16;
  	manComp.companyAddress = newAddress;
  
    await manCompReg.add(manComp);       
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
