A collection of notes from my operating systems (CS5600) course. 

### Intro
At a high level, the operating sits between the running applications and the hardware. The OS acts as the API to the hardware and *abstracts* it. Programmers interface with the OS, which in turn manages processes and interfaces with the hardware itself. 

A great example of this process is when a program allocates memory. In C, when you allocate memory for something you'll always get a consistent memory address. Why? It's because the OS is virtualizing memory for your program to use! Each process ahs its own individual address space. 

Another concept is the idea of concurrency. The CPU (assuming it has a single core) can only process one operation at a time. Yet, if you check your current running processes, you'll often see hundreds of things happening at once. How does an operating system manage so many processes? The idea is it concurrently runs all of them! How this works is a deep and complicated problem. 

Another important concept is *persistence*, e.g., how do we store data over the long-term? The hardware to do this, like an SSD or a hard drive, helps with this. 

### Random Facts
- The OS offers a couple hundred *system calls* that allows processes to interact with the hardware. 
- memory space is hexadecimal, e.g.: 0x10 = 17th space
- CPUs have *registers* that are used to perform calculations, etc. 
- register information is different depending on, like, the CPU architecture. How CPU's are designed to process things is *private*. 
- A monolithic kernel is a single, large process that runs in priviledged mode and manages the entirety of the system's recourses. 
- OSX and Windows are hybrid-kernel architecture-styles. That means, they have some aspects of monolithic kernels and some aspects of micro-architecture kernels. 
- Microarchitecture kernels are kernels that provide functionality in little packages to the user
- x86-64 -> registers are 64 bit!
- risc is fundamentally different from x86 in that its design is open source, while x86 is closed source
- stdin -> 0, stdout -> 1, stderror -> 2
- which ls -> /bin/ls
- which which -> (built in shell command)
- EOF -> End of File
- fd -> file descriptor
- different CPUs, different schedules
- everyone cares about CPU%, not like, anything else.
- pipes: for pipe(pipefd):
    write to pipefd[1], read pipefd[0]

### Differences between OS and Kernel
The kernel and the operating system (OS) are related but different concepts.

The kernel is the central component of the operating system that manages system resources and provides the interface between the hardware and software of a computer. It is responsible for low-level tasks such as managing memory and process scheduling, as well as providing higher-level services such as device drivers, file system management, and system calls.

An operating system, on the other hand, is a set of software programs that manages the hardware resources of a computer and provides a platform for application software to run. An operating system provides a consistent environment for the execution of programs by hiding the underlying hardware complexity, providing a stable and consistent application interface, and managing and allocating resources such as memory, storage, and processing power.

An operating system typically includes the kernel, as well as a set of additional software components such as libraries, system utilities, and application programming interfaces (APIs) that provide additional functionality and services to the system and users.

To simplify, the kernel is a crucial component of the operating system that is responsible for managing the computer's hardware and providing basic services, while the operating system is the overall platform that provides a consistent environment for the execution of programs and management of resources.

### How does the stack work?
The stack is a memory are allocated for executing processes. The stack is always located in the ram. There is a *stack pointer* that is kept in the register that points to the top of the stack.  

Likewise, a stack frame is a block of memory that is allocated when function is called. It stores the function's parameters, local variables, etc. 

### Processes
A process is an abstraction by the operating system. Essentially, creating processes is done through an API. 

From OSTEP:
The process is the major OS abstraction of a running program. At
any point in time, the process can be described by its state: the con-
tents of memory in its address space, the contents of CPU registers
(including the program counter and stack pointer, among others),
and information about I/O (such as open files which can be read or
written)

The process API consists of calls programs can make related to pro-
cesses. Typically, this includes creation, destruction, and other use-
ful calls.

Processes exist in one of many different process states, including
running, ready to run, and blocked. Different events (e.g., getting
scheduled or descheduled, or waiting for an I/O to complete) tran-
sition a process from one of these states to the other

A process list contains information about all processes in the sys-
tem. Each entry is found in what is sometimes called a process
control block (PCB), which is really just a structure that contains
information about a specific process

