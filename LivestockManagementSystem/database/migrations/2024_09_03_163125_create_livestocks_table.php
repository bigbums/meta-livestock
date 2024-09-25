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
        Schema::create('livestocks', function (Blueprint $table) {
            $table->id();  // Primary Key
            $table->string('type');  // General type (e.g., cattle, goat, sheep)

            // Foreign key to Species
            $table->foreignId('species_id')->constrained('species')->onDelete('cascade');

            // Foreign key to Breed
            // $table->foreignId('breed_id')->constrained('breeds')->onDelete('set null')->nullable();

            $table->date('date_of_birth');  // Date of birth of the livestock
            $table->enum('gender', ['Male', 'Female']);  // Gender of the livestock
            $table->enum('health_status', ['healthy', 'sick'])->nullable();  // Health status of the livestock
            $table->string('tag_id')->unique();  // Unique tag for identification
            $table->string('herd_id')->nullable();  // Identifier for the herd
            $table->string('name')->nullable();  // Name for livestock (optional)

            // Foreign key to Owner (User)
            $table->bigInteger('owner_id')->constrained('users')->onDelete('cascade');

            // Foreign key to Location (e.g., farm or region)
            $table->bigInteger('location_id')->constrained('locations')->nullable()->onDelete('set null');

            $table->timestamps();  // Created and updated timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livestocks');
    }
};
