<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Template;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $templates = Template::all();
        
        return response()->json($templates);
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
        $request->validate([
            'file' => 'max:2048',
        ]);

        $file = $request->file('image');
        $filename = time() . '.' . $file->getClientOriginalExtension();
        $file->move('uploads', $filename);


        $template = new Template();
        $template->name = $request->name;
        $template->type = $request->type;
        $template->image = $filename;
        $template->fields = $request->fields;
        $template->save();

        return response()->json($request, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function show(Template $template)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function edit(Template $template)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Template $template)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $template = Template::find($request->id);
        $template->delete();

        return response()->json(['message' => 'template successfully deleted']);
    }

    public function duplicate(Request $request) {
        $template = Template::find($request->id);
        $copyTemplate = $template->replicate();
        $copyTemplate->save();

        return response()->json(['message' => 'template successfully duplicated', 'template' => $copyTemplate]);
    }
}
