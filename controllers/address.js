import db from '../models';
const Sequelize = require('sequelize');

module.exports = {

<<<<<<< HEAD
    createBims: (newAddressObject, rawBatchObject, cb) => {
        return new Promise((resolve, reject) => {
            return db.sequelize.transaction((t) => {
                return db.AddressMaster.findOrCreate({
=======
    createAddress3: (newAddressArray, rawBatchArray) => {

        return db.sequelize.transaction((t) => {
            return Promise.mapSeries(newAddressArray, (newAddressObject) => {
                return db.AddressMaster.findOrCreate({
                    where: {
                        street_num: parseInt(newAddressObject.street_num),
                        street_name: newAddressObject.street_name,
                        street_unit: newAddressObject.street_unit
                    },
                    defaults: {
                        street_type: newAddressObject.street_type,
                        street_dir_cd: newAddressObject.street_dir_cd,
                        city: newAddressObject.city,
                        state: newAddressObject.state,
                        zipcode: newAddressObject.zipcode
                    }, transaction: t
                }).then((result) => {
                    // console.log(`\n\nResult:\n\n`);
                    console.log(result[0].dataValues.id);
                    // return result;
                }).catch((error) => {
                    console.log(error);
                });
            });
        });
    }, // end of CREATE #3


    createAddress4: (newAddressArray, rawBatchArray) => {

        let dbCreate = Promise.resolve(newAddressArray.map((newAddressObject) => {
            return db.AddressMaster.findOrCreate({
                where: {
                    street_num: parseInt(newAddressObject.street_num),
                    street_name: newAddressObject.street_name,
                    street_unit: newAddressObject.street_unit
                },
                defaults: {
                    street_type: newAddressObject.street_type,
                    street_dir_cd: newAddressObject.street_dir_cd,
                    city: newAddressObject.city,
                    state: newAddressObject.state,
                    zipcode: newAddressObject.zipcode
                }
            }).spread((result, created) => {
                console.log(result.dataValues.id);
            });
        }
        ));

        function iterator(cb) { return cb() }
        dbCreate
            .mapSeries(iterator)
            .then(r => console.log('Resolved with: ', r));
    }, // END of CREATE #4 


    createAddress5: (newAddressArray, rawBatchArray) => {

        let dbCreate = Promise.resolve(newAddressArray.map((n) => createOrFind(n)));
        function iterator(cb) { return cb() }
        function createOrFind(newAddressObject) {
            return function (value) {
                return db.sequelize.transaction((t) => {
                    return db.AddressMaster.findOrCreate({
>>>>>>> 7b8c359790fa5e1295fdaed2f188f290a4c2a58a
                        where: {
                            street_num: parseInt(newAddressObject.street_num),
                            street_name: newAddressObject.street_name
                        },
                        defaults: {
                            street_unit: newAddressObject.street_unit,
                            street_type: newAddressObject.street_type,
                            street_dir_cd: newAddressObject.street_dir_cd,
                            city: newAddressObject.city,
                            state: newAddressObject.state,
                            zipcode: newAddressObject.zipcode
<<<<<<< HEAD
                        }, 
                        transaction: t
                    })
                    .then( (AddressObject) => {
                        rawBatchObject.AddressMasterId = AddressObject[0].dataValues.id;
                        return db.Bims.create(rawBatchObject, 
                            {
                                transaction: t, 
                                include:
                                    {model: db.AddressMaster} 
                            }
                        )
                        .catch( (error) => console.error('error in create', error) );
                    })
                    .catch( (error) => console.error('\nerror in findOrCreate', error) );
            })
            .then( (result) => { 
                resolve(result);
                cb();
            })
            .catch( (error) => {   
                console.error('\nerror at the transaction level', error);
                reject(error);
             });
        });
    }, // end of createBIMS

    createHims: (newAddressObject, rawBatchObject, cb) => {
        return new Promise((resolve, reject) => {
            return db.sequelize.transaction( (t) => {
                return db.AddressMaster.findOrCreate({
                        where: {
                            street_num: parseInt(newAddressObject.street_num),
                            street_name: newAddressObject.street_name
                        },
                        defaults: {
                            street_unit: newAddressObject.street_unit,
                            street_type: newAddressObject.street_type,
                            street_dir_cd: newAddressObject.street_dir_cd,
                            city: newAddressObject.city,
                            state: newAddressObject.state,
                            zipcode: newAddressObject.zipcode
                        }, 
                        transaction: t
                    })
                    .then( (AddressObject) => {
                        rawBatchObject.AddressMasterId = AddressObject[0].dataValues.id;
                        return db.Hims.create(rawBatchObject, 
                            {
                                transaction: t, 
                                include:
                                    {model: db.AddressMaster} 
                            }
                        )
                        .catch( (error) => console.error('\nerror in create', error) );
                    })
                    .catch( (error) => console.error('\nerror in findOrCreate', error) );
            })
            .then( (result) => { 
                resolve(result);
                cb();
            })
            .catch( (error) => {   
                console.error('\nerror at the transaction level', error);
                reject(error);
             });
        });
    }, // end of createHIMS

    createRent: (newAddressObject, rawBatchObject, cb) => {
        return new Promise((resolve, reject) => {
            return db.sequelize.transaction( (t) => {
                return db.AddressMaster.findOrCreate({
                        where: {
                            street_num: parseInt(newAddressObject.street_num),
                            street_name: newAddressObject.street_name
                        },
                        defaults: {
                            street_unit: newAddressObject.street_unit,
                            street_type: newAddressObject.street_type,
                            street_dir_cd: newAddressObject.street_dir_cd,
                            city: newAddressObject.city,
                            state: newAddressObject.state,
                            zipcode: newAddressObject.zipcode
                        }, 
                        transaction: t
                    })
                    .then( (AddressObject) => {
                        rawBatchObject.AddressMasterId = AddressObject[0].dataValues.id;
                        return db.Rent.create(rawBatchObject, 
                            {
                                transaction: t, 
                                include: {model: db.AddressMaster} 
                            }
                        )
                        .catch( (error) => console.error('\nerror in create', error) );
                    })
                    .catch( (error) => console.error('\nerror in findOrCreate / Create', error) );
            })
            .then( (result) => { 
                resolve(result);
                cb();
            })
            .catch( (error) => {   
                console.error('\nerror at the transaction level', error);
                reject(error);
             });
        });
    }, // end of createRENT

    createScep: (newAddressObject, rawBatchObject, cb) => {
        return new Promise((resolve, reject) => {
            return db.sequelize.transaction((t) => {
                return db.AddressMaster.findOrCreate({
                    where: {
                        street_num: parseInt(newAddressObject.street_num),
                        street_name: newAddressObject.street_name
                    },
                    defaults: {
                        street_unit: newAddressObject.street_unit,
                        street_type: newAddressObject.street_type,
                        street_dir_cd: newAddressObject.street_dir_cd,
                        city: newAddressObject.city,
                        state: newAddressObject.state,
                        zipcode: newAddressObject.zipcode
                    }, 
                    transaction: t
                })
                .then((AddressObject) => {
                    rawBatchObject.AddressMasterId = AddressObject[0].dataValues.id;
                    return db.Scep.create(rawBatchObject,
                        {
                            transaction: t,
                            include: { model: db.AddressMaster }
                        }
                    )
                    .catch( (error) => console.error('\nerror in create', error) );
                })
                .catch((error) => console.error('findOrCreate Master Address didn\'t work'));
            })
            .then( (result) => { 
                resolve(result);
                cb();
            })
            .catch( (error) => {   
                console.error('\nerror at the transaction level', error);
                reject(error);
            });
        });
    } // end of createScep

} // end of MODULE
