<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $categories = [
            'Appetizer',
            'Main Course',
            'Dessert',
            'Beverage',
            'Side Dish',
            'Soup',
            'Salad',
            'Seafood',
            'Pizza',
            'Pasta',
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category,
                'description'=> $faker->sentence(10),
                'created_at'=> now(),
                'updated_at'=> now()
            ]);
        }
    }
}
