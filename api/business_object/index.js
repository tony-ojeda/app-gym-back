const { Router } = require('express');
const { isAuthenticated, hasRole } = require('../../auth/auth.services');
const { 
  getAllBusinessObjects,
  getBusinessObjectById,
  createBusinessObject,
  updateBusinessObject,
  deleteBusinessObject
} = require('./business_object.controller')

const router = Router()

//CRUD
router.get('/', isAuthenticated(), getAllBusinessObjects)
router.get('/:id', isAuthenticated(), getBusinessObjectById)
// router.post('/', hasRole(['Developer', 'Admin']), createBusinessObject)
router.post('/',isAuthenticated(), createBusinessObject)
router.put('/:id', updateBusinessObject)
router.delete('/:id', hasRole('Developer'), deleteBusinessObject)


module.exports = router
