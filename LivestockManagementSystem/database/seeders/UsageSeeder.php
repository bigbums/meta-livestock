<?php

namespace Database\Seeders;

use App\Models\Usage;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UsageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usages = [
            ['name' => 'Meat', 'description' => 'Livestock used primarily for meat production.'],
            ['name' => 'Dairy', 'description' => 'Livestock used primarily for dairy production.'],
            ['name' => 'Skin', 'description' => 'Livestock used for skin and leather production.'],
            ['name' => 'Wool', 'description' => 'Livestock used for wool production.'],
        ];

        foreach ($usages as $usage) {
            Usage::create($usage);
        }
    }
}
