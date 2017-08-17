#!/bin/bash

read STR
printf "%.3f\n" $(echo $STR | bc -l)
