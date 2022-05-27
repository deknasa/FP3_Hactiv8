# Toko Belanja
link heroku : https://fp3-hacktiv8.herokuapp.com/

## User
- get all user  : https://fp3-hacktiv8.herokuapp.com/users
- post Register : https://fp3-hacktiv8.herokuapp.com/users/register
- post login    : https://fp3-hacktiv8.herokuapp.com/users/login
- put data user : https://fp3-hacktiv8.herokuapp.com/users/:userId
- patch top-up  : https://fp3-hacktiv8.herokuapp.com/users/topup
- delete user   : https://fp3-hacktiv8.herokuapp.com/users/:userId

## Category
Endpoint category can only be accessed by admin
- get all category by admin : https://fp3-hacktiv8.herokuapp.com/categories
- post category by admin    : https://fp3-hacktiv8.herokuapp.com/categories
- patch category            : https://fp3-hacktiv8.herokuapp.com/categories/:categoryId
- delete category           : https://fp3-hacktiv8.herokuapp.com/categories/:categoryId

## Product
Endpoint product can only be accessed by admin EXCEPT Get All Product
- post product      : https://fp3-hacktiv8.herokuapp.com/products
- get all product   : https://fp3-hacktiv8.herokuapp.com/products
- put data product  : https://fp3-hacktiv8.herokuapp.com/products/:productId
- patch category_id on data product :
                      https://fp3-hacktiv8.herokuapp.com/products/:productId
- delete product    : https://fp3-hacktiv8.herokuapp.com/products/:productId

## Transaction
Admin Access
 - get all transaction By Admin :
                        https://fp3-hacktiv8.herokuapp.com/transactions/admin
- get transaction id By Admn    :
                        https://fp3-hacktiv8.herokuapp.com/transactions/:transactionId

Customer Access
- post transaction history      :
                        https://fp3-hacktiv8.herokuapp.com/transactions
- get transaction   : https://fp3-hacktiv8.herokuapp.com/transactions/user
