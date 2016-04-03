/**
 * Created by Aem on 3/12/2016 AD.
 */
"use strict";
var crypto = require('crypto');

module.exports = function () {
    function Encryption() {
    }

    var  algorithm = 'aes-256-ctr';
    var  password = 'ouj8nv@,bo';

    Encryption.prototype.Encrypt = function (text) {
        var cipher = crypto.createCipher(algorithm, password);
        var crypted = cipher.update(text, 'utf8', 'hex');

        crypted += cipher.final('hex');

        return crypted;
    };

    Encryption.prototype.Decrypt = function (text) {
        var decipher = crypto.createDecipher(algorithm, password);
        var dec = decipher.update(text, 'hex', 'utf8');

        dec += decipher.final('utf8');

        return dec;
    };

    return new Encryption();
};