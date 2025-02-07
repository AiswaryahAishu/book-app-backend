const express = require('express')
const router=express.Router()
const {createOrder,getOrderByEmail}=require('./order.controller')

// create order endpoint
router.post("/",createOrder)

// get order by email id
router.get("/email/:email",getOrderByEmail)

module.exports =router;