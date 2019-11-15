const fs = require('fs');
const jwt = require('jsonwebtoken');

const privateKey =
'MIICXAIBAAKBgQCEwKvuRWeeGg1HfwiY7GJmPubkonjcix3Z5Lp96YRW7UvnouGD' +
'PD3Buy1tOYSNAkzK0efFvZO57Qb2NF/GBfahRT/O18w8vQ302FsrVn8NiI8GrR0f' +
'z3+FHm+j5SYx5ylWTRjPM80HBWzEiDuT8B+QCCT81SK1qN2qH+hu89uMwQIDAQAB' +
'AoGAAnmtOwYkRnhp4vllaaSOuSVXHNBCvKoDZnqzV4GxLAXEso8A8XeAF0qsMCsw' +
'Y4i1cdq0HaXJSWA4DwMu/fxCevx1m4eVvd4H2wg4ox2UDyKvybakUA/uLQ4Jbcda' +
'dr2kgfPT+zq30AJ9Lm19uqY/bUvJ5rhCjIUvL3Xmt95o+ZkCQQC4tZcKohUBRG1w' +
'5J/+KfMQx+T2o05ZeQz93b8hSjn/Uj/kiruEth6aH1n4jkUW5nPHhOe55khUzLw2' +
'TuANc1TnAkEAt/1w890tOmD6m+fPLO5NbYdcsx5U+LLigUERbsEiM2o8dzu7+DGS' +
'C4Y0yk1UuBt1PdxPT8MtR47oqDNfvMA0FwJAK4QcoZSt/i5w2jgCuY6IhVuSxciT' +
'nOC3/tdPQDiMkWp/QwisRQfjDcx1FenuvQZuIINfVJy8Tb4uWV0bzA9v4QJBAJ5S' +
'XgHajvKvRLcnj+Tv4nyfgCs5rJCdDb9/iEqvsohfoExRgHwf27ZC8+YpCP+r0QU8' +
'MJtILgxncthZ7MX09l0CQGEAAAuxpagKndV3pYasurHXhg2pc1h0uwlM7N+k9QID' +
'EzN3Xgmu7OpiMCZTQWPSGxle4+GNOa3YXiit72MEi5w= ';
const publicKey =
'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEwKvuRWeeGg1HfwiY7GJmPubk'+
'onjcix3Z5Lp96YRW7UvnouGDPD3Buy1tOYSNAkzK0efFvZO57Qb2NF/GBfahRT/O'+
'18w8vQ302FsrVn8NiI8GrR0fz3+FHm+j5SYx5ylWTRjPM80HBWzEiDuT8B+QCCT8'+
'1SK1qN2qH+hu89uMwQIDAQAB ';

module.exports = {
    createToken: (payload) => {
        //  /*
        const Options = {
            issuer: "Authorizaxtion/Resource/This server",
            subject: "iam@user.me",
            audience: "Client_Identity" // this should be provided by client
        }
        //  */
        // Token signing options
        var signOptions = {
            issuer: Options.issuer,
            subject: Options.subject,
            audience: Options.audience,
            expiresIn: "30d",    // 30 days validity
            algorithm: "RS256"
        };
        return jwt.sign(payload, privateKey, signOptions);
    },
    verify: (token) => {
        //  /*
        const Option = {
            issuer: "Authorization/Resource/This server",
            subject: "iam@user.me",
            audience: "Client_Identity" // this should be provided by client
        }
        //  */
        var verifyOptions = {
            issuer: Option.issuer,
            subject: Option.subject,
            audience: Option.audience,
            expiresIn: "30d",
            algorithm: ["RS256"]
        };
        try {
            return jwt.verify(token, publicKey, verifyOptions);
        } catch (err) {
            return false;
        }
    },
    decode: (token) => {
        return jwt.decode(token, { complete: true });
        //returns null if token is invalid
    }
}