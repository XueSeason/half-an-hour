#!/bin/bash

echo -n '$USER=' # -n option stops echo from breaking the line
echo "$USER"
echo "\$USER=$USER"

X=""
if [ -n $X ]; then
  echo "the variable X is not empty string"
fi

if [ -n "$X" ]; then
  echo "the variable X is empty string"
fi

A="a"
echo "${A}bc"
