Another means of verifying distributed systems, similar in nature to Promela.

# Resources
- learn TLA: [learntla.com/](https://learntla.com/)

# How to run
- requires a `[file].cfg`
    - file contains constant values, INIT, and Next
- use `tlc [file].tla`

## Example State Relation

```
--------------------------- MODULE p1 ---------------------------

EXTENDS Naturals

(*-- Define states as constants *)
CONSTANT START, S0, S1, S2, S3, S10, S20, S30, S40, S50, CONC

VARIABLES state

(*-- Initial state definition *)
Init == 
    state = START

(*-- Transition relation *)
Next == 
    \/ state = START /\ state' \in {S1, S0}
    \/ state = S0 /\ state' = S2
    \/ state = S1 /\ state' = S0
    \/ state = S2 /\ state' = S3
    \/ state = S3 /\ state' \in {S0, S1, S30}
    \/ state = S10 /\ state' \in {S1, S20}   (* Possibly an inconsistency *)
    \/ state = S20 /\ state' = S30
    \/ state = S30 /\ state' \in {S50, S40, S3}
    \/ state = S40 /\ state' = CONC
    \/ state = S50 /\ state' = S40
    \/ state = CONC /\ state' = CONC

=============================================================================

## Example CFG


\* SPECIFICATION
\* Uncomment the previous line and provide the specification name if it's declared
\* in the specification file. Comment INIT / NEXT parameters if you use SPECIFICATION.
CONSTANTS
    START = "start"
    S0 = "s0"
    S1 = "s1"
    S2 = "s2"
    S3 = "s3"
    S10 = "s10"
    S20 = "s20"
    S30 = "s30"
    S40 = "s40"
    S50 = "s50"
    CONC = "conc"

INIT Init
NEXT Next

\* PROPERTY
\* Uncomment the previous line and add property names

\* INVARIANT P
\* Uncomment the previous line and add invariant names
```
