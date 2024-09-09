<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('languages', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('code', 10)->unique(); // Language code, e.g., 'en', 'fr', 'es'
            $table->boolean('is_default')->default(false); // Whether this is the default language
            $table->boolean('status')->default(true); // Active or inactive
            $table->timestamps();
        });

        // Set English as the default language initially
        DB::table('languages')->insert([
            ['name' => 'English', 'code' => 'en', 'is_default' => true, 'status' => true],
            ['name' => 'French', 'code' => 'fr', 'is_default' => false, 'status' => true]

        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('languages');
    }
};
