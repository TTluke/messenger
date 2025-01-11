# Makefile
.PHONY: build

BINARY_NAME=messenger

# build builds the tailwind css sheet, and compiles the binary into a usable thing.
build:
	npx tailwindcss -i ./static/css/style.css -o ./static/css/tailwind.css && \
	go mod tidy && \
  templ generate && \
	go generate && \
	go build -ldflags="-w -s" -o ${BINARY_NAME}

clean:
	go clean
