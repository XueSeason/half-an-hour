#!/bin/bash

X=3
Y=4
empty_string=""

if [ $X -lt $Y ]; then
  echo "\$X=${X}, which is smaller than \$Y=${Y}"
fi

if [ -n "$empty_string" ]; then
  echo "empty string is not_empty"
fi

if [ -e "${HOME}/.zshrc" ]; then
  echo "you have a .zshrc file"
  if [ -L "${HOME}/.zshrc" ]; then
    echo "it's a symbolic link"
  elif [ -f "${HOME}/.zshrc" ]; then
    echo "it's a regular file"
  fi
else
  echo "you have no .zshrc file"
fi
