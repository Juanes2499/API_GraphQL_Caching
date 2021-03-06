const restaurantModel = require("../models/restaurant.model");

module.exports = {
    getData: async (req, res, next) =>  {
        try{
            const restaurants = await restaurantModel.find({});
            res.status(200).json(restaurants);
        }catch(error){
            res.status(500).json({error: 'Ha ocurrido un error al momento de consultar los restaurantes.'});
        }
    },
    postData: async (req, res, next) => {
        try {
            const newRestaurant = new restaurantModel(req.body);
            const restaurantCreated = await newRestaurant.save();
            res.status(201).json(restaurantCreated);
        } catch (error) {
            res.status(500).json({error: 'Ha ocurrido un error al momento de crear un restaurante.'});
        }
    },
    getDataById: async (req, res, next) => {
        try {
            const {restaurantId} = req.params;
            const restaurant = await restaurantModel.findById(restaurantId);
            res.status(200).json(restaurant);
        } catch (error) {
            res.status(500).json({error: 'Ha ocurrido un error al momento de consultar un restaurante por ID.'});
        }
    },
    updateData: async (req, res, next) => {
        try {
            const {restaurantId} = req.params;
            const restaurantUpdate = req.body;
            const oldRestaurant = await restaurantModel.findByIdAndUpdate(restaurantId, restaurantUpdate);
            res.status(200).json({succes: true, oldData: oldRestaurant});
        } catch (error) {
            res.status(500).json({error: 'Ha ocurrido un error al momento de actualizar un restaurante por ID.'});
        }
    },
    deleteData: async (req, res, next) => {
        try {
            const {restaurantId} = req.params;
            const restaurant = await restaurantModel.findById(restaurantId);
            const oldRestaurant = await restaurantModel.deleteOne(restaurant);
            res.status(200).json({succes: true, deletedData: oldRestaurant});
        } catch (error) {
            res.status(500).json({error: 'Ha ocurrido un error al momento de eliminar un restaurante por ID.'});
        }
    }
};