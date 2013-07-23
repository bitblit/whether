#!/usr/bin/env bash

command-exists () {
    command -v "$1" &> /dev/null ;   
}

if command-exists ruby ; then
    echo "you have ruby, that's good..."
else
	echo "You must install ruby to test (for the mock S3 library)"
	exit 1
fi

if command-exists fakes3 ; then
    echo "fakes3 library installed, we can test..."
else
	echo "You must install the fakes3 ruby gem to test!"
	exit 1
fi
