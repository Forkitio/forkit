const router = require('express').Router();
const axios = require('axios')
const edamamId = process.env.EDAMAM_RECIPES_ID;
const edamamKey = process.env.EDAMAM_RECIPES_KEY;

console.log('ID', edamamId)
router.get('/getRecipeInfo/:id', (req, res, next) => {
    
    const recipeId = 'http://www.edamam.com/ontologies/edamam.owl#' + req.params.id

    return axios({
        url: 'https://api.edamam.com/search',
        method: 'GET',
        params: {
            r: recipeId,
            app_id: edamamId,
            app_key: edamamKey,
        }
    })
    .then(result => {
        console.log(res)
        res.send(result.data)
    })
    .catch(ex => console.log(ex))
})

router.get('/recommendations/:field/:type', (req, res, next) => {
    
    if (req.params.field === 'time'){

        return axios({
            url: 'https://api.edamam.com/search',
            method: 'GET',
            params: {
                q: 'dinner',
                time: req.params.type,
                app_id: edamamId,
                app_key: edamamKey,
            }
        })
        .then(result => {
            console.log(res)
            res.send(result.data)
        })
        .catch(ex => console.log(ex))

    } else {
        return axios({
            url: 'https://api.edamam.com/search',
            method: 'GET',
            params: {
                q: req.params.type,
                app_id: edamamId,
                app_key: edamamKey,
            }
        })
        .then(result => {
            console.log(res)
            res.send(result.data)
        })
        .catch(ex => console.log(ex))
    }
})

module.exports = router