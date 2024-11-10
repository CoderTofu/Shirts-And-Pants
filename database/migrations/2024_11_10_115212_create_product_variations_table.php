<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_variations', function (Blueprint $table) {
            $table->string('product_name');
            $table->foreign('product_name')->on('products')->references('product_name')->cascadeOnDelete()->cascadeOnUpdate();
            $table->integer('stock');
            $table->string('size');
            $table->string('color');
            $table->primary(['product_name', 'color', 'size']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variations');
    }
};
