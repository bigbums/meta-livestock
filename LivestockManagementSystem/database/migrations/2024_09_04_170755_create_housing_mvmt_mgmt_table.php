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
        Schema::create('housing_mvmt_mgmt', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('livestock_id')->foreignId('livestock_id')->constrained('livestocks')->onDelete('cascade');
            $table->string('location'); // Barn, Pasture, Shelter, etc.
            $table->string('movement_type'); // Inbound, Outbound, Transfer, etc.
            $table->date('movement_date');
            $table->text('reason')->nullable(); // Reason for movement, if any
            $table->text('notes')->nullable(); // Additional notes
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('housing_mvmt_mgmt');
    }
};
