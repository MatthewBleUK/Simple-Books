<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function store(Request $request) 
    {
        // Validate
       
        // Store
        $request->user()->transactions()->create([
            'name' => $request->name,
            'date' => $request->date,
            'amount' => $request->amount,
            'category' => $request->category,
            'tags' => $request->tags,
            'notes' => $request->notes,
        ]);

        return back();
    }
    
}
