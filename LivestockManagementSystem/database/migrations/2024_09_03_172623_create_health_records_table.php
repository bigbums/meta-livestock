<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up() //: void
    {
        Schema::create('health_records', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('livestock_id')->foreignId('livestock_id')->constrained('livestocks')->onDelete('cascade');  // Foreign key to livestock
            $table->date('date');  // Date of the health check or monitoring
            $table->json('vitals')->nullable();  // JSON field to store vital signs (e.g., temperature, heart rate)
            $table->string('diagnosis')->nullable();  // Diagnosis of any condition
            $table->text('treatment')->nullable();  // Details of treatment or medication
            $table->string('dr_firstname')->nullable();  // Details of tr
            $table->string('dr_lastname')->nullable();
            $table->string('dr_id_card')->nullable();
            $table->string('dr_clinic_name')->nullable();
            $table->text('medication')->nullable();
            $table->string('surgery')->nullable();
            $table->text('notes')->nullable();  // Additional notes by the veterinarian or user

            $table->timestamps();  // Timestamps for created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()  //: void
    {
        Schema::dropIfExists('health_records');
    }
};
