/**************Register Api**************** */
const handleProfileGet = (req ,res ,db) => {
    const {id }= req.params;
    db('users').where('id', id) // also can be written as .where({id})
    .then(user => {
        if(user.length){
            res.json(user[0]);
        }else{
            res.status(400).json('user not found');
        }
    })
    .catch(err => res.status(400).json('error fetching user',err));
}
module.exports = {
    handleProfileGet : handleProfileGet
}