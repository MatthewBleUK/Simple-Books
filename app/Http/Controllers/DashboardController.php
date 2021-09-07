<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function __construct() 
    {
        $this->middleware(['auth']);
    } 

    public function index ()
    {   
        //dd(auth()->user()->transactions);   //Uses collection  -> helps manipulate lists of data

       $transactions = Transaction::get();
       
        return view('dashboard', [
            'transactions' => $transactions
        ]);
    }
}
