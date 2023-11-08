Linear programming (LP) is a neat way to optimize things. Although (integer) linear programming is [NP-hard](https://resources.mpi-inf.mpg.de/departments/d1/teaching/ss11/OPT/lec23.pdf), in practice LP solvers such as [Gurobi](https://www.gurobi.com/solutions/gurobi-optimizer/) employ loads of sophisticated heuristics and preprocessing techniques to speed up runtime. Because of this, it's always pretty cool to realize I can reduce some part of a hard decision problem (e.g., something PSPACE-complete) to LP. Similar deal with [SAT and SMT](https://cacm.acm.org/magazines/2023/6/273222-the-silent-revolution-of-sat/fulltext).

Sometimes, when attempting to encode a problem into LP, I want to reason about my constraints with boolean logic. I find doing so can be quite convenient. Here's how to do it yourself. 

# A Naive Approach: Flattened Constraints 
Given our linear constraints $c_1, c_2, ..., c_n$, a naive approach to getting the boolean logic we want is to *flatten* our constraints to binary variables $x_1, x_2,..., x_n$ that indicate if the respective constraint is satisfied. This way, we can use a simple encoding to get the boolean logic we want. 

**Logical OR**: To express $x_1 \vee x_2 \vee x_3$, we create a boolean indicator variable $0 \geq y_1 \geq 1$ and do
$$
y_1 \leq x_1 + x_2 + x_3 \\ y_1 \geq x_1, \: y_1 \geq x_2, \: y_1 \geq x_3 
$$
For an arbitrarily large amount of indicator variables, we have:
$$
0 \leq ny - \sum x_i \leq n - 1
$$
**Logical AND**: To express $x_1 \land x_2 \land x_3$, we create $0 \geq y_2 \geq 1$ and do
$$
y_2 \geq x_1 + x_2 + x_3 - 2 \\ y_2 \leq x_1, \: y_2 \leq x_2, \: y_2 \leq x_3
$$
For any number of indicator variables:
$$
0 \leq \sum x_i - ny \leq n - 1
$$
**Logical NOT**: To express $\neg x_1$ we simply do $y_3 = 1 - x_1$

**Logical XOR**: To express $y_4 = x_1 \oplus x_2$ it's a bit more complex:
$$
y_4 \leq x_1 + x_2 \\
y_4 \geq x_1 - x_2 \: y_4 \geq x_2 - x_1 \\
y_4 \leq 2 - x_1 - x_2
$$
**Forced Implication**: To *assert* $x_1 \Rightarrow x_2$, we can simply do $x_1 \leq x_2$

**Indicated Implication**: Because implication is syntactic sugar e.g. $(x_1 \Rightarrow x_2) == (\neg x_1 \vee x_2)$, we can adapt the or construction:
$$
y_5 \leq 1 - x_1 + x_2 \\
y_5 \geq 1 - x_1, \: y_5 \geq x_2
$$
Encoding things this way obviously adds a lot of complexity to the LP problem, and I find overusing this encoding can be really expensive.

# Flattening Constraints
But how do you reduce any given constraint to an indicator variable? In general, the [big M method](https://assets.gurobi.com/pdfs/user-events/2017-frankfurt/Modeling-2.pdf) is used. Adapted from Gurobi's documentation, the idea is for some arbitrarily large $M$ and a linear constraint $a = b$, enforce for some $0 \leq z \leq 1$:
$$
a - b \leq M \cdot z \\
b - a \geq M \cdot z 
$$
This way, when $z=0$, $a=b$. Otherwise, $-M \leq a-b \leq M$. This can be adapted to any linear or nonlinear constraint, given $M$ is chosen properly. 

But, similarly, this can be expensive ._.

# Making This Practical
In my experience, the best way to make this approach practical runtime-wise is to take advantage of where boolean values naturally appear in constraints. Building up a large boolean expression, although possible, is just so expensive even with great LP solvers.

# References
- [UT Dallas Big M Lecture Notes](https://personal.utdallas.edu/~scniu/OPRE-6201/documents/LP07-Big-M-Formulation.pdf)
- [More Lecture Notes](https://resources.mpi-inf.mpg.de/departments/d1/teaching/ss11/OPT/lec23.pdf)
- [Northeastern LP Lecture Notes](https://www.khoury.northeastern.edu/home/hlnguyen/cs7800/fall19/lp.pdf)
