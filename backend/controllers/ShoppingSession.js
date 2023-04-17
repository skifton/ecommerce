const ShoppingSession = require("../models/ShoppingSession.model.js");

const getSession = async(req, res) => {
    try {
        const user_id = req.params.user_id;
        const session = await ShoppingSession.findOne({ where: { user_id } })
        res.status(200).send(session);
    } catch(error){
        res.json({error})
    } 
};

const createShoppingSession = async(req, res) => {
    try {
        const user_id = req.params.user_id;
        const existingSession = await ShoppingSession.findOne({ where: { user_id } });
        if(existingSession) return res.status(500).json({ error: "A session with this user already exists." });
        const createdSession = await ShoppingSession.create({
            user_id: user_id,
            total: 0,
        });
        res.status(200).json(createdSession);
    } catch (error) {
        res.json({error})
    };
};

const updateSession = async(req, res) => {
    try {
        console.log(req.body)
        const user_id = req.params.user_id;
        const updatedParams = req.body;
        const session = await ShoppingSession.findOne({ where: { user_id: user_id }});
        if(updatedParams.operation === "ADD"){
            const ADD_TOTAL = session.total + updatedParams.price;
            const updatedSession = await ShoppingSession.update({total: ADD_TOTAL }, { where: { user_id: user_id } });
            res.status(200).json(updatedSession);
        } else {
            const REMOVE_TOTAL = session.total - updatedParams.price;
            const updatedSession = await ShoppingSession.update({total: REMOVE_TOTAL}, { where: { user_id: user_id } });
            res.status(200).json(updatedSession);
        }
    } catch(error) {
        res.json({ error })
    }
}

const deleteSession = async(req, res) => {
    try {
        const session_id = req.params.session_id;
        const deletedSession = await ShoppingSession.destroy({ where: { id: session_id }});
        res.status(200).json(deletedSession)
    } catch(error) {
        res.json({ error })
    }
};

module.exports = { getSession, createShoppingSession, updateSession, deleteSession };
