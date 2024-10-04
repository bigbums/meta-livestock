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
            $table->bigInteger('doctor_id')->constrained('users')->onDelete('cascade');
            $table->date('date');  // Date of the health check or monitoring
            //$table->json('vitals')->nullable();  // JSON field to store vital signs (e.g., temperature, heart rate)
            $table->text('diagnosis')->nullable();  // Diagnosis of any condition
            $table->bigInteger('treatment_id')->nullable();  // Details of treatment or medication
            $table->bigInteger('prscptn_id')->constrained('prescription')->onDelete('cascade');
            $table->text('medical_hist')->nullable();
            //$table->string('dr_id_card')->nullable();
            //$table->string('allergies')->nullable();
            $table->text('medication')->nullable();
            $table->string('surgery')->nullable();
            $table->string('follow_up_req')->nullable();
            $table->date('next_aptmnt_date')->nullable();
            $table->string('lab_test')->nullable();
            $table->text('lab_result')->nullable();
            $table->text('owner_instructions')->nullable();
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
