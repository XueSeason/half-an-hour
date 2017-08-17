#!/bin/bash
greet="hello"
echo ${#greet} # 输出长度

full_name="xue season"
echo $greet $full_name

echo "your last name is ${full_name:0:3}"

