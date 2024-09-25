<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;

class BreedsTableSeeder extends Seeder
{
    public function run()
    {
        // Sample data for breeds
        $breeds = [
            ['specie_id' => 1, 'name' => 'Holstein', 'description' => 'Black and white dairy cattle.'],
            ['specie_id' => 1, 'name' => 'Jersey', 'description' => 'A small breed of dairy cattle.'],
            ['specie_id' => 1, 'name' => 'Angus', 'description' => 'Beef cattle known for their quality meat.'],
            ['specie_id' => 2, 'name' => 'Boer', 'description' => 'A breed of goat known for meat production.'],
            ['specie_id' => 2, 'name' => 'Nubian', 'description' => 'Known for its milk and friendly temperament.'],
            ['specie_id' => 3, 'name' => 'Merino', 'description' => 'Famous for its fine wool.'],
            ['specie_id' => 3, 'name' => 'Suffolk', 'description' => 'Known for its meat quality.'],
            ['specie_id' => 4, 'name' => 'Yorkshire', 'description' => 'A breed of pig known for its high meat quality.'],
            ['specie_id' => 5, 'name' => 'Leghorn', 'description' => 'Known for high egg production.'],
            ['specie_id' => 6, 'name' => 'Peking', 'description' => 'A breed of duck raised for meat.'],
            ['specie_id' => 7, 'name' => 'Dromedary', 'description' => 'One-humped camel known for its endurance.'],
            ['specie_id' => 8, 'name' => 'Cape Buffalo', 'description' => 'A large breed known for its strength.'],
            ['specie_id' => 9, 'name' => 'Thoroughbred', 'description' => 'A breed of horse known for its speed.'],
            ['specie_id' => 10, 'name' => 'Suri', 'description' => 'A breed of alpaca known for its long fleece.'],
            ['specie_id' => 11, 'name' => 'Mini Rex', 'description' => 'A small breed of rabbit with a soft coat.'],
            ['specie_id' => 12, 'name' => 'Bronze', 'description' => 'A breed of turkey known for its size.'],
            ['specie_id' => 13, 'name' => 'Huacaya', 'description' => 'A type of alpaca with a crimped fleece.'],
            ['specie_id' => 14, 'name' => 'American Mammoth Jackstock', 'description' => 'A large donkey breed used as a draft animal.'],
            ['specie_id' => 15, 'name' => 'Grant\'s Zebra', 'description' => 'A species of zebra known for its distinctive stripes.'],
            ['specie_id' => 16, 'name' => 'Bison', 'description' => 'Large grazing mammals known for their size and strength.'],
            ['specie_id' => 17, 'name' => 'Common Ostrich', 'description' => 'The largest living bird.'],
            ['specie_id' => 18, 'name' => 'Greater Kudu', 'description' => 'Known for its impressive horns.'],
            ['specie_id' => 19, 'name' => 'Blue Wildebeest', 'description' => 'A large antelope species.'],
            ['specie_id' => 20, 'name' => 'Springbok', 'description' => 'A medium-sized antelope known for its leaping ability.'],
        ];

        // Insert the data into the breeds table
        DB::table('breeds')->insert($breeds);
    }
}
