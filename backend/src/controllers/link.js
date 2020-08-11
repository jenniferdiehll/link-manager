const express = require('express');

const { Link } = require('../models');

const router = express.Router();

router.get('/', async (request, response) => {
    const { accountId } = request;
    const links = await Link.findAll({ where: {accountId}});

    return response.jsonOK(links);
});

router.get('/:id', async (request, response) => {
    const { accountId } = request;
    const { id } = request.params;
    const link = await Link.findOne({ where: {id, accountId}});

    if(!link) return response.jsonNotFound();
    return response.jsonOK(link);
});

router.post('/', async (request, response) => {
    const { accountId, body } = request;
    const { label, url, isSocial } = body;

    const image = 'https://google.com/image.jpg';

    const link = await Link.create({ label, url, isSocial, image, accountId });

    return response.jsonOK(link);
});

router.put('/:id', async (request, response) => {
    const { accountId, body } = request;
    const { id } = request.params;
    const fields = ['label', 'url', 'isSocial'];

    const link = await Link.findOne({ where: {id, accountId}});
    if(!link) return response.jsonNotFound();
    fields.map(fieldName => {
        const newValue = body[fieldName];
        if(newValue) link[fieldName] = newValue;
    });

    await link.save();

    return response.jsonOK(link);

});

router.delete('/:id', async (request, response) => {
    const { accountId } = request;
    const { id } = request.params;
    const link = await Link.findOne({ where: {id, accountId}});

    if(!link) return response.jsonNotFound();
    await link.destroy();

    return response.jsonOK();
})

module.exports = router;