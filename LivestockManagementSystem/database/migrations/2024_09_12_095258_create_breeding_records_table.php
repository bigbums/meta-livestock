<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBreedingRecordsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('breeding_records', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('livestock_id')->foreignId('livestock_id')->constrained('livestocks')->onDelete('cascade');
            $table->unsignedBigInteger('breeding_schedule_id')->foreignId('breeding_schedule_id')->constrained('breeding_schedules')->onDelete('cascade');
            $table->date('breeding_date');
            $table->date('expected_delivery_date')->nullable();
            $table->date('actual_delivery_date')->nullable();
            $table->string('breeding_method'); // natural, AI, etc.
            $table->integer('offspring_count')->nullable();
            $table->boolean('is_successful')->nullable(); // success, failure, etc.
            $table->enum('status', ['pending', 'confirmed', 'completed'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('breeding_records');
    }
}
