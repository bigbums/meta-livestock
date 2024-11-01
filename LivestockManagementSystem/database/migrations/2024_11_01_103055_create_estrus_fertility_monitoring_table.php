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
        Schema::create('estrus_fertility_monitoring', function (Blueprint $table) {
            $table->id();
            $table->foreignId('livestock_id')->constrained()->onDelete('cascade');
            $table->date('monitoring_date');
            $table->enum('estrus_status', ['In Estrus', 'Not in Estrus'])->default('Not in Estrus');
            $table->enum('fertility_status', ['Fertile', 'Sub-fertile', 'Infertile'])->default('Fertile');
            $table->text('assessment_notes')->nullable();
            $table->enum('recommendation', ['Breedable', 'Not Breedable', 'Requires Monitoring'])->default('Breedable');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estrus_fertility_monitoring');
    }
};
