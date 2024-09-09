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
        Schema::create('user_language_preferences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('language_code', 10);
            $table->timestamps();

            $table->foreign('language_code')->references('code')->on('languages')->onDelete('cascade');
        });

        // Make sure the default language is set for each user in user registration logic. It can be added as a dropdown.
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_language_preferences');
    }
};
