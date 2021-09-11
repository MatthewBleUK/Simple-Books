<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Dashboard</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">

    </head>
    <body class="antialiased">

        <div id="mySidenav" class="sidenav">
            <div class="container">
                <h3 class="title">Add a Transaction</h3>

                <form method="post" id="store-transactions">
                    @csrf
                    <div class="row">
                        <div class="input-container">
                            <label for="name">Transaction Name: </label><br>
                            <input type="text" name="name" class="@error('name') border-red @enderror name" placeholder="Enter a transaction name">

                            <div class="text-red">
                                @error('name')
                                    {{ $message }}
                                @enderror

                                <span class="name-error"></span>
                            </div>
                        </div>

                        <div class="input-container">
                            <label for="date">Date: </label><br>
                            <input type="date" name="date" placeholder="Enter a date" class="date @error('date') border-red @enderror">
                            
                            <div class="text-red">
                                @error('date')
                                    {{ $message }}
                                @enderror

                                <span class="date-error"></span>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-container">
                            <label for="amount">Amount: </label><br>
                            <input type="text" name="amount" class="@error('amount') border-red @enderror amount" placeholder="Enter a amount">

                           
                                <div class="text-red">
                                    @error('amount')
                                        {{ $message }}
                                    @enderror

                                    <span class="amount-error"></span>
                                </div>
                            
                        </div>
                        
                        <div class="input-container">
                            <label for="category">Category: </label><br>
                            <select name="category" class="category">
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <label for="tags">Tags: </label><br>
                        <input type="text" name="tags" class="@error('tags') border-red @enderror tags" placeholder="Enter a tag">

                        <div class="text-red">
                            @error('tags')
                                {{ $message }}
                            @enderror

                            <span class="tags-error"></span>
                        </div>
                    </div>
                    
                    <div class="row">
                        <label for="notes">Notes: </label>
                        <textarea rows="4" cols="50" name="notes" class="notes" placeholder="Enter a note"></textarea>
                    </div>
                    
                    <div class="form-buttons row">
                        <button type="submit" class="button">Add Transaction</button>
                        <a onclick="closeNav()" class="button">Cancel</a>
                    </div>
                </form>
                
            </div>
        </div>

        <div id="main">
            <!--<h1>Dashboard</h1>
            <p>Welcome {{ auth()->user()->name }}</p>-->

            <div id="nav-bar">
                <div class="container">
                    <ul class="float-left">
                        <li class="logo"><span>Simple Books</span></li>
                    </ul>
        
                    <ul class="float-right">

                        <div class="user dropdown">
                            <li class="dropbtn"><span class="user-id">{{ auth()->user()->name }}</span> <i class="white-arrow down"></i></li>
                         
                            
                            <div id="myDropdown" class="dropdown-content">
                                <a href="#">Account Settings</a>
                                
                                <form action="{{ route('logout') }}" method="post">
                                    @csrf
                                    <button type="submit" class="sign-out-btn">Sign Out</button>
                                </form>
                            </div>
                        </div>

                    </ul>
                </div>
            </div>
        
            <div id="transaction-stats">
                <div class="container">
                    <span class="title">Transactions</span>
                    
                    <div class="business-profits">
                        
                        <span class="value"><span class="minus">{{ $minus }}</span><span class="sign">£</span><span class="total-amount count" id="total">{{ $total }}</span></span>
                        <span class="value-title">Profits / Losses</span>
                    </div>
                
                    <div class="business-incomes">
                        <span class="value">£<span class="count" id="income">{{ $income }}</span></span>
                        <span class="value-title">Business Income</span>
                    </div>
                    
                    <div class="business-expenses">
                        <span class="value">£<span class="count" id="expenses">{{ $expenses }}</span></span>
                        <span class="value-title">Business Expenses</span>
                    </div>
                </div>
            </div>
        
            <div id="transactions-edit-bar">
                <div class="container">
                    <input type="button" value="Add Transaction" class="button" onclick="openNav()">
        
                    <div id="edit-buttons">
                        <!--<input type="button" value="Edit Transaction" class="button">-->
                        
                        <button data-token="{{ csrf_token() }}" class="button delete-button">Delete Transaction</button>
                    </div>
                </div>
            </div>
        
            <div id="transactions">
                <div class="container">
                    <table id="transactions-table">
                        <tr>
                            <td><input type="checkbox" id="rootbox"></td>
                            <th>Date</th>
                            <th>Transaction</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Tags</th>
                        </tr>
        
                        @if ($transactions->count()) 
                            @foreach($transactions as $transaction)
                                <tr id={{ $transaction->id }}>
                                    <td><input type="checkbox"></td>
                                    <td contenteditable='true'>{{ $transaction->date }}</td>
                                    <td contenteditable='true'>{{ $transaction->name }}</td>
                                    <td contenteditable='true'>@if($transaction->category == 'Expense')<span>-</span>@endif<span>£</span>{{ $transaction->amount }}</td>
                                    <td contenteditable='true'>{{ $transaction->category }}</td>
                                    <td contenteditable='true'>{{ $transaction->tags }}</td>
                                    <td onclick="openNav()"><i class="arrow right"></i></td>
                                </tr>
                            @endforeach     
                        @endif
                    </table>  
                    @if ($transactions->count()) 
                    @else    
                        <span id="no-transactions">There are no transactions</span>
                    @endif 
                </div>
            </div>

                       
        
            <div id="utility-bar">
                <div class="container">
                    <!--<button class="button">Import Transactions</button>-->
                    <input type="button" class="button" onclick="tableToExcel('transactions-table', 'name', 'myfile.xls')" value="Download Report">
                </div>
            </div>
            
        </div>

        <script src="{{ asset('js/jquery-3.6.0.js') }}"></script>
        <script src="{{ asset('js/transactions.js') }}"></script>
        <script src="{{ asset('js/scripts.js') }}"></script>
    </body>
</html>
