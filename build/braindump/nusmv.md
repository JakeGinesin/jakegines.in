NuSMV is a model checker that's really good at doing state machine-based stuff and LTL. 

# How to Run
`NuSMV -int` -> run NuSMV in "interactive" mode

to perform interactive simulation on a model:
```
reset
read_model -i toto.smv
go
pick_state -v -i
simulate -a -i
quit
```

# Example State Machine
```
MODULE main

VAR 
    state: {START, Q1,Q2,Q3,Q4};

ASSIGN
    init(state) := START;

    next(state) :=
        case 
            state = START  : {Q1};
            state = Q1     : {Q1, Q2};
            state = Q2     : {Q1, Q3}; 
            state = Q3     : {Q1, Q4}; 
            state = Q4     : Q1;
            TRUE           : state;
        esac;
```
