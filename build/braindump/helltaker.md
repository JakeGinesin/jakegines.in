Proving helltaker is PSPACE-complete, because why not lmao.

# Todo
- prove containment in PSPACE 
- prove pspace-hardness  
- prove pspace-completeness

# Containment in PSPACE
Proof:
The states of *The Helltaker* and every entity can be described by a polynomial amount of space, since entities are confined to a polynomial-sized area. Thus, an algorithm which guesses *The Helltaker's* inputs on every frame and simulates Helltaker, until *The Helltaker* either reaches the goal location or a state is repeated, requires only polynomial to function. Thus, by savage's theorem, since NPSPACE=PSPACE, we know Helltaker is contained in PSPACE.

# Containment in PSPACE-Hardness & PSPACE-completness
Via the planar motion problem, we need to construct a gadget that simulates any one door. Since it's generally easy to build hallways and branching hallways in helltaker, as we are working with an n x n grid, this is generally easy to see. You can very reasonably construct an pen-close traverse door to show PSPACE-hardness. From this gadget, PSPACE-completeless also follows.

# Citations
- Planar Motion Problem: [erikdemaine.org/papers/Doors_FUN2020/paper.pdf](https://erikdemaine.org/papers/Doors_FUN2020/paper.pdf)
- [arxiv.org/pdf/2005.03192.pdf](https://arxiv.org/pdf/2005.03192.pdf)
- Celeste is PSPACE-hard: [arxiv.org/pdf/2211.11839.pdf](https://arxiv.org/pdf/2211.11839.pdf)
- Block pushing: [erikdemaine.org/papers/GadgetsChecked_FUN2022/paper.pdf](https://erikdemaine.org/papers/GadgetsChecked_FUN2022/paper.pdf)
- [erikdemaine.org/papers/Celeste_TJM/paper.pdf](https://erikdemaine.org/papers/Celeste_TJM/paper.pdf)
