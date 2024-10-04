<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('nutritional_requirements', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('livestock_id')->foreignId('livestock_id')->constrained('livestocks')->onDelete('cascade');  // Foreign key to livestock
            $table->bigInteger('species_id')->foreignId('species_id')->constrained()->onDelete('cascade'); // Species reference
            $table->bigInteger('breed_id')->foreignId('breed_id')->nullable()->constrained()->onDelete('cascade'); // Breed reference
            $table->string('age_range')->nullable(); // Age range (e.g., 1-3 months)
            $table->string('weight_range')->nullable(); // Weight range (e.g., 20-50 kg)
            //$table->string('health_status')->nullable(); // Health condition (e.g., healthy, recovering)
            $table->string('production_type')->nullable(); // e.g., Dairy, Meat
            $table->string('requirement_type')->nullable(); // e.g., Protein, Energy, Vitamins
            $table->float('requirement_value')->nullable(); // Value (e.g., 10g per day)
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nutritional_requirements');
    }
};
