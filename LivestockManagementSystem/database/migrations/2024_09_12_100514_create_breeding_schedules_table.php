<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBreedingSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('breeding_schedules', function (Blueprint $table) {
            $table->id();  // This is a big integer (primary key)
            $table->unsignedBigInteger('livestock_id')->foreignId('livestock_id')->constrained('livestock')->onDelete('cascade');
            $table->date('scheduled_date');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('breeding_schedules');
    }
}
