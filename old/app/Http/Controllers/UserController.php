<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        
        return response()->json($users);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'name' => 'string',
            'password' => 'string',
            'company' => 'string',
            'phone' => 'string',
            'file' => 'max:2048',
        ]);

        $user = User::find($request->id);
        $user->name = $request->name;
        $user->company = $request->company;
        $user->phone = $request->phone;

        if($request->password) {
            $user->password = bcrypt($request->password);
        }

        if($user->logo != $request->logo) {
            $request->validate([
                'file' => 'max:2048',
            ]);
    
            $logo = $request->file('logo');
            $logoname = time() . '.' . $logo->getClientOriginalExtension();
            $logo->move('uploads/logo', $logoname);
            $user->logo = $logoname;
        }

        $user->update();

        return response()->json(['message' => 'User successfully updated']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();

        return response()->json(['message' => 'User successfully deleted']);
    }
}
