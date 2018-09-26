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

    console.log('Creating a user');  
    const factory = getFactory(); 
	
  	// adding user 
    const userParticipantRegistry = await getParticipantRegistry(namespace + '.User');   
    const newUser = await factory.newResource(namespace, 'User', "1");
    newUser.UserName = "Chuck Norris";
    newUser.AccountBalance = 100;
    const newAddress = await factory.newConcept(namespace, 'Address');
	newAddress.Country = "Hungary";
	newAddress.City = "Budapest";
	newAddress.Street = "Seasam Street";
    newAddress.HauseNumber = 16;
  	newUser.UserAddress = newAddress;
  
    await userParticipantRegistry.add(newUser);     
  
  	// adding asset owner
    const assetParticipantRegistry = await getParticipantRegistry(namespace + '.AssetOwner');   
    const bycicleOwner = await factory.newResource(namespace, 'AssetOwner', "2");
    bycicleOwner.OwnerName = "James Bond";
    bycicleOwner.AccountBalance = 200;
    const newAddress2 = await factory.newConcept(namespace, 'Address');
	newAddress2.Country = "Germany";
	newAddress2.City = "Frankfurt";
	newAddress2.Street = "Seasam Street";
    newAddress2.HauseNumber = 22;
  	bycicleOwner.OwnerAddress = newAddress2;
  
    await assetParticipantRegistry.add(bycicleOwner);     

    console.log('Creating bycicle');  
    const bycicleAssetRegistry = await getAssetRegistry(namespace + '.Bycicle');   
    const newBycicle = await factory.newResource(namespace, 'Bycicle', "1");
	newBycicle.ObjectName = "MyFirstBycicle";
    newBycicle.Owner = bycicleOwner;
    await bycicleAssetRegistry.add(newBycicle);    
  
    console.log('Creating a bike');  
    const bikeAssetRegistry = await getAssetRegistry(namespace + '.Bike');   
    const newBike = await factory.newResource(namespace, 'Bike', "1");
	newBike.ObjectName = "MyFirstBike";
    newBike.Owner = bycicleOwner;
    await bikeAssetRegistry.add(newBike);   
  
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
