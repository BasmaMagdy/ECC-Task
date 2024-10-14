ECC Tasks
---------

To run Frontend
===============
`npm start`

To run Backend
==============
1. Migrate DB
`php artisan migrate`
2. Seed Database
`php artisan db:seed --force --class=CategoryTableSeeder`
`php artisan db:seed --force --class=ProductTableSeeder`
3. run project
`php artisan serve` or `php -S 0.0.0.0:8000 -t public/`

- List all routes
`php artisan route:list`