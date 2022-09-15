"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var puppies = require('./puppies.js');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
var findById = function (id) { return puppies.find(function (puppie) { return puppie.id === id; }); };
var checkPuppie = function (puppieById, _req, res) {
    if (!puppieById) {
        return res.status(404).json({ error: "No puppie with the id: ".concat(_req.params.id) });
    }
    return;
};
app.get('/api/puppies', function (_req, res) {
    return res.status(200).json(puppies);
});
app.get('/api/puppies/:id', function (_req, res) {
    var puppieById = findById(Number(_req.params.id));
    checkPuppie(puppieById, _req, res);
    return res.status(200).json(puppieById);
});
app.post('/api/puppies', function (_req, res) {
    _req.body.id = +puppies.length;
    _req.body.imgUrl = "https://picsum.photos/400/400";
    if (!_req.body.name || !_req.body.breed || !_req.body.birthdate) {
        return res.status(404).json({ error: "Name, breed and birthdate are required" });
    }
    var newPuppie = _req.body;
    puppies.push(newPuppie);
    return res.status(200).json(puppies);
});
app.put('/api/puppies/:id', function (_req, res) {
    var oldPuppie = findById(Number(_req.params.id));
    checkPuppie(oldPuppie, _req, res);
    if (!_req.body.name || !_req.body.breed || !_req.body.birthdate) {
        return res.status(404).json({ error: "Name, breed and birthdate are required" });
    }
    var newPuppie = __assign({ id: Number(_req.params.id) }, _req.body);
    puppies.splice(puppies.indexOf(oldPuppie), 1, newPuppie);
    return res.status(200).json(puppies);
});
app["delete"]('/api/puppies/:id', function (_req, res) {
    var oldPuppie = findById(Number(_req.params.id));
    checkPuppie(oldPuppie, _req, res);
    puppies.splice(puppies.indexOf(oldPuppie), 1);
    return res.status(200).json(puppies);
});
exports["default"] = app;
