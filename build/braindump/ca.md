Cellar automaton are a discrete model of computation closely related to automata theory.

# Resources
- [en.wikipedia.org/wiki/Cellular_automaton](https://en.wikipedia.org/wiki/Cellular_automaton)
- [plato.stanford.edu/entries/cellular-automata/](https://plato.stanford.edu/entries/cellular-automata/)

# Setup
Although many models of cellular automata are studied, the most "classical" so to speak is an infinite grid with binary variables denoting each square. Each square is related to other squares, and values of any given square can be defined to change over some temporal junction depending on some condition. 

By the nature of a grid, each square is related to other squares via a distance metric. 

# On Cellar Automata vs Finite Automata
"cellular" and "finite" automata are fundamentally different. Finite automata such as DFAs, NFAs, Pushdown Automata, Turing Machines, and Nondeterministic Turing machines are all unique in that they have some sort of finite *control* so to speak. 

Cellular automata are generative in nature. That is, given some state of the system and a set of rules, an infinite number of consecutive states can be computed. This makes them very powerful! 

Extremely interestingly, cellular automata can simulate a turing machine, and vice versa. This implies anything that can be computed with a turing machine can be  computed with a cellar automata.

## Nondeterminism
Similarly, nondeterministic cellular automata exists. Rules that define temporal behavior don't have to be deterministic. 

# On applications in AI
Since cellular automata are a prime example of a generative model of computation, making them an interesting approach to artificial intelligence. They were one of the first examples of an autonomous "agent" in computer science. 

# More
- [catb.org/hacker-emblem/](http://www.catb.org/hacker-emblem/)
- [tandfonline.com/doi/pdf/10.1080/03081079.2012.695896](https://www.tandfonline.com/doi/pdf/10.1080/03081079.2012.695896)

