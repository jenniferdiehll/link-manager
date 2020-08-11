const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');
const { accountSignUp, accountSignIn } = require('../validators/account');
const { getMessage } = require('../helpers/validator');
const { generateJwt, generateRefreshJwt, verifyRefreshJwt, getTokenFromHeaders } = require('../helpers/jwt');

const router = express.Router();

const saltRounds = 10;

router.post('/sign-in', accountSignIn, async (request, response) => {
    const { email, password } = request.body;
    const account = await Account.findOne({ where: { email } });

    //Validar a senha
    const match = account ? bcrypt.compareSync(password, account.password) : null;
    if(!match) return response.jsonBadRequest(null, getMessage('account.signin.invalid'));

    const token = generateJwt({ id: account.id });
    const refreshToken = generateRefreshJwt({ id: account.id, version: account.jwtVersion });

    return response.jsonOK(account, getMessage('account.signin.success'), {token, refreshToken});
});

router.post('/sign-up', accountSignUp, async (request, response) => {
    const { email, password } = request.body;

    const account = await Account.findOne({ where: { email } });
    if(account) return response.jsonBadRequest(null, getMessage('account.signup.email_exists'));

    const hash = bcrypt.hashSync(password, saltRounds);
    const newAccount = await Account.create({ email, password: hash });

    const token = generateJwt({id: newAccount.id});
    const refreshToken = generateRefreshJwt({id: newAccount.id, version: newAccount.jwtVersion});

    return response.jsonOK(newAccount, getMessage('account.signup.success'), { token, refreshToken });
});

router.post('/refresh', async (request, response) => {
    const token = getTokenFromHeaders(request.headers);
    if(!token){
        return response.jsonUnauthorized(null, 'Invalid token');
    }

    try{
        const decoded = verifyRefreshJwt(token);
        const account = await Account.findByPk(decoded.id);
        if(!account) return response.jsonUnauthorized(null, 'Invalid token');

        if(decoded.version != account.jwtVersion){
            return response.jsonUnauthorized(null, 'Invalid token');
        }

        const meta = {
            token: generateJwt({ id: account.id }),
        }

        return response.jsonOK(null, null, meta);
    } catch(error){
        return response.jsonUnauthorized(null, 'Invalid token');
    }
});

module.exports = router;