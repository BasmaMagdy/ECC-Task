<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for($i=0;$i<100;$i++){
            DB::table('products')->insert([
                'name' => $faker->sentence(1),
                'description'=> $faker->sentence(10),
                'code'=> $faker->sha1(),
                'image'=> $faker->imageUrl(),
                'price'=> $faker->randomFloat(),
                'quantity'=> $faker->randomDigit(),
                'category_id'=> $faker->numberBetween(1,10),
                'created_at'=> now(),
                'updated_at'=> now()
            ]);
        }
    }
}
