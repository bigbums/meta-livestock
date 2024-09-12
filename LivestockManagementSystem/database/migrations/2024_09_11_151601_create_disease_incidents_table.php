<?php

// database/migrations/xxxx_xx_xx_create_disease_incidents_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiseaseIncidentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('disease_incidents', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('health_record_id')->foreignId('health_record_id')->constrained()->onDelete('cascade'); // Foreign key to link with the health records
            $table->string('disease_name');
            $table->string('disease_type')->nullable();
            $table->date('incident_date');
            $table->enum('severity', ['mild', 'moderate', 'severe']);
            $table->text('symptoms')->nullable();
            $table->text('prevention_measures')->nullable();
            $table->text('control_measures')->nullable();
            $table->text('treatment_given')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('disease_incidents');
    }
}
