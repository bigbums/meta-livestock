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
        Schema::create('treatments', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('livestock_id')->foreignId('livestock_id')->constrained('livestocks')->onDelete('cascade');  // Foreign key to livestock
            $table->text('diagnosis')->nullable();
            $table->text('treatment_goals')->nullable();
            $table->text('medications')->nullable();
            $table->text('therapies')->nullable();
            $table->text('surg_proced')->nullable();
            $table->text('monitoring_plan')->nullable();
            $table->text('follow_up_care')->nullable();
            $table->enum('cosent', ['Yes', 'No'])->nullable();
            $table->text('assessment')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('treatments');
    }
};