### Assembly
[BROWN CHEAT SHEET](https://cs.brown.edu/courses/cs033/docs/guides/x64_cheatsheet.pdf)

registers:
  %rip -> always points to the next instruction in the code itself
  %rsp -> points to the top of the stack. The *stack* pointer
  %rbp -> frame pointer 
  %rax -> temporary register for the return value of functions
  %rbx -> callee-saved register
            meaning, not saved across function calls
  %rdi -> 1st argument to functions
  %rsi -> 2nd argument to functions 
  %rdx -> 3rd argument to functions, second return register
  %rcx -> 4th argument to functions
  %r8  -> 5th argument to functions
  %r9  -> 6th argument to functions 
            keep in mind, after the 6th argument are stored in the stack,
            specifically at %rsp, %rsp+8, etc
  %r10 -> temporary register, used for passing function's static chain pointer
  %r11 -> temp register
  %r12-%r14 -> temp register
  %r15 -> callee-saved register, used as a GOT base pointer

operations:
  movq A, B -> moves the value in A => B
  pushq %rax -> 
    subq $8, %rsp (move stack pointer)
    movq %rax, (%rsp) 
  popq %rax -> 
    movq (%rsp), (%rax) | 
    addq $q, %rsp

  call 0x12345 
    pushq %rip (push next instruction onto the stack)
    movq $0x12345, %rip (move instruction to %rip)  

  ret 
    popq %rip

examples:
subq $16, %rsp    # make stack space, $16

### Threads
- threads give *new registers* with *different schedulers*
- threads are implemented at the *hardware level* (know how CPUs have like, 8 cores 16 threads? THIS IS WHY)
- race condition: when threads are competing for the same resources. we *don't* want this,
  as it like, adds in non-deterministic behavior. this is BAD. we don't know when threads
  execute
- exit in thread, exit in program

threads share: 
- global variables
- program code
- heap

they DON'T share:
- stack
- registers

### Topics for review:
- understanding the output of programs using pointer variables
- man pages: 
  man 1 -> general commands
  man 2 -> system calls
  man 3 -> library (c standard library)
  man 4 -> special files

- understanding the most important system calls
  waitpid -> (waiting for a given PID)
  wait -> automatically gets that shit

- stdin, stdout, stderror
  0 -> stdin, 1 -> stdout, 2 -> stderror
    2> is stderror redirect

- rev -> reverse, e.g., echo abc | rev -> cba
- zombie/orphan processes
- what do processes share across forks? what do threads share? 
  
  two threads in a process share: global variables, program code, heap. 
  THEY DON'T SHARE THE STACK OR REGISERS!

  forking shit doesn't share very much

- when do things get pushed onto the stack? when do things 
  get pushed onto the heap?

  variables are pushed onto the stack... or registers lmao
  declaring variables inside a function pushes em onto the stack
  mallocing stuff puts it on the heap though

- understanding the... registers and their usage. 
- understanding basic assembly
  %rax -> first return vector 
  %rbx -> calle-savbed
  %

- truly, for real, understanding concurrency.

- understanding the "commandments" in Mike Dahlin's 
  "coding standard for programming with threads"

  1. Always do things the same way. Be consistent!
  2. Always use monitors (condition variables & locks)
  3. Always hold lock when operating on condition variables
  4. always grab lock at the beginning of procedure and release it 
      before return
  5. always use while for cond_wait and not if
  6. never sleep!

- scheduling! be familiar with all schedules.
- be familiar with lab1 and lab2
- global variables initialize over non-global shit

### Pointers
So, memory has an *address* and a *value* 

for `int x = 0`
you have an address, and the integer value *at* the value of the address

for like, `int *pX = &x`,
your address, `int *pX` *points* to a pointer that points to an integer
"integer *pointer* named pX is set to *the address* of x"

`int y = *pX`
the integer named y is set to the *thing pointed to by pX*

- malloc takes things from the *heap*
- minimal answer for zombie process & orphan process code

### Forking
Here's an example of forking:

```
int main() {
    pid_t pid;

    // fork a new process
    pid = fork();

    if (pid == -1) {
        // fork failed
        perror("fork");
        return 1;
    } else if (pid == 0) {
        // child process
        printf("I am the child process with PID %d\n", getpid());
    } else {
        // parent process
        printf("I am the parent process with PID %d\n", getpid());
        printf("My child process has PID %d\n", pid);
    }

    return 0;
}
```

### Mutex
```
mutex_t m
mutex_init(mutex_t* m)
acquire(mutex_t* m)
release(mutex_t* m)
....

--pthread implementation:
 pthread_mutex_init(), pthread_mutex_lock(), ...
```

### Condition variables
```
--void cond_init (Cond *, ...); 
--Initialize

--void cond_wait(Cond *c, Mutex* m);
--Atomically unlock m and sleep until c signaled 
--Then re-acquire m and resume executing 

--void cond_signal(Cond* c);
--Wake one thread waiting on c

--void cond_broadcast(Cond* c);
--Wake all threads waiting on c
```

### Monitors
monitor -> mutex + condition variable

### Zombie Process
```
#include <stdlib.h>
#include <unistd.h>

int main() {
    pid_t child_pid = fork();
    
    if (child_pid == 0) {
        // Child process
        exit(0);
    }
    else {
        // Parent process
        sleep(60); // Sleep for 60 seconds to give the child time to exit
    }
    
    return 0;
}
```
the parent never calls wait(), so.. the child process never gets closed

### Orphan Process
```
#include <stdlib.h>
#include <unistd.h>

int main() {
    pid_t child_pid = fork();
    
    if (child_pid == 0) {
        // Child process
        sleep(60); // Sleep for 60 seconds to give the parent time to exit
    }
    else {
        // Parent process
        exit(0);
    }
    
    return 0;
}
```

the parent process exits, but the child is still running.. so it's adopted by the init process!

### Scheduling
response time -> time until process starts moving
turnaround time -> time till process is done

these are *metrics*

FIFO -> first in, first out
SJF -> Shortest Job First
STCF -> Shortest time-to-completion first. this means *always* putting the shortest job in front.
RR -> Round robin, hit every single process
Lottery -> Random processes
Priority -> give processes priority and shit
MLFQ -> Multi-level feedback queue, usually queues do round robin and downgrade to other processes
