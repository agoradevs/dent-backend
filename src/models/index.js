const UserSchema = require('./module.user/Users.model');
const RolesSchema = require('./module.user/Roles.model');
const TypeUserSchema = require('./module.user/TypeUser.model');
const TypeAcountSchema = require('./module.user/TypeAcount.model');
const AcountUserSchema = require('./module.user/AcountUser.model');
const PermissionsSchema = require('./module.user/Permissions.model');
const CleaningInventorySchema = require('./module.inventory/CleaningInventory.model');
const InventoryDentistSchema = require('./module.inventory/InventoryDentist.model');
const ProductExpenseSchema = require('./module.inventory/ProductExpense.model');
const TypeProductsSchema = require('./module.inventory/TypeProducts.model');
const AppoitmentSchema = require('./module.history/Appoitment.model');
const TreatmentsSchema = require('./module.history/Treatments.model');
const TypeTreatmentSchema = require('./module.history/TypeTreatment.model');
const SpecialitiesSchema = require('./module.dentist/Specialities.model');
const SpecialitiesDentistSchema = require('./module.dentist/SpecialitiesDentist.model');
const BillsSchema = require('./module.billing/Bills.model');
const DiscountSchema = require('./module.billing/Discount.model');
const TypeDisccountSchema = require('./module.billing/TypeDiscount.model');



module.exports = {
    UserSchema,
    RolesSchema,
    TypeUserSchema,
    TypeAcountSchema,
    AcountUserSchema,
    PermissionsSchema,
    CleaningInventorySchema,
    InventoryDentistSchema,
    ProductExpenseSchema,
    TypeProductsSchema,
    AppoitmentSchema,
    TreatmentsSchema,
    TypeTreatmentSchema,
    SpecialitiesSchema,
    SpecialitiesDentistSchema,
    BillsSchema,
    DiscountSchema,
    TypeDisccountSchema
}