### Objects in Scala
- The main way to create an object in Sclaa is to instantiate a class, like in java.
- There's also syntax to create objects right then and there
- Objects are by default lazy—Never used => never created

### Object example in Scala:
(creating unique account nums starting from 2100000 at various places in the relative app)
```scala=
object Acconuts:
    private var accountNumber = 2100000
    def newUniqueAccNumber()=
    accountNumber += 1 
    accountNumber
```

### Using objects in Scala:
```scala=
Accounts.newUniqueAccNumber() // 2100001
Accounts.newUniqueAccNumber() // 2100002
Accounts.newUniqueAccNumber() // 2100003
```

### Static Fields and Methods
- In java, static variables and method sare shared by all instances of the class of which they belong
- Scala does this same function using companion objcts

### Static example in java:
```java=
public class Person{
    public static int numberOfPeople;
    
    public static int getNumOfPeople(){
        return Person.numberOfPeople;
    }
    
    public person(){
        numberOfPeople++;
    }
}
```

You see, this is pretty shit. Scala does this more elegantly

### Static example in Scala using "companion objects"
- **companion objects** are objects that have the same name as another class, and are defined in the same file

#### Companion object example:
Person class:
```scala=
class person(val name: String):
    person.incrementNumPeople // constructor just calls incrememnt method on companion object
```

companion object for person class (is a replacement for static in java)
```scala=
object Person:
    var numofPeople = 0
    private def incrmementNumPeople = numOfPeople =+ 1
    def conut = numOfPeople
```

usage:
```scala=
var p1 = Person("Jake")
var p2 = Person("Yosra")
println(s"count: #{Person.count}") //outputs 2
```

### Apply Method in Scala
- vv important

#### Basic Example:
We can create objects like this:
```scala=
val foo = new Foo
```

Treating foo like a function...
```scala=
foo()
```

 - This should cause an error in Java, but not in Scala!!
 - Scala will look for an apply method to activate
 - if there's no apply, you'll get a syntax error

foo obj:
```scala=
def foo:
    def apply() println(s"foo being foo")
```
 
### Another example:
```scala=
object Greet:
    def apply(val name: String) = 
        println(s"gm {name}") 
```

### proxying the companion object
```scala=
class City(val name: String) //class

object City:                 //companion object
   def apply(name: String)
        new City(name)
```

New "city" object will appear if you change the following:
```scala=
    City("dublin")
```


