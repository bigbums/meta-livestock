<?php

// namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
// use Illuminate\Database\Seeder;

// class TranslationsTableSeeder extends Seeder
// {
//     /**
//      * Run the database seeds.
//      */
//     public function run(): void
//     {
//         //
//     }
// }


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TranslationsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('translations')->insert([
            ['key' => 'welcome_message', 'language_code' => 'en', 'value' => 'Welcome to our application!'],
            ['key' => 'welcome_message', 'language_code' => 'fr', 'value' => 'Bienvenue dans notre application!'],
            ['key' => 'description', 'language_code' => 'en', 'value' => 'This is a sample description in English.'],
            ['key' => 'description', 'language_code' => 'fr', 'value' => 'Ceci est un exemple de description en français.'],
            ['key' => 'page_title', 'language_code' => 'en', 'value' => 'Home'],
            ['key' => 'page_title', 'language_code' => 'fr', 'value' => 'Accueil'],
        ]);
    }
}
