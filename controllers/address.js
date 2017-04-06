import db from '../models';
import Promise from 'bluebird';

module.exports = {

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
                            }).then( (result) => {
                                // console.log(`\n\nResult:\n\n`);
                                console.log(result[0].dataValues.id);
                                // return result;
                            }).catch( (error) => {
                                console.log(error);
                            });
                });
            });
    }, // end of CREATE #3


    createAddress4: (newAddressArray, rawBatchArray) => {

        let dbCreate = Promise.resolve(newAddressArray.map( (newAddressObject) => {
              return  db.AddressMaster.findOrCreate({
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
                }).spread( (result, created) => {
                    console.log(result.dataValues.id);
                });
            }
        ));

        function iterator(cb) { return cb() }
        dbCreate
            .mapSeries(iterator)
            .then( r => console.log( 'Resolved with: ', r) );
    }, // END of CREATE #4 


    createAddress5: (newAddressArray, rawBatchArray) => {

        let dbCreate = Promise.resolve(newAddressArray.map( (n) => createOrFind(n) ) );
        function iterator(cb) { return cb() }
        function createOrFind(newAddressObject) {
           return function (value){
                return db.sequelize.transaction((t) => {
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
                    });
                })
           }
        }
        dbCreate
            .mapSeries(iterator)
            .then( (r) => console.log('\nResolved with\n ',r) )
            .catch( (error) => console.log(error) )
    }, // END of CREATE #5 

    createAddress6: (newAddressArray, rawBatchArray) => {

        let dbCreate = Promise.resolve(newAddressArray.map( (n) => createOrFind(n) ) );
        function iterator(cb) { return cb() }
        function createOrFind(newAddressObject) {
           return function (value){
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
                });
           }
        }
        dbCreate
            .mapSeries(iterator)
            .then( (r) => console.log('\nResolved with\n ',r) )
            .catch( (error) => console.log(error) )
    },


    createAddress7: (newAddressObject, rawBatchObject) => {
        
            return db.sequelize.transaction((t) => {
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
                    })
                    .spread( (result, created) => {
                        console.log('\n\n*** in the spread');
                        console.log('\nCreated:', created);
                        return result.dataValues;
                    })
                    .then( (result) => {
                        console.log('\n\n$$$$$$$  INTO THE BIMS CREATE $$$$$$$$');
                        console.log('\n\nThen - ', result);
                        rawBatchObject.AddressMasterID = result.id;
                        console.log(rawBatchObject);
                      return db.Bims.create(rawBatchObject, {transaction: t})
                            .then( (r) => console.log('Success!'))
                            .catch( (error) => console.log('Error'));
                    })
                    .catch( (error) => console.log(error)
                    );
            });

    }, // end of CREATE #7



} // end of MODULE
