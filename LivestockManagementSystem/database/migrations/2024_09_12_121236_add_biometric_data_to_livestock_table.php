<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBiometricDataToLivestockTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('livestocks', function (Blueprint $table) {
            // QR Code and Barcode fields
            $table->string('qr_code')->nullable()->after('id'); // Path or URL to QR Code image
            $table->string('barcode')->nullable()->after('qr_code'); // Path or URL to Barcode image

            // Biometrical Identification Information
            $table->json('facial_recognition_data')->nullable()->after('barcode'); // JSON data for facial recognition
            $table->json('thermal_imaging_data')->nullable()->after('facial_recognition_data'); // JSON data for thermal imaging
            $table->json('other_biometric_data')->nullable()->after('thermal_imaging_data'); // JSON data for any other biometrics

            // Heatlth Status
            $table->enum('health_status', ['healthy', 'sick'])->nullable()->after('other_biometric_data');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('livestocks', function (Blueprint $table) {
            $table->dropColumn('qr_code');
            $table->dropColumn('barcode');
            $table->dropColumn('facial_recognition_data');
            $table->dropColumn('thermal_imaging_data');
            $table->dropColumn('other_biometric_data');
            $table->dropColumn('health_status');
        });
    }
}
