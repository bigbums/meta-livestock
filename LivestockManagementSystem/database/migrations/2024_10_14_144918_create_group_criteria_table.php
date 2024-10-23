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
        Schema::create('group_criteria', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->unsignedBigInteger('livestock_group_id'); // Foreign key to LivestockGroup
            $table->string('key'); // The criterion key (e.g., species, age_range)
            $table->string('value'); // The criterion value (e.g., cattle, 2-3 years)
            $table->timestamps(); // Laravel timestamp fields for created_at and updated_at

            // Define the foreign key constraint for livestock_group_id
            // $table
            //     //->foreign('livestock_group_id')
            //     ->references('id')
            //     ->on('livestock_groups')
            //     ->onDelete('cascade'); // Ensures that deleting a Livestock Group deletes its criteria
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('group_criteria');
    }
};
