<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePedigreesTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('pedigrees', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('livestock_id')->foreignId('livestock_id')->constrained('livestock')->onDelete('cascade');
            $table->unsignedBigInteger('sire_id')->foreignId('sire_id')->nullable()->constrained('livestocks')->onDelete('set null'); // Father
            $table->unsignedBigInteger('dam_id')->foreignId('dam_id')->nullable()->constrained('livestocks')->onDelete('set null');  // Mother
            $table->string('generation')->nullable(); // For example: F1, F2, etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('pedigrees');
    }
}
