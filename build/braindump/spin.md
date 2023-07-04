Spin is a model checker. Use promella (.pml) format to create state machines for which spin can "check" properties, validity, etc. 

How to check a trace:
`spin -t0 -s -r the-file.pml`

How to check a property written in the file given the property is assocated as such:
```
ltl property {
	always (something = something else)
}
```
then check the property with: `spin -run -a -DNOREDUCE sctp.pml`

Some more basic tools:
- Interactive mode (`spin -i`)
- Properties and counterexamples (e.g. say "this state is never reached" and then see if it finds a counterexample)
- `spin -run` without arguments checks for deadlocks 
- `spin --` will give you a list of spin commands / params (like a shitty man page missing lots of info)

[http://spinroot.com/spin/Man/](http://spinroot.com/spin/Man/) for specific man-based information

[spinroot.com](spinroot.com) for more info
