<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function store(Request $request) 
    {
        // Store
        $data = new Transaction;
        $data->name = $request->name;
        $data->user_id = auth()->user()->id;
        $data->date = $request->date;
        $data->amount = $request->amount;
        $data->category = $request->category;
        $data->tags = $request->tags;
        $data->notes = $request->notes;
        
        $data->save();
        $data->id;
    
        return response()->json([
            'id' => $data->id,
            'name'=>$data->name,
            'date'=>$data->date,
            'amount'=>$data->amount,
            'category'=>$data->category,
            'tags'=>$data->tags,
            'notes'=>$data->notes,
        ]);

        /* Old method
        $request->user()->transactions()->create([
            'name'=>$request->name,
            'date'=>$request->date,
            'amount'=>$request->amount,
            'category'=>$request->category,
            'tags'=>$request->tags,
            'notes'=>$request->notes
        ]);

        return response()->json([
            'name'=>$request->name,
            'date'=>$request->date,
            'amount'=>$request->amount,
            'category'=>$request->category,
            'tags'=>$request->tags,
            'notes'=>$request->notes,
        ]);*/
    }

   public function delete($id) 
   {
        $transaction = Transaction::find($id);
        $transaction->delete();
        return response()->json(['success'=>'Record has been deleted']);
   }

   public function fetch($id) 
   {
        $transaction = Transaction::find($id);

        return response()->json([
            'name'=>$transaction->name,
            'date'=>$transaction->date,
            'amount'=>$transaction->amount,
            'category'=>$transaction->category,
            'tags'=>$transaction->tags,
            'notes'=>$transaction->notes
        ]);
   }

   public function update(Request $request)
   {
        $date = Transaction::find($request->id);

        $date->name=$request->name;
        $date->date=$request->date;
        $date->amount=$request->amount;
        $date->category=$request->category;
        $date->tags=$request->tags;
        $date->notes=$request->notes;
        $date->save();

        return response()->json(['success'=>'Record has been updated']);
   }
    
}
