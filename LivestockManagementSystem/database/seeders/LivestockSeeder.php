<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Livestock;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class LivestockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Assuming there are existing users and locations
        $userIds = DB::table('users')->pluck('id')->toArray();
        $locationIds = DB::table('locations')->pluck('id')->toArray();

        foreach (range(1, 20) as $index) {
            Livestock::create([
                'type' => $faker->randomElement(['Cattle', 'Sheep', 'Goat', 'Pig', 'Chicken']),
                'species_id' => $faker->randomNumber([1, 20]),
                // 'breed_id' => $faker->randomNumber([1, 20]),
                'date_of_birth' => $faker->date(),
                'gender' => $faker->randomElement(['Male', 'Female']),
                'health_status' => $faker->randomElement(['healthy', 'sick']),
                'tag_id' => strtoupper($faker->bothify('TAG-##??')),
                'herd_id' => strtoupper($faker->bothify('HERD-##??')),
                'name' => $faker->firstName,
                'owner_id' => $faker->randomElement($userIds),
                'location_id' => $faker->randomElement($locationIds),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
