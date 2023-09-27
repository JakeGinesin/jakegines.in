All things x86 assembly. 

# Resources
- [en.wikipedia.org/wiki/X86_assembly_language](https://en.wikipedia.org/wiki/X86_assembly_language)
- [cs.brown.edu/courses/cs033/docs/guides/x64_cheatsheet.pdf](https://cs.brown.edu/courses/cs033/docs/guides/x64_cheatsheet.pdf)

# Binary
Hexadecimal, etc etc.

Two's compliment: negative numbers are represented as the large positive numbers they correlate to. e.g., 
- 0 - 1 = 11111111 == 255 == -1
- -1 - 1 = 11111110 == 254 == -2

Arithmetic operations don't have to be sign-aware. We can think of this as a modulo.

# Concepts
Some important general concepts to understand when dealing with x86 asm in general:
- program memory, addresses in general
- the stack
- registers
- instructions

# Program Memory
Every byte has 8 bits (e.g., a binary value). That is, every byte can be visualized with 8 binary values, or equivalently 2 hexadecimal values. 

Okay so, intel x86 architecture is *byte-addressable* meaning, some address (e.g., 0x05) points to the beginning of some 8 bit segment. kinda nuts. 

The size of assembly instructions depends on like, the byte architecture. ARM's A32 has most instructions as 4 bytes long, but x86 has a variable length instruction whatever.

Each process has their own assigned virtual memory. This virtual memory is mapped to physical memory via pages.

# Stack
The stack is like, a first in last out type of data structure.

Because the stack grows downwards (e.g., away from the top of the program memory, 0xfffffff to 0x0 wtv), decrementing the stack pointer will "allocate" memory for the stack.  

# Registers
A register is like, a quickly accessible location available to the computer's processor. In x86-64, the registers have 64 bits (8 bytes). In x86-32, the registers have 32 bits (4 bytes). 

Some facts:
- Registers are very fast and are located in the CPU. 
- the address of the next instruction is located in a register
- there are various extensions to existing architecutres that add other registers

# Memory
Say for instance, we do `mov rax, 0x55`. This just moves the literal value `0x55` into `rax`. In order to actually get the contents of `0x55` into `rax`, we need to do `mov rax, [0x55]`. Using [] is akin to de-referencing in assembly.

## Individual Registers
In x86-64, certain register instructions point to all 8 bytes, the first 4, the first 2, or, just the first one. See the brown cheatsheet for more.

"There are sixteen 64-bit registers in x86-64: %rax, %rbx, %rcx, %rdx, %rdi, %rsi, %rbp, %rsp, and %r8-r15. Of these, %rax, %rcx, %rdx, %rdi, %rsi, %rsp, and %r8-r11 are considered caller-save registers, meaning that they are not necessarily saved across function calls. ) Registers %rbx, %rbp, and %r12-r15 are callee-save registers, meaning that they are saved across function calls."

- rip -> "instruction pointer," always points to the next instruction in the code itsemf
- rsp -> "stack pointer," points to the top of the stack
- rax -> used to store a function's retunr value
- rdi, rsi, rdx, rcx, r8, r9 -> 1-6's argument to functions 
    - other arguments are put onto the stack
- rbp -> base of the stack pointer, not really useful in 64 bit

# Instructions
Keep in mind, the following instructions are for AT&T syntax where the source goes before the destination. Intel syntax flips this - destination before syntax.

AT&T: `mov $5 %eax`
Intel: `mov eax,  5`

## Suffixes
To indicate the size of the operands, instructions will sometimes have suffixes:
- b -> one-byte integer, "byte"
- w -> two-byte integer, "word"
- l -> four-byte integer, "doubleword"
- q -> eight-byte integer, "quadword"

## Extension
see: [en.wikipedia.org/wiki/Sign_extension](https://en.wikipedia.org/wiki/Sign_extension)

If you move a "byte" value to a "word" value (e.g., move something smaller to a bigger space), you're going to have to pad the space somehow. 

Zero extension:
if we had like, 0111, extending this to two bytes (8 bits) would be 00000111

Sign extension:
if we had like, 11 1111 0001 (decimal negative 15, two's complement), extending it would preserve the sign, so we'd put more 1s on the front, e.g., 1111 1111 0001

## Data movement
S -> Source
D -> Destination

one suffix:
- mov S, D -> move source to destination
- push S   -> push source onto stack
- pop D    -> pop top of stack into destination

two suffix:
- mov S, D -> move byte to word (two byte, sign extended)
- push S   -> move byte to word (zero extended)

## Unary operations:
- inc D -> increment destination by one
- dec D -> decrement destination by one
- neg D -> arithmetic negation 
- not D -> bitwise complement (literally inverting the bits lmao)

## Binary operations:
- leaq S, D -> Load data in address of source to destination
- add S, D  -> add source to destination
- sub S, D  -> subtract source from destination
- imul S, D -> multiply source by destination (note, multiplication in binary is the same as how it's done in like grade school)
- xor S, D  -> bitwise xor destination by source
- or  S, D  -> bitwise or destination by source
- and S, D  -> bitwise and destination by source

## Shift operations
- sal/shl k, D -> left shift destination by k bits, i.e., add a bit one to the right
- sar k, D -> right shift destination by k bits, i.e., subtract a bit one from the right
- shr k, D -> logical shift right by k bits, see: [en.wikipedia.org/wiki/Logical_shift](https://en.wikipedia.org/wiki/Logical_shift)

## Comparison
comparison instructions don't store the result anywhere; rather, they modify a flag in the FLAGS register. these flags can be checked by branch instructions if need be. 

- cmp S, D -> see if the two have equal values

```
MOV AX, 5
CMP AX, 5
JZ equal   ; Jump to "equal" label if AX is 5 (since 5-5 = 0 and ZF would be set)
```

- test S, D -> see if a certain bit is set

```
MOV AX, 0101b  ; Binary number
TEST AX, 0010b ; Test if the second bit is set
JZ bit_not_set ; Jump to "bit_not_set" label if the second bit is not set
```

## Conditionals
Based on the condition code, (sometimes ZF, SF, etc)

### Set
set D -> set if equal/zero (cond code, ZF)
setne/setnz D -> set of not equal/nonzero (cond code, ZF)
... there's many of these, see the brown cheatsheet

### Jmp
Jump to a given address depending on the condition

- jmp L -> Jump to label
- je/jz L -> Jump if equal/zero (cond code ZF)
- jne/jnz L -> Jump if *not* equal/zero (cond code ZF)
- js L -> jump if negative (cond code SF)
- jns L -> jump if nonnegative (cond code SF)

### Mov
Similarly, there's `cmov` conditional move instructions. 

## Procedure Calls
- call L -> push return address onto the stack and jump to label
- leave -> set rsp to rbp, then pop the top of the stack into rbp
- ret -> pop return address from stack and jump there

