#!/bin/bash

for x in red green blue; do
  echo $x
done

x=5
while [ $x -gt 0 ]; do
  echo $x
  x=$(($x-1))
done

