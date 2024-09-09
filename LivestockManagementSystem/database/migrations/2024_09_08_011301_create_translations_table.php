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
        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->string('key'); // Translation key, e.g., 'welcome_message'
            $table->text('value'); // Translated text
            $table->string('language_code', 10); // Language code, e.g., 'en', 'fr'

            $table->timestamps();

            $table->unique(['key', 'language_code']);
            $table->foreign('language_code')->references('code')->on('languages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('translations');
    }
};
