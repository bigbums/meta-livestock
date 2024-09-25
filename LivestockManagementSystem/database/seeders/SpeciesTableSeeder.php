<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpeciesTableSeeder extends Seeder
{
    public function run()
    {
        // Sample data for species
        $species = [
            ['name' => 'Cattle', 'sub_specie' => 'Bos taurus', 'location' => 'Grasslands', 'African' => 'Yes'],
            ['name' => 'Goat', 'sub_specie' => 'Capra aegagrus hircus', 'location' => 'Hills', 'African' => 'Yes'],
            ['name' => 'Sheep', 'sub_specie' => 'Ovis aries', 'location' => 'Grasslands', 'African' => 'Yes'],
            ['name' => 'Pig', 'sub_specie' => 'Sus scrofa domesticus', 'location' => 'Farms', 'African' => 'No'],
            ['name' => 'Chicken', 'sub_specie' => 'Gallus gallus domesticus', 'location' => 'Farms', 'African' => 'Yes'],
            ['name' => 'Duck', 'sub_specie' => 'Anas platyrhynchos domesticus', 'location' => 'Wetlands', 'African' => 'Yes'],
            ['name' => 'Camel', 'sub_specie' => 'Camelus dromedarius', 'location' => 'Deserts', 'African' => 'Yes'],
            ['name' => 'Buffalo', 'sub_specie' => 'Syncerus caffer', 'location' => 'Savannas', 'African' => 'Yes'],
            ['name' => 'Horse', 'sub_specie' => 'Equus ferus caballus', 'location' => 'Grasslands', 'African' => 'No'],
            ['name' => 'Llama', 'sub_specie' => 'Lama glama', 'location' => 'Mountains', 'African' => 'No'],
            ['name' => 'Rabbit', 'sub_specie' => 'Oryctolagus cuniculus', 'location' => 'Farms', 'African' => 'Yes'],
            ['name' => 'Turkey', 'sub_specie' => 'Meleagris gallopavo', 'location' => 'Farms', 'African' => 'No'],
            ['name' => 'Alpaca', 'sub_specie' => 'Vicugna pacos', 'location' => 'Mountains', 'African' => 'No'],
            ['name' => 'Donkey', 'sub_specie' => 'Equus africanus asinus', 'location' => 'Farms', 'African' => 'Yes'],
            ['name' => 'Zebra', 'sub_specie' => 'Equus zebra', 'location' => 'Savannas', 'African' => 'Yes'],
            ['name' => 'Bison', 'sub_specie' => 'Bison bison', 'location' => 'Grasslands', 'African' => 'No'],
            ['name' => 'Ostrich', 'sub_specie' => 'Struthio camelus', 'location' => 'Grasslands', 'African' => 'Yes'],
            ['name' => 'Kudu', 'sub_specie' => 'Tragelaphus strepsiceros', 'location' => 'Woodlands', 'African' => 'Yes'],
            ['name' => 'Wildebeest', 'sub_specie' => 'Connochaetes', 'location' => 'Savannas', 'African' => 'Yes'],
            ['name' => 'Antelope', 'sub_specie' => 'Antilopinae', 'location' => 'Grasslands', 'African' => 'Yes'],
            ['name' => 'Giraffe', 'sub_specie' => 'Giraffa camelopardalis', 'location' => 'Savannas', 'African' => 'Yes'],
        ];

        // Insert the data into the species table
        DB::table('species')->insert($species);
    }
}
