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
        Schema::create('feed_distributions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('feed_schedule_id')->constrained()->onDelete('cascade'); // Foreign key to reference feed schedules
            $table->unsignedBigInteger('livestock_group_id')->nullable()->constrained('livestock_groups')->onDelete('set null');
            $table->unsignedBigInteger('livestock_id')->nullable()->constrained('livestock')->onDelete('set null');
            $table->timestamp('distribution_time'); // Time feed was actually distributed
            $table->decimal('variance', 8, 2)->nullable();
            $table->decimal('actual_quantity_distributed', 10, 2); // Actual quantity of feed distributed
            $table->string('distributed_by')->nullable(); // Person or system that performed the distribution
            $table->string('feed_by_user')->nullable(); // User or employee distributing the feed
            $table->text('comment')->nullable(); // User or employee distributing the feed

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feed_distributions');
    }
};
