#!/bin/bash

read count
sum=0
total=$count
while [ $count -gt 0 ]; do
  read i
  sum=$(($sum+$i))
  count=$(($count-1))
done

printf "%.3f\n" $(echo "$sum / $total" | bc -l)
