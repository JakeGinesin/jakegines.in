def: analyzing software, understanding its structure, functionality, behavior, etc. Important for malware analysis, software security auditing, understanding proprietary protocols, cyber forensics, etc.

Note that there exists different reverse engineering techniques for different langagues. Some languages include C/C++, Java, .NET, Assembler, etc. Some platforms inlcude DOS, MacOS X, Unix/Linux, Windows, etc.

# Resources
- Reverse engineering for beginners
- https://crackmes.one
- x86-asm.md
- os.md
- [github.com/Dump-GUY/Malware-analysis-and-Reverse-engineering](https://github.com/Dump-GUY/Malware-analysis-and-Reverse-engineering)

# Definitions 
- Machine language: legit 1s and 0s that are pumped into the CPU
- Assembler: Turn assembly code into machine language
- Disassembler: Taking a machine language program and turning it into an assembly language (human-readable) code
    - examples include IDA Pro, Ghidra, Objdump, Radare2, GDB
- compilation: taking high-level code and turning it into low-level code, usually assembly 
- `strings [file]` -> legit just shows the strings
- `file [file]` -> shows the filetype
    - e.g., `NT_Crack.exe: PE32 executable (console) Intel 80386, for MS Windows, 13 sections`
    - also, see [ELF](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format)
- "patching a jump" - if you want to change the flow of execution of a binary, for example if there is a license check, you can go in with a hex editor (or, disassembler) and literally change the "je" to a "jne" lol

## Making ASM
making the assembly file/executable:
c->asm: gcc -S [file]
c->asm w/o fluff: gcc -S -O2 -fno-asynchronous-unwind-tables [file]
c->executable: gcc [file] -no-pie -o [filename]

once we have the assembly file, assemble to an executable:
asm->executable: as [file].s -o [file].o

and link it:
gcc [file].o -o [file]

and execute:
./[file]

# Tools
- IDA Pro
- GDB
- Objdump
- strace - track system calls 
- ltrace - track ibrary calls
- hopper

## GDB
- `set dis` -> dis options
    - `set disassembly-flavor` (intel, etc)
- `info functions` -> show all defined functions
- `disassemble [function]` -> show the asm code for [function]
- `run` -> run the code

### Breakpoints
Apple (of app people, wtf) has a nice guide: [developer.apple.com/library/archive/documentation/DeveloperTools/gdb/gdb/gdb_6.html](https://developer.apple.com/library/archive/documentation/DeveloperTools/gdb/gdb/gdb_6.html)

- `info breakpoints` -> shows the current breakpoints
- `delete [breakpoint]` -> delete whatever breakpoint
- `break [function]` -> set breakpoint at function
    - `break *main`
- `break +offset`, `break [linenum]`, `break *address`
    - example -> `break *main+88` (will break at +88) in the lil disassembler thing)

Note because linux has [Address space layout randomization](https://en.wikipedia.org/wiki/Address_space_layout_randomization), if you want to set a specific memory address you'll prob have to disable ASLR via `echo 0 | sudo tee /proc/sys/kernel/randomize_va_space`

### Observing Stuff
Because GDB is the goat, we can step through the program with it, check out memory addresses, etc.

- `continue`, `c` -> continue execution till breakpoint
- `info registers` -> shows the content of all registers
- `x/d [address]` -> inspect the value at a memory location
- `stepi`, `si` -> execute one assembly instruction at a time

# C->ASM
Each structure in C has a certain "mirror" structure in assembly. 

(note, this section is generally in intel assembly)

## For loop
for (int i = 1, i < 10, i++){ 
    // do something
}

will have the structure:
// add items to stack
mov addr1, i (1)
mov addr2, 10

// compare operation
cmp addr2, 0xa # note how this is one more than 10 in hexadecimal

// conditional jump after the loop
jg some addr after loop

// "do something"

// do the increment condition
add addr1, 0x1

// jump back to compare operation
jmp to compare

If you're trying to emulate some for loop in python, they have automatic hexadecimal conversion. That is, if you type "0xe" python will spit out 14:

```
>>> 0xe
14
```

So you can do something like:

```
for i in range(0x1, 0xa) : # do something
```


