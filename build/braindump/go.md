I want to learn go for security - it's apparently very quick and portable to compile and whatnot.

To compile a go file, simply run `go build [file].go` then execute the binary.

# Resources
- [go.dev/tour](https://go.dev/tour/basics)

# Project initialization
- `go mod init [name]` -> initialize module
- `go run [file]` -> running file
- `go build [file]` -> build some file
- `go get golang.org/x/crypto/ssh@latest` -> get some crypto shit

# Random Tips
- `print` is a low-level function that isn't typically used for low-level tasks. Use `fmt.Println(value)` instead.
