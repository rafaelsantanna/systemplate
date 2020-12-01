<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTemplateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('template_categories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::table('templates', function (Blueprint $table) {
            $table->unsignedBigInteger('template_category_id');

            $table->foreign('template_category_id')->references('id')->on('template_categories');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('template_category_id');

            $table->foreign('template_category_id')->references('id')->on('template_categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('template_categories');
    }
}
