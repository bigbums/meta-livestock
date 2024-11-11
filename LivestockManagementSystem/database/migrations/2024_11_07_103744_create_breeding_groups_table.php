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
        Schema::create('breeding_groups', function (Blueprint $table) {
            $table->id();
            $table->string('breeding_group_name');
            $table->string('group_type')->default('multiple'); // 'pair' or 'multiple'
            $table->date('start_date');
            $table->integer('male_count')->nullable();
            $table->integer('female_count')->nullable();
            $table->date('end_date')->nullable();
            $table->string('location')->nullable();
            $table->text('notes')->nullable();
            $table->unsignedBigInteger('breeding_program_id')->constrained('breeding_programs')->onDelete('cascade')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('breeding_groups');
    }
};
