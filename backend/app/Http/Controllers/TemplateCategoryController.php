<?php

namespace App\Http\Controllers;

use App\TemplateCategory;
use Illuminate\Http\Request;

class TemplateCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = TemplateCategory::all();

        return response()->json($categories);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $category = new TemplateCategory();
        $category->name = $request->name;

        $category->save();

        return response()->json($request, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\TemplateCategory  $templateCategory
     * @return \Illuminate\Http\Response
     */
    public function show(TemplateCategory $templateCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\TemplateCategory  $templateCategory
     * @return \Illuminate\Http\Response
     */
    public function edit(TemplateCategory $templateCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\TemplateCategory  $templateCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TemplateCategory $templateCategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TemplateCategory  $templateCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $category = TemplateCategory::find($request->id);
        $category->delete();

        return response()->json(['message' => 'category successfully deleted']);
    }
}
