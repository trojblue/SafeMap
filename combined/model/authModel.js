"use strict";

class Firebase_Auth {
    constructor(
        type,
        project_id,
        private_key_id,
        private_key,
        client_email,
        client_id,
        auth_uri,
        token_uri,
        auth_provider_x509_cert_url,
        client_x509_cert_url
    ) {
        this.type = type;
        this.project_id = project_id;
        this.private_key_id = private_key_id;
        this.private_key = private_key;
        this.client_email = client_email;
        this.client_id = client_id;
        this.auth_uri = auth_uri;
        this.token_uri = token_uri;
        this.auth_provider_x509_cert_url = auth_provider_x509_cert_url;
        this.client_x509_cert_url = client_x509_cert_url;
    }

    static from(json) {
        return Object.assign(new Firebase_Auth(), json);
    }
}

class LoginModel {
    /**
     * The data structure used by ogin page
     * @param {string} email
     * @param {string} passwordRepeated
     * @constructor
     */
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    static from(json) {
        return Object.assign(new LoginModel(), json);
    }
}

class SignUpModel {
    /**
     * The data structure used by sign up page
     * @param {string} email
     * @param {[string, string]} passwordRepeated
     * @constructor
     */
    constructor(email, passwordRepeated) {
        this.email = email;
        this.password = passwordRepeated;
    }

    static from(json) {
        return Object.assign(new SignUpModel(), json);
    }
}

class Location {
    /**
     * The data structure used by location model
     * @param {number} latitude
     * @param {number} longitude
     * @param {string} name
     */
    constructor(latitude, longitude, name) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
    }

    static from(json) {
        return Object.assign(new Location(), json);
    }
}

class UserModel {
    /**
     *
     * @param {*} name
     * @param {*} password
     * @param {*} favorite_location
     */
    constructor(name, password, favorite_location) {
        this.name = name;
        this.password = password;
        this.favorite_location = Location.from(favorite_location);
    }

    static from(json) {
        return Object.assign(new UserModel(), json);
    }
}

module.exports = {
    LoginModel,
    Firebase_Auth,
    SignUpModel,
    Location,
    UserModel,
};
