const router = require('express').Router();
const axios = require('axios')
const { edamamKey } = require('../keys.js')

router.get('/:field/:type', (req, res, next) => {
    console.log("111111", req.params.type)
    if (req.params.field === 'time'){

        return axios({
            url: 'https://api.edamam.com/search',
            method: 'GET',
            params: {
                q: 'dinner',
                time: req.params.type,
                app_id: edamamKey.recipes.appId,
                app_key: edamamKey.recipes.appKey,
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
                app_id: edamamKey.recipes.appId,
                app_key: edamamKey.recipes.appKey,
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